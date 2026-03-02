export interface ScenicSpot {
  id: string;
  name: string;
  description: string;
  image: string;
  category: '3000' | 'goulan' | 'other';
  details?: string;
}

export interface Route {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'seasonal' | 'agri' | 'culture' | 'life';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  type: 'experience' | 'food';
  schedule?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  images: string[];
  priceRange: string;
  rating: number;
  menu: { name: string; price: number }[];
  stock: number;
}
