import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          href: null, 
  }} 
/>
      <Tabs.Screen
        name="homescreen"
        options={{ headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{ headerShown: false,
          title: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
              name="estoque"
              options={{ headerShown: false,
                title: 'Estoque',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'cart-sharp' : 'cart-outline'} color={color} size={24} />
                ),
              }}
            />
    </Tabs>
  );
}
