// features/restaurant/services/restaurantService.ts
import { CartItem, Meal, Order, RestaurantStats } from '../types';

export function calculateCartTotal(cart: CartItem[], meals: Meal[]): number {
  return cart.reduce((sum, item) => {
    const meal = meals.find(m => m.id === item.mealId);
    if (!meal) return sum;
    return sum + meal.price * item.quantity;
  }, 0);
}

export function buildOrderFromCart(
  cart: CartItem[],
  meals: Meal[],
): Order | null {
  if (cart.length === 0) return null;
  const total = calculateCartTotal(cart, meals);
  return {
    id: `order-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    status: 'PENDING',
    items: cart,
    total,
  };
}

export function calculateTodayStats(orders: Order[]): RestaurantStats {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todays = orders.filter(order => {
    const d = new Date(order.createdAt);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const todayOrders = todays.length;
  const todayRevenue = todays.reduce((sum, o) => sum + o.total, 0);

  return { todayOrders, todayRevenue };
}



