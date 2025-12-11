import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="swipe" />
      <Tabs.Screen name="wishlist" />
    </Tabs>
  );
}
