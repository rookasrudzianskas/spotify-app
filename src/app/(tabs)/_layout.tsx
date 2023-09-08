import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import {Pressable, useColorScheme, View} from 'react-native';

import Colors from '../../constants/Colors';
import {AntDesign} from "@expo/vector-icons";
import Player from "../../components/ui/player";
import {BottomTabBar} from "@react-navigation/bottom-tabs";

// BQB5p8XqmXSvjz2dUYoCVO1F2n3N7PDFLlmzlkfA52VQ9b9rw7VIyblZJGeokGylzBaWA8OyoKPe4izgYjn0YwWJ3ltwGVdN_QzOoMpdG9HAgTD2YtI - access token

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
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={23} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <AntDesign name="heart" size={23} color={color} />,
        }}
      />
    </Tabs>
  );
}
