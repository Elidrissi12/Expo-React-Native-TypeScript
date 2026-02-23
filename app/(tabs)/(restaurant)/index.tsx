import { useRestaurant } from '@/app/features/restaurant/hooks/useRestaurant';
import { MOCK_RESTAURANT_NAME } from '@/app/features/restaurant/mock/restaurantMock';
import { MealCard } from '@/app/features/restaurant/components/MealCard';
import { Link } from 'expo-router';
import React, { useCallback } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function RestaurantDashboardScreen() {
  const { meals, addToCart } = useRestaurant();

  const highlights = meals.slice(0, 4);

  const keyExtractor = useCallback(
    (item: (typeof highlights)[number]) => item.id,
    [highlights],
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof highlights)[number] }) => (
      <MealCard meal={item} onAddToCart={() => addToCart(item.id)} />
    ),
    [addToCart],
  );

  return (
    <View style={styles.page}>
      {/* HEADER type maquette */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.headerTitleBlock}>
            <Text style={styles.headerTitle}>{MOCK_RESTAURANT_NAME}</Text>
            <Text style={styles.headerSubtitle}>abdo el idrissi</Text>
          </View>
          <View style={styles.menuIconBox}>
            <Link href="../menu" asChild>
              <Text style={styles.menuIcon}>☰</Text>
            </Link>
          </View>
        </View>

        {/* Search bar */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search for ice cream"
            placeholderTextColor="#fde0e0"
            style={styles.searchInput}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Promo card */}
        <View style={styles.promoCard}>
          <View style={styles.promoTextBlock}>
            <Text style={styles.promoTitle}>Free Delivery Order!</Text>
            <Text style={styles.promoSubtitle}>For minimum payment $37!</Text>
          </View>
          <Image
            source={require('@/assets/images/favicon.png')}
            style={styles.promoImage}
          />
        </View>
      </View>

      {/* CONTENT noir */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>This Week’s Highlights!</Text>
          <Link href="../menu" asChild>
            <Pressable>
              <Text style={styles.sectionSeeAll}>See All</Text>
            </Pressable>
          </Link>
        </View>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={highlights}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#f42653',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
  },
  headerTitleBlock: {
    flex: 1,
  },
  headerTitle: {
    color: '#fef2f2',
    fontWeight: '700',
    fontSize: 16,
  },
  headerSubtitle: {
    color: '#fee2e2',
    fontSize: 11,
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#be123c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    color: '#fee2e2',
    fontSize: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b91c1c',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: '#fff1f2',
    fontSize: 13,
  },
  searchIcon: {
    color: '#fee2e2',
    fontSize: 16,
  },
  promoCard: {
    flexDirection: 'row',
    backgroundColor: '#fb7185',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  promoTextBlock: {
    flex: 1,
  },
  promoTitle: {
    color: '#8a6262',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  promoSubtitle: {
    color: '#fee2e2',
    fontSize: 12,
  },
  promoImage: {
    width: 50,
    height: 50,
    borderRadius: 16,
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#5a7b9b',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionSeeAll: {
    color: '#d0a688',
    fontSize: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
});