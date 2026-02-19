// features/restaurant/context/RestaurantProvider.tsx
import React, { createContext, useCallback, useMemo, useState } from 'react';
import { MOCK_MEALS, MOCK_ORDERS } from '../mock/restaurantMock';
import { buildOrderFromCart, calculateCartTotal, calculateTodayStats } from '../services/restaurantService';
import { CartItem, Meal, Order, RestaurantStats } from '../types';

type RestaurantContextValue = {
  meals: Meal[];
  cart: CartItem[];
  orders: Order[];
  stats: RestaurantStats;
  cartTotal: number;
  addToCart: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  removeFromCart: (mealId: string) => void;
  placeOrder: () => void;
};

export const RestaurantContext = createContext<RestaurantContextValue | undefined>(
  undefined,
);

export const RestaurantProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [meals] = useState<Meal[]>(MOCK_MEALS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const cartTotal = useMemo(
    () => calculateCartTotal(cart, meals),
    [cart, meals],
  );

  const stats = useMemo(
    () => calculateTodayStats(orders),
    [orders],
  );

  const addToCart = useCallback((mealId: string) => {
    setCart(prev => {
      const existing = prev.find(c => c.mealId === mealId);
      if (existing) {
        return prev.map(c =>
          c.mealId === mealId ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [...prev, { mealId, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((mealId: string, quantity: number) => {
    setCart(prev => {
      if (quantity <= 0) {
        return prev.filter(c => c.mealId !== mealId);
      }
      return prev.map(c =>
        c.mealId === mealId ? { ...c, quantity } : c,
      );
    });
  }, []);

  const removeFromCart = useCallback((mealId: string) => {
    setCart(prev => prev.filter(c => c.mealId !== mealId));
  }, []);

  const placeOrder = useCallback(() => {
    setCart(prevCart => {
      const order = buildOrderFromCart(prevCart, meals);
      if (!order) return prevCart;
      setOrders(prev => [order, ...prev]);
      return [];
    });
  }, [meals]);

  const value: RestaurantContextValue = {
    meals,
    cart,
    orders,
    stats,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    placeOrder,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};