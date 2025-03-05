export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: string;
  user: {
    email: string;
    name: string | null;
  };
  items: {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
}