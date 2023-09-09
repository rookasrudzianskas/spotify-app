import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import {Pressable, useColorScheme, View} from 'react-native';

import Colors from '../../constants/Colors';
import {AntDesign} from "@expo/vector-icons";
import Player from "../../components/ui/player";
import {BottomTabBar} from "@react-navigation/bottom-tabs";

// BQBp8NHjaY1rljfFMr_hATqaCdsnG7PgyAWGJXqh8BZu1rXQF4y4uOjD0YhaVLrmgelhtdLDSs1-IwyeOzNhcHmgcLKcCtKhptiJ3jvfVabS7poC6Zw - access token

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
      tabBar={(props) => (
        <View>
          <Player />
          <BottomTabBar {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={23} color={color} />,
          // Do not show the word "Home" in the bottom tab bar.
          tabBarLabel: () => null,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),

        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={23} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => <AntDesign name="heart" size={23} color={color} />,
        }}
      />
    </Tabs>
  );
}
