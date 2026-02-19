// app/(tabs)/(restaurant)/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { RestaurantProvider } from '@/app/features/restaurant/context/RestaurantProvider';

export default function RestaurantLayout() {
  return (
    <RestaurantProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="menu" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="orders" />
      </Stack>
    </RestaurantProvider>
  );
}