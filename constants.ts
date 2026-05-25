import { MenuSectionData } from './types';

export const SPECIAL_FOOD_MENU: MenuSectionData[] = [
  {
    id: 'special-food',
    title: 'Special Food',
    items: [
      { 
        title: 'Поке с курицей', 
        price: 450, 
        isHighlighted: true,
        description: 'Состав: рис, куриное филе в фирменной заправке, кукуруза, битые огурцы, стручковая фасоль, черри, авокадо, азиатская заправка, кунжут.'
      },
      { 
        title: 'Поке с лососем', 
        price: 550, 
        isHighlighted: true,
        description: 'Состав: рис, лосось, кукуруза, битые огурцы, стручковая фасоль, черри, авокадо, азиатская заправка, кунжут.'
      },
      { 
        title: 'Гамбургер', 
        price: 650, 
        isHighlighted: true,
        description: 'Состав: булочка бриошь, говяжья котлета, айсберг, томат, майонез, кетчуп, маринованные огурцы.'
      },
      { 
        title: 'Чизбургер', 
        price: 700, 
        isHighlighted: true,
        description: 'Состав: булочка бриошь, говяжья котлета, чеддер, айсберг, томат, сырный соус, соус Данк, майонез, кетчуп, маринованные огурцы.'
      },
      { 
        title: 'Чикен бургер', 
        price: 500, 
        isHighlighted: true,
        description: 'Состав: булочка бриошь, куриное филе су-вид, айсберг, томат, соус Данк, майонез, кетчуп, маринованные огурцы.'
      },
      { 
        title: 'Фо Га', 
        price: 450, 
        isHighlighted: true,
        description: 'Состав: куриный бульон, красный лук, куриное филе, лапша удон, соус шрирача, лайм, зеленый лук, кинза.'
      },
      { 
        title: 'Хот-дог Данк', 
        price: 550, 
        isHighlighted: true,
        description: 'Состав: булочка бриошь, куриная колбаска, соус Данк, айсберг, огуречный релиш, говяжий фарш, сырный соус, чеддер, лук фри.'
      },
      { 
        title: 'Хот-дог Классический', 
        price: 450, 
        isHighlighted: true,
        description: 'Состав: булочка бриошь, куриная колбаска, айсберг, майонез, кетчуп, помидор, лук фри.'
      },
    ]
  }
];

export const SPECIAL_BAR_MENU: MenuSectionData[] = [
  {
    id: 'special-cocktails',
    title: 'Special Bar',
    items: [
      {
        title: 'Grinch Gin Fizz',
        isHighlighted: true,
        image: 'https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/%D0%9C%D0%B5%D0%BD%D1%8E/IMG_2501.PNG',
        description: 'Состав: джин, лимон, дыня.',
        price: 480,
        alcoholStrength: 'medium'
      },
      {
        title: 'Mandarin',
        isHighlighted: true,
        image: 'https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/%D0%9C%D0%B5%D0%BD%D1%8E/IMG_2433.PNG',
        description: 'Состав: текила, мандариново-ванильный кордиал, цитрус, лайм.',
        price: 480,
        alcoholStrength: 'medium'
      },
      {
        title: 'Milk Punch',
        isHighlighted: true,
        image: 'https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/%D0%9C%D0%B5%D0%BD%D1%8E/IMG_2423.PNG',
        description: 'Состав: ром, смородина, ананас, пряный чай.',
        price: 480,
        alcoholStrength: 'medium'
      }
    ]
  }
];

export const KITCHEN_MENU: MenuSectionData[] = [
  {
    id: 'frityur',
    title: 'Фритюр',
    items: [
      {
        title: 'Луковые кольца',
        weight: '10 шт',
        price: 270,
        description: 'Подаётся порцией из 10 шт.'
      },
      {
        title: 'Картофельные дольки',
        weight: '200 г',
        price: 320,
        description: 'Картофельные дольки со специями.'
      },
      {
        title: 'Палочки моцареллы',
        weight: '5 шт',
        price: 350,
        description: 'Палочки сыра моцарелла в панировке.'
      },
      {
        title: 'Картошель фри',
        weight: '200 г',
        price: 320,
        description: 'Классический картофель фри.'
      },
      {
        title: 'Гренки чесночные',
        weight: '100 г',
        price: 180,
        description: 'Ржаные чесночные гренки.'
      },
      {
        title: 'Нагетсы',
        weight: '7 шт',
        price: 380,
        description: 'Куриные нагетсы.'
      },
      {
        title: 'Пивная тарелка',
        isHighlighted: true,
        price: '1 350',
        description: 'Состав: по 100 г картофельных долек, фри и гренок, 5 луковых колец, 3 палочки моцареллы и 5 нагетсов.'
      }
    ]
  },
  {
    id: 'supy',
    title: 'Супы',
    items: [
      {
        title: 'Том Ям',
        isSpicy: true,
        description: 'Палитра вкусов традиционного супа. Подаётся с рисом.',
        variations: [
          { name: 'с куриным филе', price: 580, weight: '500 г', description: 'Состав: бульон том ям, кокосовое молоко, черри, шампиньоны, куриное филе, кинза, кунжут, рис.' },
          { name: 'с морепродуктами', price: 680, weight: '520 г', description: 'Состав: бульон том ям, кокосовое молоко, черри, шампиньоны, кальмар, мидии, креветки, кинза, кунжут, рис.' }
        ]
      },
      {
        title: 'Фо Га',
        price: 450,
        weight: '550 г',
        description: 'Состав: куриный бульон, красный лук, куриное филе, лапша удон, соус шрирача, лайм, зеленый лук, кинза.'
      }
    ]
  },
  {
    id: 'street-food',
    title: 'Стрит фуд',
    items: [
      {
        title: 'Бургеры',
        description: 'Свежие бургеры на мягких булочках бриошь.',
        variations: [
          { name: 'Чикен бургер', price: 500, description: 'Состав: булочка бриошь, куриное филе су-вид, айсберг, томат, соус Данк, майонез, кетчуп, маринованные огурцы.' },
          { name: 'Гамбургер', price: 650, description: 'Состав: булочка бриошь, говяжья котлета, айсберг, томат, майонез, кетчуп, маринованные огурцы.' },
          { name: 'Чизбургер', price: 700, description: 'Состав: булочка бриошь, говяжья котлета, чеддер, айсберг, томат, сырный соус, соус Данк, майонез, кетчуп, маринованные огурцы.' }
        ]
      },
      {
        title: 'Кесадилья',
        description: 'Запечённая кесадилья.',
        variations: [
          { name: 'с овощами', price: 320, weight: '210 г' },
          { name: 'с курицей', price: 320, weight: '240 г' }
        ]
      },
      {
        title: 'Пицца',
        description: 'Классическая пицца на тонком тесте.',
        variations: [
          { name: 'Маргарита', price: 450, description: 'Состав: томат, сальса, моцарелла, оливковое масло, прованские травы.' },
          { name: 'Пепперони', price: 520, description: 'Состав: колбаски пепперони, сальса, моцарелла, прованские травы, оливковое масло.' },
          { name: 'Чикенчиз', price: 560, description: 'Состав: курица, чеддер, пармезан, моцарелла, соус Данк, сырный соус.' }
        ]
      },
      {
        title: 'Хот-дог',
        description: 'Хот-доги на булочке бриошь.',
        variations: [
          { name: 'Классический', price: 450, description: 'Состав: булочка бриошь, куриная колбаска, айсберг, майонез, кетчуп, помидор, лук фри.' },
          { name: 'Данк', price: 550, description: 'Состав: булочка бриошь, куриная колбаска, соус Данк, айсберг, огуречный релиш, говяжий фарш, сырный соус, чеддер, лук фри.' }
        ]
      },
      {
        title: 'Чизи Фри с говядиной',
        price: 360,
        weight: '250 г',
        description: 'Состав: картофель фри, говяжий фарш, чеддер, сырный соус, сальса, копченая паприка.'
      }
    ]
  },
  {
    id: 'salaty',
    title: 'Салаты & Поке',
    items: [
      {
        title: 'Цезарь',
        description: 'Классический салат с соусом цезарь и пармезаном.',
        variations: [
          { name: 'с куриным филе', price: 410, weight: '250 г', description: 'Состав: салат айсберг, черри, соус цезарь, куриное филе, сухари, пармезан.' },
          { name: 'с креветкой', price: 530, weight: '220 г', description: 'Состав: салат айсберг, черри, соус цезарь, креветка, сухари, пармезан.' }
        ]
      },
      {
        title: 'Поке',
        description: 'Боул на основе риса со свежими овощами.',
        variations: [
          { name: 'с курицей', price: 450, weight: '330 г', description: 'Состав: рис, куриное филе в фирменной заправке, кукуруза, битые огурцы, стручковая фасоль, черри, авокадо, азиатская заправка, кунжут.' },
          { name: 'с тунцом', price: 500, weight: '320 г', description: 'Состав: рис, тунец в ореховой заправке, кукуруза, битые огурцы, стручковая фасоль, черри, авокадо, азиатская заправка, кунжут.' },
          { name: 'с лососем', price: 550, weight: '320 г', description: 'Состав: рис, лосось, кукуруза, битые огурцы, стручковая фасоль, черри, авокадо, азиатская заправка, кунжут.' }
        ]
      },
      {
        title: 'Теплый салат с куриным филе',
        price: 550,
        weight: '320 г',
        description: 'Состав: айсберг, черри, картофельные дольки, шампиньоны, куриное филе, соус Данк, лук фри.'
      }
    ]
  },
  {
    id: 'rolly',
    title: 'Роллы',
    items: [
      {
        title: 'Жареные шары',
        description: 'Горячие суши-шары.',
        variations: [
          { name: 'с тунцом (2 шт)', price: 320, description: 'Состав: рис, тунец, творожный сыр, спайси.' },
          { name: 'с креветкой (2 шт)', price: 340, description: 'Состав: рис, креветка, авокадо, соус Данк, зеленый лук.' },
          { name: 'с лососем (2 шт)', price: 350, description: 'Состав: рис, лосось, творожный сыр, терияки, кунжут, зеленый лук.' },
          { name: 'Ассорти (6 шт)', price: 800, description: 'Состав: по 2 шт. жареных шаров с тунцом, креветкой и лососем.' }
        ]
      },
      {
        title: 'Малые роллы (Маки)',
        description: 'Классические тонкие роллы маки, 8 шт.',
        variations: [
          { name: 'с огурцом', price: 240, weight: '150 г', description: 'Состав: рис, нори, огурцы.' },
          { name: 'с тунцом', price: 280, weight: '160 г', description: 'Состав: рис, нори, тунец.' },
          { name: 'с лососем', price: 300, weight: '160 г', description: 'Состав: рис, нори, лосось.' },
          { name: 'с креветкой', price: 300, weight: '160 г', description: 'Состав: рис, нори, креветка.' },
          { name: 'с угрём', price: 340, weight: '170 г', description: 'Состав: рис, нори, угорь.' }
        ]
      },
      {
        title: 'Филадельфия',
        description: 'Популярные сливочные роллы.',
        variations: [
          { name: 'Классическая', price: 510, description: 'Состав: рис, нори, творожный сыр, лосось, авокадо.' },
          { name: 'Унаги (с угрём)', price: 550, description: 'Состав: рис, нори, творожный сыр, лосось, угорь, соус унаги.' }
        ]
      },
      {
        title: 'Калифорния',
        price: 510,
        weight: '4 шт',
        description: 'Состав: рис, нори, кунжут, лосось, креветка, авокадо, сливочный сыр.'
      },
      {
        title: 'Ролл запеченный',
        isHighlighted: true,
        price: 570,
        weight: '4 шт',
        description: 'Состав: рис, нори, снежный краб, лосось, креветка, сливочный сыр, сырная шапка.'
      },
      {
        title: 'Жареные роллы (Темпура)',
        description: 'Хрустящие горячие запечённые роллы в кляре.',
        variations: [
          { name: 'с тунцом', price: 510, description: 'Состав: рис, нори, кляр, тунец, сливочный сыр, огурец, зеленый лук, соус спайси.' },
          { name: 'с креветкой', price: 540, description: 'Состав: рис, нори, кляр, креветка, сливочный сыр, огурец, зеленый лук, соус унаги.' },
          { name: 'с лососем', price: 560, description: 'Состав: рис, нори, кляр, лосось, сливочный сыр, авокадо, соус терияки, зеленый лук, соус спайси.' }
        ]
      }
    ]
  },
  {
    id: 'goryachee',
    title: 'Горячее WOK',
    items: [
      {
        title: 'Пад тай',
        description: 'Состав: болгарский перец, красный лук, цукини, морковь, соус пад тай, арахис, кунжут, кинза.',
        variations: [
          { name: 'с овощами', price: 390, weight: '360 г', description: 'Состав: болгарский перец, красный лук, цукини, морковь, соус пад тай, арахис, кунжут, кинза.' },
          { name: 'с куриным филе', price: 470, weight: '390 г', description: 'Состав: курица, болгарский перец, красный лук, цукини, морковь, соус пад тай, арахис, кунжут, кинза.' },
          { name: 'с морепродуктами', price: 570, weight: '380 г', description: 'Состав: креветка, кальмар, мидии, болгарский перец, красный лук, цукини, морковь, соус пад тай, арахис, кунжут, кинза.' }
        ]
      },
      {
        title: 'Жареный рис WOK',
        description: 'Ароматный обжаренный рис WOK.',
        variations: [
          { name: 'с овощами', price: 390, weight: '280 г', description: 'Состав: рис, яйцо, болгарский перец, белый лук, морковь, соус вок, кунжут, зеленый лук.' },
          { name: 'с куриным филе', price: 470, weight: '350 г', description: 'Состав: рис, курица, яйцо, болгарский перец, белый лук, морковь, соус вок, кунжут, зеленый лук.' },
          { name: 'с морепродуктами', price: 570, weight: '340 г', description: 'Состав: рис, креветка, кальмар, мидии, яйцо, болгарский перец, белый лук, морковь, соус вок, кунжут, зеленый лук.' }
        ]
      }
    ]
  },
  {
    id: 'sousy',
    title: 'Соусы',
    items: [
      { title: 'Цезарь', price: 80, weight: '30 г', description: 'Порция соуса.' },
      { title: 'Сырный', price: 80, weight: '30 г', description: 'Порция соуса.' },
      { title: 'Чесночный', price: 80, weight: '30 г', description: 'Порция соуса.' },
      { title: 'Данк', price: 80, weight: '30 г', description: 'Порция фирменного соуса.', isHighlighted: true },
      { title: 'Кетчуп', price: 80, weight: '30 г', description: 'Порция соуса.' },
      { title: 'Сальса', price: 80, weight: '30 г', description: 'Порция соуса.' },
      { title: 'Соус BBQ', price: 80, weight: '30 г', description: 'Порция соуса.' }
    ]
  },
  {
    id: 'deserty',
    title: 'Десерты',
    items: [
      {
        title: 'Чизкейк',
        price: 250,
        weight: '100 г',
        description: 'Классический запечённый чизкейк.'
      },
      {
        title: 'Кокосовая панна-котта с персиками кимчи',
        price: 280,
        weight: '180 г',
        description: 'Нежная сливочно-кокосовая панна-котта с пикантными персиками кимчи.'
      }
    ]
  }
];

export const BAR_MENU: MenuSectionData[] = [
  {
    id: 'kofe',
    title: 'Кофе',
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
      { title: 'Ассам', variations: [{ weight: '500 мл', price: 320 }] },
      { title: 'Сенча', variations: [{ weight: '500 мл', price: 320 }] },
      { title: 'Травяной сбор', variations: [{ weight: '500 мл', price: 320 }] },
    ],
  },
  {
    id: 'firm-chay',
    title: 'Фирменный чай',
    items: [
      { title: 'Облепиха, Груша, Розмарин', variations: [{ weight: '800 мл', price: 480 }] },
      { title: 'Имбирь, Лимон, Мёд, Мята', variations: [{ weight: '800 мл', price: 480 }] },
      { title: 'Малина, Лемонграсс, Тимьян', variations: [{ weight: '800 мл', price: 480 }] },
    ],
  },
  {
    id: 'kitay-chay',
    title: 'Китайский чай',
    note: 'Китайский чай с проведением чайной церемонии.',
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
    items: [
      { 
        title: 'Aperol Spritz', 
        price: 600,
        weight: '285 мл',
        alcoholStrength: 'light',
        description: 'Состав: Апероль, игристое, содовая.'
      },
      { 
        title: 'Negroni', 
        price: 540,
        weight: '105 мл',
        alcoholStrength: 'medium',
        description: 'Состав: Джин, биттер, вермут.'
      },
      { 
        title: 'Gin Peach', 
        price: 480, 
        weight: '105 мл',
        alcoholStrength: 'medium',
        description: 'Состав: Джин, персик, лаванда.'
      },
      { 
        title: 'Gin Basil Smash', 
        price: 480,
        weight: '120 мл',
        alcoholStrength: 'medium',
        description: 'Состав: Джин, базилик, лимон.'
      },
      { 
        title: 'Gin Fizz', 
        price: 480, 
        alcoholStrength: 'medium',
        description: 'Состав: Джин, лимон, содовая.'
      },
      { 
        title: 'Ecstazy', 
        price: 480, 
        weight: '150 мл',
        alcoholStrength: 'light',
        description: 'Состав: Водка, малина, кокос, ананас.'
      },
      { 
        title: 'Cosmopolitan', 
        price: 480, 
        weight: '115 мл',
        alcoholStrength: 'medium',
        description: 'Состав: Цитрусовая водка, апельсиновый ликёр, клюква, лайм.'
      },
      { 
        title: 'Pavlova', 
        price: 540, 
        weight: '115 мл',
        alcoholStrength: 'medium',
        description: 'Состав: Джин, кордиал «Павлова».'
      },
      { 
        title: 'Sicily', 
        price: 540, 
        weight: '205 мл',
        alcoholStrength: 'light',
        description: 'Состав: Джин, лимон, ревень, малина, земляника, фейхоа, яблоко.'
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
       { title: 'Два бобра', weight: '450 мл', price: 420, description: 'Светлое фильтрованное; 4,8%.' },
       { title: 'Белый кролик', weight: '450 мл', price: 420, description: 'Светлое нефильтрованное; 4,8%.' },
       { title: 'Blanche de croix', weight: '450 мл', price: 390, description: 'Светлое нефильтрованное.' },
       { title: 'Флюгер', weight: '330 мл', price: 290, description: 'Светлое фильтрованное.' },
       { title: 'Люгер', weight: '450 мл', price: 390, description: 'Светлое нефильтрованное.' },
       { title: 'Arne', weight: '450 мл', price: 360, description: 'Светлое фильтрованное.' },
       { title: 'Сорбет малина', weight: '450 мл', description: 'Фруктовое; 4,5%.', price: 440 },
       { title: 'Sabotage', weight: '500 мл', price: 550 },
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
