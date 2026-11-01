import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Один проект = одна папка: src/content/projects/<раздел>/<проект>/index.md
// Картинки лежат в той же папке и подключаются относительными путями (./cover.webp).
const projects = defineCollection({
  loader: glob({ pattern: '*/*/index.md', base: './src/content/projects', generateId: ({ entry }) => entry.split('/').slice(0, 2).join('/') }),
  schema: ({ image }) => z.object({
    title: z.string(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
    cover: image().optional(),
    desc: z.string().default(''),
    task: z.string().default(''),
    // Подробные тексты для страницы проекта; если пусто — берутся краткие
    descFull: z.string().optional(),
    taskFull: z.string().optional(),
    // Кадры внутри проекта сверху вниз: картинка или { video: ссылка }
    frames: z.array(z.union([image(), z.object({ video: z.string() })])).default([]),
    // Только для маркетплейсов: карточки с CTR до/после и слайдами 3:4
    cards: z.array(z.object({
      before: z.number(),
      after: z.number(),
      slides: z.array(image()).default([])
    })).default([])
  })
});

export const collections = { projects };
