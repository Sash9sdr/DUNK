import { MenuSectionData } from './types';

export const SPECIAL_FOOD_MENU: MenuSectionData[] = [
  {
    id: 'special-food',
    title: 'Special Food',
    items: [
      { title: 'Поке с курицей', price: 450, isHighlighted: true },
      { title: 'Поке с лососем', price: 550, isHighlighted: true },
      { title: 'Гамбургер', price: 650, isHighlighted: true },
      { title: 'Чизбургер', price: 700, isHighlighted: true },
      { title: 'Чикен бургер', price: 500, isHighlighted: true },
      { title: 'Фо Га', price: 450, description: 'Традиционный вьетнамский суп с куриным филе и рисовой лапшой.', isHighlighted: true },
      { title: 'Хот дог Данк', price: 550, isHighlighted: true },
      { title: 'Хот дог классический', price: 450, isHighlighted: true },
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
        description: 'Освежающий зимний фреш: джин, лимон и дыня в чистом, изысканном стиле.',
        price: 480,
        alcoholStrength: 'medium'
      },
      {
        title: 'Mandarin',
        isHighlighted: true,
        image: 'https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/%D0%9C%D0%B5%D0%BD%D1%8E/IMG_2433.PNG',
        description: 'Яркий мандариново-ванильный коктейль на текиле: сочный цитрус, лайм и мягкая сладость.',
        price: 480,
        alcoholStrength: 'medium'
      },
      {
        title: 'Milk Punch',
        isHighlighted: true,
        image: 'https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/%D0%9C%D0%B5%D0%BD%D1%8E/IMG_2423.PNG',
        description: 'Нежный молочный пунш с ромом: смородина и ананас + пряный чай.',
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
        description: 'Золотистые, хрустящие луковые кольца в воздушной панировке.'
      },
      {
        title: 'Картофельные дольки',
        weight: '200 г',
        price: 320,
        description: 'Запечённые картофельные дольки с пряными специями и лёгким ароматом зелени.'
      },
      {
        title: 'Палочки моцареллы',
        weight: '5 шт',
        price: 350,
        description: 'Тягучий сливочный сыр моцарелла в хрустящей сухарной панировке.'
      },
      {
        title: 'Картогель фри',
        weight: '200 г',
        price: 320,
        description: 'Классический, ароматный картогель фри с золотистой корочкой.'
      },
      {
        title: 'Гренки чесночные',
        weight: '100 г',
        price: 180,
        description: 'Хрустящие ржаные гренки с пикантным чесночным ароматом.'
      },
      {
        title: 'Нагетсы',
        weight: '7 шт',
        price: 380,
        description: 'Нежные куриные нагетсы в золотистой панировке.'
      },
      {
        title: 'Пивная тарелка',
        isHighlighted: true,
        price: '1 350',
        description: 'Идеальный сет под пиво: по 100 г картофельных долек, фри и гренок, 5 луковых колец, 3 палочки моцареллы и 5 нагетсов. Подаётся с соусами.'
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
        description: 'Легендарный тайский пряно-острый бульон с кокосовым молоком, черри, шампиньоны, кинзой и кунжутом. Подаётся с пиалой горячего риса.',
        variations: [
          { name: 'с куриным филе', price: 580, weight: '500 г' },
          { name: 'с морепродуктами', price: 680, weight: '520 г' }
        ]
      },
      {
        title: 'Фо Га',
        price: 450,
        weight: '550 г',
        description: 'Ароматный прозрачный куриный бульон, красный лук, куриное филе, пшеничная лапша удон, соус шрирача, освежающий лайм, зеленый лук и кинза.'
      }
    ]
  },
  {
    id: 'street-food',
    title: 'Стрит фуд',
    items: [
      {
        title: 'Бургеры',
        description: 'Сочные авторские бургеры на воздушной булочке бриошь со свежим айсбергом, томатом, маринованными огурчиками, майонезом и кетчупом.',
        variations: [
          { name: 'Чикен бургер', price: 500, description: 'С нежным куриным филе су-вид и фирменным соусом Данк.' },
          { name: 'Гамбургер', price: 650, description: 'С сочной говяжьей котлетой, томатами и огурцами.' },
          { name: 'Чизбургер', price: 700, description: 'С говяжьей котлетой, ломтиком чеддера, сырным соусом и соусом Данк.' }
        ]
      },
      {
        title: 'Кесадилья',
        description: 'Пшеничная тортилья, запечённая со щедрой порцией моцареллы и фирменными приправами.',
        variations: [
          { name: 'с овощами', price: 320, weight: '210 г' },
          { name: 'с курицей', price: 320, weight: '240 г' }
        ]
      },
      {
        title: 'Пицца',
        description: 'Тонкое хрустящее тесто, ароматные итальянские травы, моцарелла и оливковое масло.',
        variations: [
          { name: 'Маргарита', price: 450, description: 'Спелые томаты, соус сальса, моцарелла, щепотка прованских трав.' },
          { name: 'Пепперони', price: 520, description: 'Колбаски пепперони, нежный соус сальса, моцарелла, прованские травы.' },
          { name: 'Чикенчиз', price: 560, description: 'Куриное филе, чеддер, пармезан, моцарелла, соус Данк, сырный соус.' }
        ]
      },
      {
        title: 'Хот-дог',
        description: 'Аппетитная булочка бриошь, натуральная куриная колбаска, хрустящий лук фри.',
        variations: [
          { name: 'Классический', price: 450, description: 'Салат айсберг, майонез, кетчуп, свежий томат, куриная колбаска, лук фри.' },
          { name: 'Данк', price: 550, description: 'Фирменный соус Данк, айсберг, огуречный релиш, сочный говяжий фарш, сырный соус, чеддер.' }
        ]
      },
      {
        title: 'Чизи Фри с говядиной',
        price: 360,
        weight: '250 г',
        description: 'Хрустящий картофель фри под пикантным говяжьим фаршем, расплавленным чеддером, сырным соусом, сальсой и ароматной копченой паприкой.'
      }
    ]
  },
  {
    id: 'salaty',
    title: 'Салаты & Поке',
    items: [
      {
        title: 'Цезарь',
        description: 'Микс свежего салата айсберг, сочных черри, пшеничных сухариков, тёртого пармезана и классического соуса цезарь.',
        variations: [
          { name: 'с куриным филе', price: 410, weight: '250 г' },
          { name: 'с креветкой', price: 530, weight: '220 г' },
          { name: 'с куриным филе и креветкой', price: 610, weight: '280 г' }
        ]
      },
      {
        title: 'Поке',
        description: 'Полезный освежающий боул на основе рассыпчатого риса с кукурузой, битыми огурцами, стручковой фасолью, черри, спелым авокадо, кунжутом и лёгкой азиатской заправкой.',
        variations: [
          { name: 'с курицей', price: 450, weight: '330 г', description: 'Нежное куриное филе в авторском маринаде.' },
          { name: 'с тунцом', price: 500, weight: '320 г', description: 'Кусочки тунца в ореховой заправке.' },
          { name: 'с лососем', price: 550, weight: '320 г', description: 'Свежий слабосолёный лосось.' }
        ]
      },
      {
        title: 'Теплый салат с куриным филе',
        price: 550,
        weight: '320 г',
        description: 'Тёплый сытный салат из листьев айсберга, черри, румяных картофельных долек, обжаренных шампиньонов и куриного филе под соусом Данк с луком фри.'
      }
    ]
  },
  {
    id: 'rolly',
    title: 'Роллы',
    items: [
      {
        title: 'Жареные шары',
        description: 'Уникальные горячие суши-шары из нежного сыра и риса в хрустящем темпурном кляре.',
        variations: [
          { name: 'с тунцом (2 шт)', price: 320, description: 'Начинка из тунца, нежного сливочного сыра и соуса спайси.' },
          { name: 'с креветкой (2 шт)', price: 340, description: 'С тигровой креветкой, спелым авокадо, соусом Данк и зелёным луком.' },
          { name: 'с лососем (2 шт)', price: 350, description: 'С лососем, творожным сыром, соусом терияки, кунжутом и луком.' },
          { name: 'Ассорти (6 шт)', price: 800, description: 'Большой микс из 6 шаров: каждого вида по две штуки.' }
        ]
      },
      {
        title: 'Малые роллы (Маки)',
        description: 'Классические тонкие роллы из нори, риса и цельного топпинга внутри. Порция 8 штук.',
        variations: [
          { name: 'с огурцом', price: 240, weight: '150 г' },
          { name: 'с тунцом', price: 280, weight: '160 г' },
          { name: 'с лососем', price: 300, weight: '160 г' },
          { name: 'с креветкой', price: 300, weight: '160 г' },
          { name: 'с угрём', price: 340, weight: '170 г' }
        ]
      },
      {
        title: 'Филадельфия',
        description: 'Ролл на основе благородного сливочного сыра в сочетании со спелым авокадо и рыбой на Ваш выбор.',
        variations: [
          { name: 'Классическая', price: 510, description: 'Нежный творожный сыр, лосось, авокадо.' },
          { name: 'Унаги (с угрём)', price: 550, description: 'Творожный сыр, лосось, нежный угорь, соус унаги, кунжут.' }
        ]
      },
      {
        title: 'Калифорния',
        price: 510,
        weight: '4 шт',
        description: 'Рис, нори, золотистый обжаренный кунжут, нежный лосось, тигровая креветка, авокадо, сливочный сыр.'
      },
      {
        title: 'Ролл запеченный',
        isHighlighted: true,
        price: 570,
        weight: '4 шт',
        description: 'Рис, нори, сочный снежный краб, лосось, тигровая креветка, сливочный сыр, запекается до сырной корочки.'
      },
      {
        title: 'Жареные роллы (Темпура)',
        description: 'Хрустящие горячие темпура‑роллы со сливочным сыром и огурчиком, украшенные авторскими соусами и кунжутом.',
        variations: [
          { name: 'с тунцом', price: 510, description: 'Сочный тунец, сливочный сыр, огурчик, зелёный лук, соус спайси.' },
          { name: 'с креветкой', price: 540, description: 'Тигровая креветка, сливочный сыр, огурчик, соус унаги, зелёный лук.' },
          { name: 'с лососем', price: 560, description: 'Слабосолёный лосось, сливочный сыр, сливочный авокадо, соус терияки, зелёный лук, соус спайси.' }
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
        description: 'Легендарное тайское вок-блюдо: обжаренные овощи (болгарский перец, красный лук, цукини, морковь), яйцо в аутентичном соусе пад-тай, посыпанное обжаренным арахисом, кунжутом и кинзой. Лапша на выбор (рисовый Удон или гречневая Соба) выбирается прямо в карточке!',
        variations: [
          { name: 'с овощами', price: 390, weight: '360 г' },
          { name: 'с куриным филе', price: 470, weight: '390 г' },
          { name: 'с морепродуктами', price: 570, weight: '380 г' }
        ]
      },
      {
        title: 'Жареный рис WOK',
        description: 'Ароматный обжаренный рис с болгарским перцем, белым репчатым луком, сочной морковью в фирменном азиатском соусе вок с кунжутным маслом и зелёным луком.',
        variations: [
          { name: 'с овощами', price: 390, weight: '280 г' },
          { name: 'с куриным филе', price: 470, weight: '350 г' },
          { name: 'с морепродуктами', price: 570, weight: '340 г' }
        ]
      }
    ]
  },
  {
    id: 'sousy',
    title: 'Соусы',
    items: [
      { title: 'Цезарь', price: 80, weight: '30 г', description: 'Нежный сливочно‑пармезановый соус с тонкими нотками чеснока.' },
      { title: 'Сырный', price: 80, weight: '30 г', description: 'Мягкий, насыщенный сливочный соус на основе плавленых сыров.' },
      { title: 'Чесночный', price: 80, weight: '30 г', description: 'Пикантный майонезный соус со свежим чесноком и мелко рубленной зеленью.' },
      { title: 'Данк', price: 80, weight: '30 г', description: 'Фирменный соус бренда — сбалансированный остро‑сливочный вкус на основе тайского перца чили.', isHighlighted: true },
      { title: 'Кетчуп', price: 80, weight: '30 г', description: 'Натуральный томатный соус со специями.' },
      { title: 'Сальса', price: 80, weight: '30 г', description: 'Традиционный соус из спелых томатов, свежих трав, перца и лука.' },
      { title: 'Соус BBQ', price: 80, weight: '30 г', description: 'Густой томатный соус с ароматом копчения ольховой щепы.' }
    ]
  }
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
    note: 'Проведём для Вас чайную церемонию в которую входит: чабань, гайвань, чахай, чайный дух, пиалы, исинский чайник и расскажем о самом чае и о его эффектах.',
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
        description: 'Апероль, игристое, содовая'
      },
      { 
        title: 'Negroni', 
        price: 540,
        weight: '105 мл',
        alcoholStrength: 'medium',
        description: 'Джин, биттер, вермут'
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
       { title: 'Blanche de croix', weight: '450 мл', price: 390, description: 'Светлое нефильтрованное' },
       { title: 'Флюгер', weight: '330 мл', price: 290, description: 'Светлое фильтрованное' },
       { title: 'Люгер', weight: '450 мл', price: 390, description: 'Светлое нефильтрованное' },
       { title: 'Arne', weight: '450 мл', price: 360, description: 'Светлое фильтрованное' },
       { title: 'Сорбет малина', weight: '450 мл', description: 'Фруктовое; 4,5%', price: 440 },
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
