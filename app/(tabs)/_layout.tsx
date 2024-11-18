import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WHeader from '@/components/WHeader'
export default function TabLayout() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" />
      <WHeader />
    </SafeAreaView>
  );
}
