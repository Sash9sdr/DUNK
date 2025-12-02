
import { MenuSectionData } from './types';

export const KITCHEN_MENU: MenuSectionData[] = [
  {
    id: 'salaty',
    title: 'Салаты',
    items: [
      {
        title: 'Цезарь',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop',
        description: 'Микс салатов, черри, пармезан, сухари, соус «Цезарь».',
        variations: [
          { name: 'с индейкой', weight: '250 г', price: 410 },
          { name: 'с креветкой', weight: '220 г', price: 530 },
        ],
      },
      {
        title: 'Креветка с песто',
        description: 'Микс салатов, креветки, черри, пармезан, соус песто.',
        variations: [{ weight: '200 г', price: 480 }],
      },
      {
        title: 'Греческий',
        description: 'Микс салатов, огурец, болгарский перец, черри, оливки и маслины, брынза, лёгкая заправка.',
        variations: [{ weight: '240 г', price: 410 }],
      },
      {
        title: 'Тёплый салат с индейкой',
        description: 'Микс салатов, картофельные дольки, шампиньоны, черри, тёплая индейка, соус Dunk.',
        variations: [{ weight: '320 г', price: 550 }],
      },
    ],
  },
  {
    id: 'supy',
    title: 'Супы',
    items: [
      {
        title: 'Том Ям',
        isSpicy: true,
        image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b485c?q=80&w=800&auto=format&fit=crop',
        description: 'Тайский острый бульон, рис, черри, шампиньоны, кокосовое молоко и сливки, паста том ям, лайм, кунжут, кинза.',
        variations: [
          { name: 'с индейкой', weight: '500 г', price: 580 },
          { name: 'с морепродуктами', weight: '520 г', price: 680 },
        ],
      },
      {
        title: 'Том Кха',
        image: 'https://images.unsplash.com/photo-1627926131464-927b1349f76a?q=80&w=800&auto=format&fit=crop',
        description: 'Сливочный тайский суп с рисом, черри, шампиньонами, кокосовым молоком, сливками, пастой том кха, лаймом, кунжутом и кинзой.',
        variations: [
          { name: 'с индейкой', weight: '500 г', price: 580 },
          { name: 'с морепродуктами', weight: '520 г', price: 680 },
        ],
      },
    ],
  },
  {
    id: 'vok-lapsha',
    title: 'Вок-лапша',
    note: 'Лапша на выбор: удон / соба / яичная.\nПо умолчанию: карамельно‑апельсиновая — яичная, пад тай — удон, зелёный карри — соба.',
    items: [
      {
        title: 'Карамельно‑апельсиновая',
        description: 'Овощи, яйцо, карамельно‑апельсиновый соус, кунжут, зелёный лук.',
        variations: [
          { name: 'овощная', weight: '320 г', price: 390 },
          { name: 'с индейкой', weight: '390 г', price: 470 },
          { name: 'с морепродуктами', weight: '380 г', price: 570 },
        ],
      },
      {
        title: 'Пад тай',
        description: 'Овощи, яйцо, фирменный соус пад тай, кунжут, зелёный лук.',
        variations: [
          { name: 'овощной', weight: '320 г', price: 390 },
          { name: 'с индейкой', weight: '390 г', price: 470 },
          { name: 'с морепродуктами', weight: '380 г', price: 570 },
        ],
      },
      {
        title: 'Зелёный карри',
        isSpicy: true,
        description: 'Овощи, яйцо, соус зелёный карри, кунжут, зелёный лук.',
        variations: [
          { name: 'овощной', weight: '320 г', price: 390 },
          { name: 'с индейкой', weight: '390 г', price: 470 },
          { name: 'с морепродуктами', weight: '380 г', price: 570 },
        ],
      },
    ],
  },
  {
    id: 'ris',
    title: 'Рис',
    items: [
      {
        title: 'Жареный рис',
        image: 'https://images.unsplash.com/photo-1603133872878-684f10842740?q=80&w=800&auto=format&fit=crop',
        description: 'Овощи, яйцо, соевый соус, кунжутное масло, зелёный лук.',
        variations: [
          { name: 'с овощами', weight: '280 г', price: 390 },
          { name: 'с индейкой', weight: '350 г', price: 470 },
          { name: 'с морепродуктами', weight: '340 г', price: 570 },
        ],
      },
      {
        title: 'Жёлтый рис карри',
        description: 'Овощи (цукини, грибы, морковь, перец), соус «жёлтый карри».',
        variations: [
          { name: 'с индейкой', price: 520 },
          { name: 'с морепродуктами', price: 620 },
        ],
      },
      {
        title: 'Красный рис карри',
        isSpicy: true,
        description: 'Овощи (цукини, грибы, морковь, перец), соус «красный карри».',
        variations: [
          { name: 'с индейкой', price: 520 },
          { name: 'с морепродуктами', price: 620 },
        ],
      },
    ],
  },
  {
    id: 'rolly',
    title: 'Роллы',
    items: [
      {
        title: 'Филадельфия',
        image: 'https://images.unsplash.com/photo-1617196019294-dc44dfacb251?q=80&w=800&auto=format&fit=crop',
        description: 'Лосось, сливочный сыр, авокадо.',
        variations: [{ weight: '4 шт', price: 510 }],
      },
      {
        title: 'Филадельфия унаги',
        description: 'Угорь, сливочный сыр, соус унаги, кунжут.',
        variations: [{ weight: '4 шт', price: 550 }],
      },
      {
        title: 'Калифорния',
        description: 'Лосось, креветка, авокадо, икра.',
        variations: [{ weight: '4 шт', price: 510 }],
      },
      {
        title: 'Ролл запечённый',
        isHighlighted: true,
        image: 'https://images.unsplash.com/photo-1635548166842-bf67bacbefaa?q=80&w=800&auto=format&fit=crop',
        description: 'Краб‑сурими, сливочный сыр, икра, креветка, лосось, соус унаги; запекается под фирменной «шапкой»',
        variations: [{ weight: '4 шт', price: 570 }],
      },
      {
        title: 'Ролл опалённый',
        isHighlighted: true,
        description: 'Краб‑сурими, сливочный сыр, креветка, тунец, соус унаги, соус Dunk; поверхность ролла аккуратно опаляется.',
        variations: [{ weight: '4 шт', price: 550 }],
      },
      {
        title: 'Ролл Dunk',
        isHighlighted: true,
        description: 'Сливочный сыр, икра, креветка, лосось, тунец, авокадо, лук кранч, крем бальзамический, соус унаги; обжаривается во фритюре.',
        variations: [{ weight: '4 шт', price: 600 }],
      },
    ],
  },
  {
    id: 'rolly-small',
    title: 'Малые роллы (8 шт.)',
    items: [
      { title: 'С лососем', price: 300 },
      { title: 'С угрём', price: 340 },
      { title: 'С тунцом', price: 280 },
      { title: 'С креветкой', price: 300 },
      { title: 'С огурцом', price: 240 },
    ],
  },
  {
    id: 'sneki',
    title: 'Снеки',
    note: 'Все снеки подаются с соусом на выбор.',
    items: [
      { title: 'Картофельные дольки', variations: [{ weight: '200 г', price: 320 }] },
      { title: 'Картофель фри', variations: [{ weight: '200 г', price: 320 }] },
      { title: 'Луковые кольца фри', variations: [{ weight: '10 шт', price: 270 }] },
      { title: 'Стрипсы из индейки', variations: [{ weight: '5 шт', price: 380 }] },
      { title: 'Палочки моцареллы', variations: [{ weight: '5 шт', price: 350 }] },
      { title: 'Гренки чесночные', variations: [{ weight: '120 г', price: 180 }] },
      { title: 'Начос ассорти', variations: [{ weight: '80 г', price: 300 }] },
      { title: 'Куринный попкорн', variations: [{ weight: '130 г', price: 380 }] },
      { title: 'Крылышки в панировке', variations: [{ weight: '3 шт', price: 570 }] },
      { title: 'Креветки в панировке', variations: [{ weight: '6 шт', price: 700 }] },
      {
        title: 'Пивная тарелка',
        isHighlighted: true,
        price: '1 350',
        description: 'Дольки 100 г, фри 100 г, луковые кольца 5 шт., стрипсы 3 шт., палочки моцареллы 3 шт., гренки 100 г, начос 40 г. 3 соуса.',
      },
    ],
  },
  {
    id: 'sousy',
    title: 'Соусы',
    items: [
      {
        title: 'Ассорти соусов',
        variations: [{ weight: '30 г', price: 80 }],
        description: 'Кетчуп • Сальса • Спайси • Унаги • Барбекю • Цезарь • Dunk • Сырный • Чесночный \n\n *Фирменный соус Dunk — остро‑сливочный на основе майонеза и тайского чили.*',
      },
    ],
  },
  {
    id: 'deserty',
    title: 'Десерты',
    items: [
      { title: 'Чизкейк карамель‑арахис', variations: [{ weight: '100 г', price: 250 }] },
      { title: 'Красный бархат', variations: [{ weight: '100 г', price: 250 }] },
      {
        title: 'Десерт DUNK',
        isHighlighted: true,
        variations: [{ weight: '110 г', price: 300 }],
      },
    ],
  },
];

export const BAR_MENU: MenuSectionData[] = [
  {
    id: 'chay',
    title: 'Чай',
    items: [
      { title: 'Чёрный', price: 280 },
      { title: 'Зелёный', price: 280 },
      { title: 'С бергамотом', price: 280 },
      { title: 'Травяной', price: 280 },
    ],
  },
  {
    id: 'firm-chay',
    title: 'Фирменный чай',
    items: [
      { title: 'Облепиха, Груша, Розмарин', variations: [{ weight: '1000 мл', price: 440 }] },
      { title: 'Имбирь, Лимон, Мёд, Мята', variations: [{ weight: '1000 мл', price: 440 }] },
      { title: 'Гранатовый DUNK', variations: [{ weight: '1000 мл', price: 440 }] },
      { title: 'Малина, Клюква, Гвоздика', variations: [{ weight: '1000 мл', price: 440 }] },
    ],
  },
  {
    id: 'kitay-chay',
    title: 'Китайский чай',
    items: [
      { title: 'Шу Пуэр', price: 690 },
      { title: 'Шен Пуэр', price: 690 },
      { title: 'Габа', price: 690 },
      { title: 'Да Хун Пао', price: 690 },
      { title: 'Те Гуань Инь', price: 690 },
    ],
  },
  {
    id: 'limonady',
    title: 'Лимонады',
    items: [
      { title: 'Манго - Жасмин', price: 340 },
      { title: 'Ежевика - Гранат', price: 340 },
      { title: 'Груша - Алыча', price: 340 },
      { title: 'Малина - Базилик', price: 340 },
      { title: 'Лаванда - Ирга - Чёрная Смородина', price: 340 },
      { title: 'Личи - Мандарин', price: 340 },
    ],
  },
  {
    id: 'kokteyli',
    title: 'Коктейли',
    items: [
      { 
        title: 'Negroni', 
        price: 530,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Aperol Spritz', 
        price: 520,
        image: 'https://images.unsplash.com/photo-1560512823-8db03e1b0949?q=80&w=800&auto=format&fit=crop'
      },
      { title: 'Gin Fizz', price: 450 },
      { title: 'Gin Peach', price: 480 },
      { title: 'Gin Basil Smash', price: 480 },
      { title: 'Ecstazy', price: 480 },
      { title: 'Cosmopolitan', price: 420 },
      { title: 'Pavlova', price: 520 },
      { title: 'Sicily', price: 520 },
    ],
  },
  {
    id: 'pivo',
    title: 'Пиво',
    items: [
       { title: 'Сэмпл Пиво 1', price: 350, description: 'Светлое фильтрованное' },
       { title: 'Сэмпл Пиво 2', price: 400, description: 'Темное нефильтрованное' },
    ]
  },
  {
    id: 'napitki',
    title: 'Напитки',
     items: [
       { title: 'Coca-Cola', price: 200 },
       { title: 'Вода', price: 150 },
    ]
  },
];
