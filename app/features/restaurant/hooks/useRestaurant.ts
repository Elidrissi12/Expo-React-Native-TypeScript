// features/restaurant/hooks/useRestaurant.ts
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantProvider';

export function useRestaurant() {
  const ctx = useContext(RestaurantContext);
  if (!ctx) {
    throw new Error('useRestaurant must be used within RestaurantProvider');
  }
  return ctx;
}