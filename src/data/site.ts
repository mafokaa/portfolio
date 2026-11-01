import hero1 from '../assets/site/hero/1.webp';
import hero2 from '../assets/site/hero/2.webp';
import hero3 from '../assets/site/hero/3.webp';
import hero4 from '../assets/site/hero/4.webp';
import hero5 from '../assets/site/hero/5.webp';
import aboutPhoto from '../assets/site/about/photo.webp';
import contact1 from '../assets/site/contact/1.webp';
import contact2 from '../assets/site/contact/2.webp';
import contact3 from '../assets/site/contact/3.webp';
import contact4 from '../assets/site/contact/4.webp';

export const site = {
  name: 'Мария Феоктистова',
  title: 'Мария Феоктистова — графический дизайнер',
  description: 'Портфолио графического дизайнера: айдентика, упаковка, маркетплейсы, SMM, UX/UI.',
  city: 'Санкт‑Петербург',
  telegram: 'mafokaa',
  email: 'feoktistova.dsgn@gmail.com',

  // Первый экран: строки заголовка и фото рядом с ними.
  // before/after — фото до и после слова; w — ширина в долях высоты строки;
  // pos — какую часть фото показывать, если оно не влезает целиком: '50% 0%' — верх, '50% 100%' — низ.
  hero: [
    { word: 'Мария', before: [], after: [{ src: hero1, w: 1.5 }, { src: hero2, w: 0.85 }] },
    { word: 'Феоктистова', before: [{ src: hero3, w: 1.1, pos: '50% 15%' }], after: [] },
    { word: 'графический', before: [], after: [{ src: hero4, w: 1.25 }] },
    { word: 'дизайнер', before: [{ src: hero5, w: 0.7 }], after: [] }
  ],

  about: {
    photo: aboutPhoto,
    title: 'Привет!\nЯ Мария — дизайнер\nиз Санкт‑Петербурга',
    text: 'Создаю фирменные стили, упаковку, карточки для маркетплейсов, визуал для соцсетей и интерфейсы. Мне важно, чтобы дизайн был не только красивым, но и решал задачу бизнеса.',
    facts: [
      { k: 'Город', v: 'Санкт‑Петербург' },
      { k: 'Возраст', v: '23 года' },
      { k: 'Направления', v: 'Брендинг, упаковка, маркетплейсы, SMM, UX/UI' }
    ]
  },

  // Фраза в блоке «Связь со мной»: строка — слово, картинка — предмет в скобках
  contactLine: ['Напишите', 'мне', contact1, contact2, '—', 'обсудим', contact3, 'ваш', 'проект', contact4, '.']
};

// Разделы на главной в порядке показа. id совпадает с названием папки в src/content/projects.
// type: 'projects' — карточки открываются в отдельную страницу,
//       'photo'    — только карточки без страницы,
//       'market'   — карточки маркетплейсов с CTR.
export const sections = [
  { id: 'branding', type: 'projects', title: 'Айдентика и брендинг', lead: 'логотипы, фирменный стиль и визуальные системы' },
  { id: 'packaging', type: 'photo', title: 'Упаковка и полиграфия', lead: 'от идеи до макета в производство' },
  { id: 'marketplaces', type: 'market', title: 'Маркетплейсы', lead: 'карточки товаров, которые повышают кликабельность' },
  { id: 'smm', type: 'photo', title: 'SMM', lead: 'посты, сторис, обложки и шаблоны' },
  { id: 'uxui', type: 'projects', title: 'UX/UI', lead: 'интерфейсы сайтов и приложений' }
] as const;

export type Section = (typeof sections)[number];

// Короткие слова («и», «в», «&») не остаются в конце строки
export const nbsp = (s: string) => s.replace(/ (\S{1,2}) /g, ' $1 ');
