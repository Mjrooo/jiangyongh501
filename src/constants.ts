import { ScenicSpot, Route, Product, Restaurant } from './types';

export const SCENIC_SPOTS: ScenicSpot[] = [
  {
    id: 'nushu',
    name: '女书生态博物馆',
    description: '世界上唯一的女性文字——女书的发源地。',
    image: 'https://picsum.photos/seed/nushu/800/600',
    category: '3000',
    details: '女书生态博物馆位于江永县上华村，展示了神秘的女书文化、风俗人情和历史背景。'
  },
  {
    id: 'shanggangtang',
    name: '上甘棠',
    description: '千年古村落，步步皆风景。',
    image: 'https://picsum.photos/seed/shanggangtang/800/600',
    category: '3000',
    details: '上甘棠村是湖南省发现的年代最为久远的古村落之一，保存有大量的明清古建筑。'
  },
  {
    id: 'qianjiadong',
    name: '千家峒',
    description: '瑶族寻根圣地，世外桃源。',
    image: 'https://picsum.photos/seed/qianjiadong/800/600',
    category: '3000',
    details: '千家峒是瑶族历史上著名的聚居地，风景秀丽，文化底蕴深厚。'
  },
  {
    id: 'goulan',
    name: '勾蓝瑶寨',
    description: '洗泥节、瑶家女子拳，感受地道瑶家风情。',
    image: 'https://picsum.photos/seed/goulan/800/600',
    category: 'goulan',
    details: '勾蓝瑶寨以其独特的“洗泥节”和“四个鸡蛋定终身”的婚俗闻名。'
  },
  {
    id: 'yanzishan',
    name: '燕子山天仙草原',
    description: '高山草原，云雾缭绕。',
    image: 'https://picsum.photos/seed/grassland/800/600',
    category: 'other'
  }
];

export const ROUTES: Route[] = [
  {
    id: 'r1',
    title: '女性文化主题一日游',
    description: '“一园一寨”深度体验女性文字魅力。',
    image: 'https://picsum.photos/seed/route1/800/600',
    type: 'culture'
  },
  {
    id: 'r2',
    title: '永明慢生活自驾游',
    description: '三天两晚，感受江永的宁静与美好。',
    image: 'https://picsum.photos/seed/route2/800/600',
    type: 'life'
  },
  {
    id: 'r3',
    title: '特香农业四季之旅',
    description: '春华秋实，体验江永五香特产的生长。',
    image: 'https://picsum.photos/seed/route3/800/600',
    type: 'agri'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '女书书法体验',
    description: '亲手书写神秘的女书文字。',
    image: 'https://picsum.photos/seed/p1/800/600',
    price: 58,
    type: 'experience',
    schedule: '每日 10:00 - 16:00'
  },
  {
    id: 'p2',
    name: '江永香柚',
    description: '“五香”之首，果大皮薄，香甜可口。',
    image: 'https://picsum.photos/seed/pomelo/800/600',
    price: 25,
    type: 'food'
  }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'res1',
    name: '瑶家大院',
    description: '正宗瑶家风味，环境优雅。',
    images: ['https://picsum.photos/seed/res1/800/600', 'https://picsum.photos/seed/res1-2/800/600'],
    priceRange: '¥50-100/人',
    rating: 4.8,
    menu: [
      { name: '瑶家腊肉', price: 68 },
      { name: '五香猪脚', price: 88 }
    ],
    stock: 20
  },
  {
    id: 'res2',
    name: '永明小吃店',
    description: '地道江永小吃，价格实惠。',
    images: ['https://picsum.photos/seed/res2/800/600'],
    priceRange: '¥20-40/人',
    rating: 4.5,
    menu: [
      { name: '香芋扣肉', price: 45 },
      { name: '江永米粉', price: 12 }
    ],
    stock: 50
  }
];
