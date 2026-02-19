// components/AppHeader.tsx
import { Colors } from '@/constants/theme';
import { clearSession } from '@/services/authStorage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'react-native';

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
  const scheme = useColorScheme();
  const c = Colors[scheme ?? 'light'];

  const handleBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    await clearSession();
    router.replace('/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: c.primaryLight }]}>
      {showBack ? (
        <Pressable style={styles.left} onPress={handleBack}>
          <Text style={[styles.icon, { color: c.textOnPrimary }]}>{'‹'}</Text>
        </Pressable>
      ) : (
        <View style={styles.left} />
      )}

      <View style={styles.center}>
        <Image
          source={require('@/assets/images/favicon.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: c.textOnPrimary }]}>{title}</Text>
      </View>

      {showLogout ? (
        <Pressable style={styles.right} onPress={handleLogout}>
          <Text style={[styles.logoutText, { color: c.warning }]}>Quitter</Text>
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
    fontSize: 24,
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
  },
});