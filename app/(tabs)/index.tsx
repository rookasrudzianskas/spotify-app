import { Text, View, StyleSheet } from 'react-native';
import {StatusBar} from "expo-status-bar";

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
