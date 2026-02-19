// features/restaurant/mock/restaurantMock.ts
import { Meal, Order } from '../types';

export const MOCK_RESTAURANT_NAME = 'Industrial Bistro';

export const MOCK_MEALS: Meal[] = [
  {
    id: 'meal-1',
    name: 'Burger Factory',
    description: 'Burger boeuf, cheddar, oignons caramélisés, sauce maison.',
    price: 12.5,
    image: 'https://imgs.search.brave.com/WgUcLKu4r_uBgcrvg-A2hCG-h-PnLMtCsUu2uqIbHQU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjMv/MDA5Lzk4Mi9zbWFs/bC9iZWVmLWJ1cmdl/cnMtb24td29vZGVu/LXBsYXRlLWFpLWdl/bmVyYXRlZC1waG90/by5qcGc',
  },
  {
    id: 'meal-2',
    name: 'Salade Opérateur',
    description: 'Salade verte, poulet grillé, tomates cerise, vinaigrette.',
    price: 9.9,
    image: 'https://imgs.search.brave.com/gxfRUYklcMvHwBODPX2iXaM19FDbcvdC8ozfrG0wqo0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cGhvdG9zLWdyYXR1/aXRlL3Z1ZS1kZXNz/dXMtZGVsaWNpZXVz/ZS1zYWxhZGUtZmFp/dGUtbWFpc29uLW5v/bWJyZXV4LWluZ3Jl/ZGllbnRzLWRhbnMt/YXNzaWV0dGUtZm9u/ZC1jb3VsZXVycy1t/ZWxhbmdlLXZlcnQt/bm9pcl8xNzk2NjYt/MjAwMDUuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw',
  },
  {
    id: 'meal-3',
    name: 'Pâtes Chef d’équipe',
    description: 'Pâtes fraîches, sauce tomate, basilic, parmesan.',
    price: 11.2,
    image: 'https://imgs.search.brave.com/xyyiFqF4KaM4UzXugDeI_lKKbBOltBxHY18F2afb3PQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9iMjI5/MjExOS5zbXVzaGNk/bi5jb20vMjI5MjEx/OS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wMS9ib2ItbGUt/Y2hlZi1zcGFnaGV0/dGlzLXBvaXMtdmVy/dHMtbWVudGhlLWZl/dGEtODAweDQ0NS5q/cGc_bG9zc3k9MCZz/dHJpcD0xJndlYnA9/MQ',
  },
  {
    id: 'meal-4',
    name: 'tacos',
    description: 'tacos, poulet, basilic, parmesan.',
    price: 11.2,
    image: 'https://imgs.search.brave.com/UOuaDpxzV-vq8gVTgSWwbkswKtjM1f-AE5gofxCVqh0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9iaXJy/aWEtdGFjb3MtMTY0/ODg0MjEyNy5qcGc_/Y3JvcD0wLjY2OHh3/OjEuMDB4aDswLjEy/MXh3LDA'
},
{
    id: 'meal-5',
    name: 'Pizza',
    description: 'Pizza, poulet, basilic, parmesan.',
    price: 11.2,
    image: 'https://imgs.search.brave.com/1n9s8Xo7l3mLh0a5j6kKZtHqj8e7u9n1sVh2vXr3iI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cGhvdG9zLWdyYXR1/aXRlL3Z1ZS1kZXNz/dXMtZGVsaWNpZXVz/ZS1waXp6YS1mYWk/0tmaWxlLXBsYWNl/bWVudC1ub2ltLXBy/b2R1aXQtODAweDQ0/NS5qc'
},
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    createdAt: new Date().toISOString(),
    status: 'PREPARING',
    items: [
      { mealId: 'meal-1', quantity: 2 },
      { mealId: 'meal-2', quantity: 1 },
    ],
    total: 12.5 * 2 + 9.9,
  },
  {
    id: 'order-2',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // hier
    status: 'DELIVERED',
    items: [{ mealId: 'meal-3', quantity: 1 }],
    total: 11.2,
  },
];