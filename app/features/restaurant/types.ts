export type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type CartItem = {
  mealId: string;
  quantity: number;
};

export type OrderStatus = 'PENDING' | 'PREPARING' | 'DELIVERED';

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string; // ISO
};

export type RestaurantStats = {
  todayOrders: number;
  todayRevenue: number;
};