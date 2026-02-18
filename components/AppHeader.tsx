// components/AppHeader.tsx
import { clearSession } from '@/services/authStorage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type AppHeaderProps = {
  title?: string;
  showBack?: boolean;
  showLogout?: boolean;
};

export function AppHeader({
  title = 'Industrial Tasks',
  showBack = true,
  showLogout = true,
}: AppHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    await clearSession();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable style={styles.left} onPress={handleBack}>
          <Text style={styles.icon}>{'‹'}</Text>
        </Pressable>
      ) : (
        <View style={styles.left} />
      )}

      <View style={styles.center}>
        <Image
          source={require('@/assets/images/favicon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>{title}</Text>
      </View>

      {showLogout ? (
        <Pressable style={styles.right} onPress={handleLogout}>
          <Text style={styles.logoutText}>Quitter</Text>
        </Pressable>
      ) : (
        <View style={styles.right} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#215229',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  left: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  right: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    color: '#fcfdff',
    fontSize: 24,
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  title: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutText: {
    color: '#f97316',
    fontSize: 13,
    fontWeight: '600',
  },
});