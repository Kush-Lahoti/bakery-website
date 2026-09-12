export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  flavours: string[];
  price: number;
  image: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Chocolate Bowl',
    category: 'Chocolate Bowls',
    description: 'A decadent bowl of rich chocolate ganache topped with chocolate chips.',
    flavours: ['Dark Chocolate', 'Milk Chocolate'],
    price: 299,
    image: '/image_56362b.png',
    featured: true
  },
  {
    id: '2',
    name: 'Loaded Waffle Chocolate Bowl',
    category: 'Chocolate Bowls',
    description: 'Indulgent chocolate bowl loaded with waffle rolls and colourful sprinkles.',
    flavours: ['Mixed Choco', 'Hazelnut'],
    price: 349,
    image: '/image_563669.png',
    featured: true
  },
  {
    id: '3',
    name: 'Layered Chocolate Jar Cake',
    category: 'Cake Jars',
    description: 'Perfectly portioned layered chocolate and cream cake in a beautiful jar.',
    flavours: ['Choco Vanilla', 'Double Chocolate'],
    price: 199,
    image: '/image_56394a.png',
    featured: true
  },
  {
    id: '4',
    name: 'Gourmet Cookie Tin',
    category: 'Cookie Tins',
    description: 'Assorted freshly baked giant chunk cookies packed in a premium tin.',
    flavours: ['Choco Chunk', 'Double Fudge'],
    price: 499,
    image: '/image_563970.png',
    featured: true
  },
  {
    id: '5',
    name: 'Wholesome Millet Cake',
    category: 'Millet Cakes',
    description: 'Guilt-free delicious millet cake made with natural, organic ingredients.',
    flavours: ['Banana Walnut', 'Almond Crunch'],
    price: 399,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=800',
    featured: false
  }
];
