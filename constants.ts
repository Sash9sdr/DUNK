
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
        image: 'https://images.unsplash.com/photo-1606850246029-dd00bd5d0e1a?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1626804475297-411d8c6b7eb6?q=80&w=800&auto=format&fit=crop',
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
    subHeader: 'Порция 4 шт',
    items: [
      {
        title: 'Филадельфия',
        image: 'https://images.unsplash.com/photo-1617196019294-dc44dfacb251?q=80&w=800&auto=format&fit=crop',
        description: 'Лосось, сливочный сыр, авокадо.',
        price: 510,
      },
      {
        title: 'Филадельфия унаги',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop',
        description: 'Угорь, сливочный сыр, соус унаги, кунжут.',
        price: 550,
      },
      {
        title: 'Калифорния',
        image: 'https://images.unsplash.com/photo-1605493666455-83569805560b?q=80&w=800&auto=format&fit=crop',
        description: 'Лосось, креветка, авокадо, икра.',
        price: 510,
      },
      {
        title: 'Ролл запечённый',
        isHighlighted: true,
        image: 'https://images.unsplash.com/photo-1635548166842-bf67bacbefaa?q=80&w=800&auto=format&fit=crop',
        description: 'Краб‑сурими, сливочный сыр, икра, креветка, лосось, соус унаги; запекается под фирменной «шапкой»',
        price: 570,
      },
      {
        title: 'Ролл опалённый',
        isHighlighted: true,
        description: 'Краб‑сурими, сливочный сыр, креветка, тунец, соус унаги, соус Dunk; поверхность ролла аккуратно опаляется.',
        price: 550,
      },
      {
        title: 'Ролл Dunk',
        isHighlighted: true,
        description: 'Сливочный сыр, икра, креветка, лосось, тунец, авокадо, лук кранч, крем бальзамический, соус унаги; обжаривается во фритюре.',
        price: 600,
      },
    ],
  },
  {
    id: 'rolly-small',
    title: 'Малые роллы',
    subHeader: 'Порция 8 шт',
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
    title: 'Закуски',
    note: 'Все снеки подаются с соусом на выбор.',
    items: [
      { 
        title: 'Лепёшка перуанская', 
        description: 'Лепёшка, моцарелла, овощи, соус пад-тай, майонез',
        variations: [{ weight: '230 г', price: 320 }] 
      },
      { 
        title: 'Лепёшка с индейкой', 
        description: 'Лепёшка, индейка, моцарелла, черри, микс салатов, лук красный, соус карри ананас',
        variations: [{ weight: '230 г', price: 320 }] 
      },
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
        description: 'Кетчуп • Сальса • Спайси • Унаги • Барбекю • Цезарь • Dunk • Сырный • Чесночный\n\n*Фирменный соус Dunk — остро‑сливочный на основе майонеза и тайского чили.*',
      },
    ],
  },
  {
    id: 'deserty',
    title: 'Десерты',
    items: [
      { 
        title: 'Чизкейк карамель‑арахис', 
        image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?q=80&w=800&auto=format&fit=crop',
        variations: [{ weight: '100 г', price: 250 }] 
      },
      { 
        title: 'Красный бархат', 
        image: 'https://images.unsplash.com/photo-1586788224331-947f68671cf1?q=80&w=800&auto=format&fit=crop',
        variations: [{ weight: '100 г', price: 250 }] 
      },
      {
        title: 'Десерт DUNK',
        isHighlighted: true,
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop',
        variations: [{ weight: '110 г', price: 300 }],
      },
    ],
  },
];

export const BAR_MENU: MenuSectionData[] = [
  {
    id: 'kofe',
    title: 'Кофе',
    note: 'По Вашему желанию можем добавить 10мл сиропа из нашего ассортимента.',
    items: [
      { title: 'Эспрессо', variations: [{ weight: '30 мл', price: 180 }] },
      { title: 'Американо', variations: [{ weight: '180 мл', price: 180 }] },
      { title: 'Капучино', variations: [{ weight: '300 мл', price: 220 }] },
      { title: 'Латте', variations: [{ weight: '300 мл', price: 220 }] },
      { title: 'Флэт Уайт', variations: [{ weight: '180 мл', price: 260 }] },
    ],
  },
  {
    id: 'chay',
    title: 'Чай',
    items: [
      { title: 'Ассам', variations: [{ weight: '500 мл', price: 280 }] },
      { title: 'Сенча', variations: [{ weight: '500 мл', price: 280 }] },
      { title: 'Травяной сбор', variations: [{ weight: '500 мл', price: 280 }] },
    ],
  },
  {
    id: 'firm-chay',
    title: 'Фирменный чай',
    items: [
      { title: 'Облепиха, Груша, Розмарин', variations: [{ weight: '800 мл', price: 390 }] },
      { title: 'Имбирь, Лимон, Мёд, Мята', variations: [{ weight: '800 мл', price: 390 }] },
      { title: 'Малина, Лемонграсс, Тимьян', variations: [{ weight: '800 мл', price: 390 }] },
    ],
  },
  {
    id: 'kitay-chay',
    title: 'Китайский чай',
    note: 'Проведём для Вас чайную церемонию в которую входит: чабань, гайвань, чахай, чайный дух, пиалы, и расскажем о самом чае и о его эффектах.',
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
      { title: 'Манго - Жасмин', variations: [{ weight: '470 мл', price: 380 }] },
      { title: 'Ежевика - Гранат', variations: [{ weight: '470 мл', price: 380 }] },
      { title: 'Груша - Алыча', variations: [{ weight: '470 мл', price: 380 }] },
      { title: 'Малина - Базилик', variations: [{ weight: '470 мл', price: 380 }] },
      { title: 'Лаванда - Ирга - Чёрная Смородина', variations: [{ weight: '470 мл', price: 380 }] },
    ],
  },
  {
    id: 'kokteyli',
    title: 'Коктейли',
    note: 'Все коктейли на джине можем сделать безалкогольными',
    items: [
      { 
        title: 'Aperol Spritz', 
        price: 600,
        weight: '285 мл',
        alcoholStrength: 'light',
        description: 'Апероль, игристое, содовая',
        image: 'https://images.unsplash.com/photo-1560512823-8db03e1b0949?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Negroni', 
        price: 540,
        weight: '105 мл',
        alcoholStrength: 'medium',
        description: 'Джин, биттер, вермут',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop'
      },
      { 
        title: 'Gin Peach', 
        price: 480, 
        weight: '105 мл',
        alcoholStrength: 'medium',
        description: 'Джин, персик, лаванда'
      },
      { 
        title: 'Gin Basil Smash', 
        price: 480,
        weight: '120 мл',
        alcoholStrength: 'medium',
        description: 'Джин, базилик, лимон'
      },
      { 
        title: 'Gin Fizz', 
        price: 480, 
        weight: '140 мл',
        alcoholStrength: 'medium',
        description: 'Джин, лимон, содовая'
      },
      { 
        title: 'Ecstazy', 
        price: 480, 
        weight: '150 мл',
        alcoholStrength: 'light',
        description: 'Водка, малина, кокос, ананас'
      },
      { 
        title: 'Cosmopolitan', 
        price: 480, 
        weight: '115 мл',
        alcoholStrength: 'medium',
        description: 'Цитрусовая водка, апельсиновый ликёр, клюква, лайм'
      },
      { 
        title: 'Pavlova', 
        price: 540, 
        weight: '115 мл',
        alcoholStrength: 'medium',
        description: 'Джин, кордиал «Павлова»'
      },
      { 
        title: 'Sicily', 
        price: 540, 
        weight: '205 мл',
        alcoholStrength: 'light',
        description: 'Джин, лимон, ревень, малина, земляника, фейхоа, яблоко'
      },
    ],
  },
  {
    id: 'krepkiy-alkogol',
    title: 'Крепкий алкоголь',
    subHeader: 'Порция 40 мл',
    items: [
        { title: 'Водка Царская', price: 170 },
        { title: 'Водка Белуга', price: 330 },
        { title: 'Джин Barrister', price: 230 },
        { title: 'Виски William Lawson\'s', price: 270 },
        { title: 'Виски Ballantines', price: 330 },
        { title: 'Виски Jameson', price: 390 },
        { title: 'Коньяк Арарат 5 звёзд', price: 330 },
        { title: 'Текила Olmeca Silver', price: 390 },
    ]
  },
  {
    id: 'pivo',
    title: 'Пиво',
    items: [
       { title: 'Два бобра', weight: '450 мл', price: 420, description: 'Светлое фильтрованное; 4,8%' },
       { title: 'Белый кролик', weight: '450 мл', price: 420, description: 'Светлое нефильтрованное; 4,8%' },
       { title: 'Сорбет малина', weight: '450 мл', description: 'Фруктовое; 4,5%', price: 440 },
    ]
  },
  {
    id: 'napitki',
    title: 'Напитки',
     items: [
       { title: 'Cola', weight: '300 мл', price: 200 },
       { title: '7up', weight: '300 мл', price: 200 },
       { title: 'Mirinda', weight: '300 мл', price: 200 },
       { title: 'Pepsi', weight: '300 мл', price: 200 },
    ]
  },
];
