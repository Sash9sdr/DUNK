
export interface MenuVariation {
  name?: string;
  weight?: string;
  price: number | string;
}

export interface MenuItem {
  title: string;
  description?: string;
  variations?: MenuVariation[];
  price?: number | string; // Fallback for simple items without variations
  weight?: string; // Fallback for simple items
  isSpicy?: boolean;
  isHighlighted?: boolean;
  image?: string; // URL to the image of the dish
}

export interface MenuSectionData {
  id: string;
  title: string;
  note?: string; // e.g. "Лапша на выбор..."
  items: MenuItem[];
  subHeader?: string; // For things like "Малые роллы (8 шт.)"
}

export type MenuType = 'kitchen' | 'bar';
