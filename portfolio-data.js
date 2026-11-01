(function () {
  const L = (ru, en) => ({ ru, en });
  const uid = () => Math.random().toString(36).slice(2, 8);
  const ASPECTS = ['16/9', '3/2', '4/3', '1/1', '4/5', '3/4', '1/2', '1/3'];
  const CTR = [['2.4', '6.1'], ['1.8', '4.7'], ['3.1', '7.2']];

  const newBlock = (type, pid, aspect) => {
    const b = { id: (pid || 'p') + '-b-' + uid(), type };
    if (type === 'full') b.aspect = aspect || '16/9';
    if (type === 'pair') b.aspect = aspect || '4/5';
    if (type === 'trio') b.aspect = aspect || '3/4';
    if (type === 'video') { b.aspect = aspect || '16/9'; b.src = ''; }
    if (type === 'text') { b.title = L('Заголовок блока', 'Block heading'); b.text = L('Короткий текст о решении, процессе или результате.', 'A short note about the solution, process or result.'); }
    if (type === 'ctr') b.cards = CTR.map(([before, after]) => ({ before, after }));
    return b;
  };
  const LAYOUTS = {
    std: [['full'], ['full'], ['full'], ['full']],
    long: [['full'], ['full'], ['full'], ['full']]
  };
  const newProject = (type, id) => {
    id = id || 'p-' + uid();
    return {
      id, type, title: L('Название проекта', 'Project name'), meta: L('Клиент, 2026', 'Client, 2026'),
      desc: L('Кратко о проекте: кто клиент, что за продукт и что вошло в работу.', 'A short note on the project: the client, the product and the scope of work.'),
      task: L('Какую задачу поставил клиент и как дизайн её решил.', 'What the client needed and how the design solved it.'),
      blocks: (LAYOUTS[type] || []).map(([t, a], i) => Object.assign(newBlock(t, id, a), { id: id + '-b' + (i + 1) })),
      cards: type === 'mp' ? CTR.map(([before, after]) => ({ before, after })) : undefined,
      slides: type === 'mp' ? 3 : undefined
    };
  };
  const DEFAULT = () => ({
    about: {
      title: L('Привет!\nЯ Мария — дизайнер\nиз Санкт‑Петербурга', 'Hi!\nI’m Maria, a designer\nfrom Saint Petersburg'),
      text: L('Создаю фирменные стили, упаковку, карточки для маркетплейсов, визуал для соцсетей и интерфейсы. Мне важно, чтобы дизайн был не только красивым, но и решал задачу бизнеса.', 'I create brand identities, packaging, marketplace product cards, social media visuals and interfaces. I care that design looks good and solves the business task.')
    },
    sections: [
      { id: 'branding', type: 'std', title: L('Айдентика и брендинг', 'Identity & Branding'), lead: L('логотипы, фирменный стиль и визуальные системы', 'logos, brand identities and visual systems'), projects: [newProject('std', 'branding-1'), newProject('std', 'branding-2')] },
      { id: 'packaging', type: 'photo', title: L('Упаковка и полиграфия', 'Packaging & Print'), lead: L('от идеи до макета в производство', 'from concept to production-ready files'), projects: [newProject('photo', 'packaging-1'), newProject('photo', 'packaging-2')] },
      { id: 'marketplaces', type: 'mp', title: L('Маркетплейсы', 'Marketplaces'), lead: L('карточки товаров, которые повышают кликабельность', 'product cards that raise click-through rate'), projects: [newProject('mp', 'marketplaces-1'), newProject('mp', 'marketplaces-2')] },
      { id: 'smm', type: 'photo', title: L('SMM', 'SMM'), lead: L('посты, сторис, обложки и шаблоны', 'posts, stories, covers and templates'), projects: [newProject('photo', 'smm-1'), newProject('photo', 'smm-2')] },
      { id: 'uxui', type: 'long', title: L('UX/UI', 'UX/UI'), lead: L('интерфейсы сайтов и приложений', 'websites and app interfaces'), projects: [newProject('long', 'uxui-1'), newProject('long', 'uxui-2')] }
    ]
  });

  const ED_RU = { addProject: '+ Проект', removeSection: 'Удалить раздел', removeProject: 'Удалить', addSection: 'Новый раздел', typeStd: '+ С проектами', typeMp: '+ Маркетплейс', typePhoto: '+ Только фото', addSlide: '+ Слайд', removeSlide: '− Слайд', banner: 'Режим редактирования — кликните на текст, чтобы изменить. Изменения сохраняются в этом браузере.', reset: 'Сбросить всё', newSection: 'Новый раздел', newLead: 'короткое описание раздела', confirm: 'Удалить?', addBlock: 'Добавить блок', bFull: '+ Фрейм 16:9', bPair: '+ Две рядом', bTrio: '+ Три рядом', bVideo: '+ Видео / GIF', bText: '+ Текст', bCtr: '+ CTR (3 карточки)', videoPath: 'Путь к файлу:' };
  const ED_EN = { addProject: '+ Project', removeSection: 'Remove section', removeProject: 'Remove', addSection: 'New section', typeStd: '+ With projects', typeMp: '+ Marketplace', typePhoto: '+ Photos only', addSlide: '+ Slide', removeSlide: '− Slide', banner: 'Edit mode — click any text to change it. Changes are saved in this browser.', reset: 'Reset all', newSection: 'New section', newLead: 'short section description', confirm: 'Remove?', addBlock: 'Add block', bFull: '+ Frame 16:9', bPair: '+ Two up', bTrio: '+ Three up', bVideo: '+ Video / GIF', bText: '+ Text', bCtr: '+ CTR (3 cards)', videoPath: 'File path:' };
  const T = {
    ru: {
      first: 'Мария', last: 'Феоктистова', city: 'Санкт‑Петербург',
      hero: ['Мария', 'Феоктистова', 'графический', 'дизайнер'], heroSub: 'из Санкт‑Петербурга, 23 года', works: 'Мои работы', logoTop: 'мария', logoBottom: 'феоктистова',
      aboutLabel: 'Обо мне', facts: [{ k: 'Город', v: 'Санкт‑Петербург' }, { k: 'Возраст', v: '23 года' }, { k: 'Направления', v: 'Брендинг, упаковка, маркетплейсы, SMM, UX/UI' }],
      desc: 'Описание', task: 'Задача', before: 'до', after: 'после', growth: 'Рост',
      coverPh: 'Обложка 16:9', slotPh: 'Перетащите изображение', photoPh: 'Ваше фото', tilePh: 'фото', videoPh: 'Видео или GIF', videoHint: 'Пришлите файл — подключу. Или укажите путь в режиме редактирования.',
      open: 'Смотреть проект', allProjects: 'Все проекты', nextProject: 'Следующий проект', back: 'Назад',
      projects: n => n + ' ' + (n % 10 === 1 && n % 100 !== 11 ? 'проект' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 'проекта' : 'проектов'),
      contactLabel: 'Связь со мной', contactLine: [['Напишите'], ['мне'], 1, 1, ['—'], ['обсудим'], 1, ['ваш'], ['проект'], 1, ['.']], cardPh: 'Карточка 3:4', objPh: 'фото', contactTitle: 'Напишите мне', contactSub: 'в Telegram или на почту', copyHint: 'Скопировать почту', copied: 'Почта скопирована',
      nav: { about: 'Обо мне', contact: 'Контакты' }, ed: ED_RU
    },
    en: {
      first: 'Maria', last: 'Feoktistova', city: 'Saint Petersburg',
      hero: ['Maria', 'Feoktistova', 'graphic', 'designer'], heroSub: 'from Saint Petersburg, 23', works: 'My works', logoTop: 'maria', logoBottom: 'feoktistova',
      aboutLabel: 'About', facts: [{ k: 'City', v: 'Saint Petersburg' }, { k: 'Age', v: '23' }, { k: 'Focus', v: 'Branding, packaging, marketplaces, SMM, UX/UI' }],
      desc: 'Description', task: 'Task', before: 'before', after: 'after', growth: 'Growth',
      coverPh: 'Cover 16:9', slotPh: 'Drop an image', photoPh: 'Your photo', tilePh: 'photo', videoPh: 'Video or GIF', videoHint: 'Send me the file and I’ll connect it, or set the path in edit mode.',
      open: 'View project', allProjects: 'All projects', nextProject: 'Next project', back: 'Back',
      projects: n => n + (n === 1 ? ' project' : ' projects'),
      contactLabel: 'Contact', contactLine: [['Write'], ['to'], ['me'], 1, 1, ['—'], ['let’s'], ['talk'], 1, ['about'], ['your'], ['project'], 1, ['.']], cardPh: 'Card 3:4', objPh: 'photo', contactTitle: 'Say hello', contactSub: 'on Telegram or by e‑mail', copyHint: 'Copy e‑mail', copied: 'E‑mail copied',
      nav: { about: 'About', contact: 'Contact' }, ed: ED_EN
    }
  };
  const FONTS = {
    inter: { fd: "'Inter',sans-serif", fi: "'Inter',sans-serif", fb: "'Inter',sans-serif", w: 600, iw: 300, ls: '-0.045em' },
    manrope: { fd: "'Manrope',sans-serif", fi: "'Manrope',sans-serif", fb: "'Manrope',sans-serif", w: 600, iw: 400, ls: '-0.045em' },
    golos: { fd: "'Golos Text',sans-serif", fi: "'Golos Text',sans-serif", fb: "'Golos Text',sans-serif", w: 600, iw: 400, ls: '-0.04em' },
    onest: { fd: "'Onest',sans-serif", fi: "'Onest',sans-serif", fb: "'Onest',sans-serif", w: 600, iw: 400, ls: '-0.045em' },
    plex: { fd: "'IBM Plex Sans',sans-serif", fi: "'IBM Plex Sans',sans-serif", fb: "'IBM Plex Sans',sans-serif", w: 500, iw: 300, ls: '-0.035em' },
    editorial: { fd: "'Cormorant',serif", fi: "'Cormorant',serif", fb: "'Jost',sans-serif", w: 600, iw: 500, ls: '-0.025em' },
    geometric: { fd: "'Jost',sans-serif", fi: "'Jost',sans-serif", fb: "'Jost',sans-serif", w: 500, iw: 300, ls: '-0.04em' },
    grotesk: { fd: "'Inter Tight',sans-serif", fi: "'Inter Tight',sans-serif", fb: "'Inter Tight',sans-serif", w: 800, iw: 300, ls: '-0.06em' },
    montserrat: { fd: "'Montserrat',sans-serif", fi: "'Montserrat',sans-serif", fb: "'Montserrat',sans-serif", w: 700, iw: 300, ls: '-0.05em' },
    fira: { fd: "'Fira Sans',sans-serif", fi: "'Fira Sans',sans-serif", fb: "'Fira Sans',sans-serif", w: 600, iw: 300, ls: '-0.04em' },
    wide: { fd: "'Unbounded',sans-serif", fi: "'Montserrat',sans-serif", fb: "'Montserrat',sans-serif", w: 500, iw: 300, ls: '-0.05em' },
    serif: { fd: "'EB Garamond',serif", fi: "'EB Garamond',serif", fb: "'Jost',sans-serif", w: 500, iw: 400, ls: '-0.045em' },
    playfair: { fd: "'Playfair Display',serif", fi: "'Playfair Display',serif", fb: "'Montserrat',sans-serif", w: 500, iw: 400, ls: '-0.035em' },
    mix: { fd: "'Inter Tight',sans-serif", fi: "'Playfair Display',serif", fb: "'Inter Tight',sans-serif", w: 800, iw: 400, ls: '-0.06em' }
  };
  const KEY = 'mf6-content';
  const load = () => {
    try { const c = JSON.parse(localStorage.getItem(KEY) || 'null'); if (c && Array.isArray(c.sections)) return c; } catch (e) {}
    return DEFAULT();
  };
  const save = c => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} };
  const applyStyle = (fontPair, accent) => {
    let fp = fontPair, ac = accent;
    try {
      fp = fp || 'onest';
      ac = ac || '#5ab0ff';
    } catch (e) {}
    const r = document.documentElement, f = FONTS[fp] || FONTS.onest;
    r.style.setProperty('--accent', ac || '#5ab0ff');
    r.style.setProperty('--fd', f.fd); r.style.setProperty('--fi', f.fi); r.style.setProperty('--fb', f.fb);
    r.style.setProperty('--fdw', f.w); r.style.setProperty('--fiw', f.iw); r.style.setProperty('--fls', f.ls);
  };
  const fmt = (v, lang) => (lang === 'ru' ? String(v).replace('.', ',') : String(v)) + '%';
  const delta = (b, a) => { b = parseFloat(b); a = parseFloat(a); return (a >= b ? '+' : '') + Math.round((a / b - 1) * 100) + '%'; };
  const plural = n => n;
  const getLang = () => { try { return localStorage.getItem('mf-lang') || 'ru'; } catch (e) { return 'ru'; } };
  const setLang = l => { try { localStorage.setItem('mf-lang', l); } catch (e) {} };
  const projectHref = id => 'project.html?p=' + encodeURIComponent(id);
  const homeHref = 'index.html';
  const isLinkable = type => type === 'std' || type === 'long';

  // ── Google Sheets ──
  const SHEET = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSE15abJ4kyNvAkAIqli4s4DLEZy6XE2sFyGGEsjWRUjR2k-HIASY_vD8ySUJfLTNvATMbWY2JU8HJe/pub';
  // gid каждого листа (число после #gid= в адресе листа). razdely — первый лист, gid=0.
  const GIDS = { razdely: '0', proekty: '', freimy: '', marketpleisy: '', obshchee: '' };
  const parseCSV = text => {
    const rows = []; let row = [], cell = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
      else if (ch === '"') q = true;
      else if (ch === ',') { row.push(cell); cell = ''; }
      else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
      else cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows.filter(r => r.some(c => String(c).trim()));
  };
  const fetchSheet = gid => (gid === '' || gid == null) ? Promise.resolve(null) :
    fetch(SHEET + '?output=csv&single=true&gid=' + gid, { cache: 'no-store' }).then(r => r.ok ? r.text() : null).then(t => t ? parseCSV(t).slice(1).map(r => r.map(c => String(c).trim())) : null).catch(() => null);
  const img = url => {
    url = String(url || '').trim(); if (!url) return '';
    const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]{10,})/) || url.match(/[?&]id=([\w-]{10,})/);
    return m && /google\./.test(url) ? 'https://lh3.googleusercontent.com/d/' + m[1] + '=w2800' : url;
  };
  const vid = url => {
    url = String(url || '').trim(); if (!url) return '';
    const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]{10,})/);
    return m ? 'https://drive.google.com/uc?export=download&id=' + m[1] : url;
  };
  const yes = v => !/^(нет|no|0|false|скрыть)$/i.test(String(v || '').trim());
  const TYPE = { 'проекты': 'std', 'проект': 'std', 'фото': 'photo', 'маркетплейс': 'mp', 'маркетплейсы': 'mp' };
  const num = v => String(v || '').replace(',', '.').replace('%', '').trim();
  let sheetP = null;
  const SEC = { 'айдентика и брендинг': 'branding', 'айдентика': 'branding', 'брендинг': 'branding', 'упаковка и полиграфия': 'packaging', 'упаковка': 'packaging', 'маркетплейсы': 'marketplaces', 'маркетплейс': 'marketplaces', 'smm': 'smm', 'смм': 'smm', 'ux/ui': 'uxui', 'uxui': 'uxui', 'ux ui': 'uxui' };
  const low = s => String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();
  function loadSheet() {
    if (sheetP) return sheetP;
    const DOC = 'https://docs.google.com/spreadsheets/d/1qnLcwWYLOU0QcLQ1m77TiTSf0eBt8cFDGH00n1oLcSs/gviz/tq?tqx=out:csv&headers=0&gid=0&t=' + Date.now();
    sheetP = fetch(DOC, { cache: 'no-store' }).then(r => r.ok ? r.text() : null).catch(() => null).then(t => t && /→/.test(t) ? t : fetch(SHEET + '?output=csv', { cache: 'no-store' }).then(r => r.ok ? r.text() : null)).then(t => {
      if (!t) return null;
      const rows = parseCSV(t).map(r => r.map(c => String(c).trim()));
      const base = DEFAULT(), site = {}, projs = {};
      rows.forEach(r => {
        if (!/→|->/.test(r[0] || '')) return;
        const parts = r[0].split(/→|->/).map(low), val = r[1] || '';
        const sec = parts[0];
        let m, n = 0, what = parts[parts.length - 1];
        if (parts[1] && (m = parts[1].match(/проект\s*(\d+)/))) n = +m[1];
        if (/первый экран|главн/.test(sec)) { if ((m = what.match(/(\d+)/))) site['hero_' + m[1]] = img(val); return; }
        if (/обо мне/.test(sec)) {
          if (/фото/.test(what)) site.about_photo = img(val);
          else if (/заголов/.test(what) && val) base.about.title = L(val, val);
          else if (/текст/.test(what) && val) base.about.text = L(val, val);
          return;
        }
        if (/связь|контакт/.test(sec)) { if ((m = what.match(/(\d+)/))) site['contact_' + m[1]] = img(val); return; }
        const id = SEC[sec]; if (!id || !n) return;
        projs[id] = projs[id] || {};
        const P = projs[id][n] = projs[id][n] || { frames: [], cards: {} };
        if (parts.length >= 4 && (m = parts[2].match(/карточка\s*(\d+)/))) {
          const c = P.cards[m[1]] = P.cards[m[1]] || { srcs: [] };
          if (/после/.test(what)) c.after = num(val); else if (/до/.test(what) && /ctr/.test(what)) c.before = num(val);
          else if ((m = what.match(/(\d+)/))) c.srcs[(+m[1]) - 1] = img(val);
          return;
        }
        if (/подробн/.test(what)) { if (/^опис/.test(what)) P.descFull = val; else if (/^задач/.test(what)) P.taskFull = val; }
        else if (/^назв/.test(what)) P.title = val;
        else if (/^опис/.test(what)) P.desc = val;
        else if (/^задач/.test(what)) P.task = val;
        else if (/обложк|^фото$/.test(what)) P.cover = img(val);
        else if ((m = what.match(/(фрейм|видео)\s*(\d+)/))) { if (val) P.frames.push({ n: +m[2], video: /видео/.test(what), val }); }
      });
      base.sections.forEach(s => {
        const g = projs[s.id]; if (!g) return;
        s.projects = Object.keys(g).map(Number).sort((x, y) => x - y).map(n => {
          const P = g[n], p = newProject(s.type, s.id + '-' + n);
          if (P.title) p.title = L(P.title, P.title);
          if (P.desc) p.desc = L(P.desc, P.desc);
          if (P.task) p.task = L(P.task, P.task);
          p.cover = P.cover || '';
          if (P.descFull) p.descFull = L(P.descFull, P.descFull);
          if (P.taskFull) p.taskFull = L(P.taskFull, P.taskFull);
          if (s.type !== 'mp') {
            const byN = {}; P.frames.forEach(fr => (byN[fr.n] = fr));
            const mx = Math.max(4, ...P.frames.map(fr => fr.n));
            p.blocks = [];
            for (let k = 1; k <= mx; k++) {
              const fr = byN[k], id = p.id + '-b' + k;
              if (!fr && k > 4) continue;
              p.blocks.push(fr && fr.video ? { id, type: 'video', aspect: '16/9', src: vid(fr.val) } : { id, type: 'full', aspect: '16/9', src: fr ? img(fr.val) : '' });
            }
          }
          if (s.type === 'mp') {
            const ks = Object.keys(P.cards).map(Number).sort((x, y) => x - y);
            if (ks.length) p.cards = ks.map((k, i) => { const c = P.cards[k], dflt = CTR[i % 3]; return { before: c.before || dflt[0], after: c.after || dflt[1], srcs: c.srcs }; });
          }
          return p;
        });
      });
      return { about: base.about, sections: base.sections, site, fromSheet: true };
    }).catch(() => null);
    return sheetP;
  }
  // id + src for an image-slot: sheet image wins and uses its own slot id
  const slot = (id, url) => url ? { id: 'sh-' + id, src: url } : { id, src: '' };
  // Адрес веб-приложения Google Apps Script (см. инструкцию). Пусто — запись в таблицу выключена.
  const WRITE_URL = '';
  const push = (place, value) => {
    if (!WRITE_URL || !place) return;
    try { fetch(WRITE_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ place, value }) }); } catch (e) {}
  };
  const place = (secTitle, n, field) => secTitle + ' → Проект ' + n + ' → ' + field;
  const FILLED = new Set(["branding-1-b4","hero-3","hero-1","hero-2","branding-2-cover","branding-1-b1","branding-1-b2","branding-1-b3","about-photo","branding-1-cover","hero-5","contact-obj-3","contact-obj-4","contact-obj-2","contact-obj-1","hero-4"]);
  window.PF = { L, uid, ASPECTS, newBlock, newProject, DEFAULT, T, FONTS, KEY, load, save, applyStyle, fmt, delta, plural, getLang, setLang, projectHref, homeHref, isLinkable, loadSheet, FILLED, slot, GIDS, push, place };
})();
