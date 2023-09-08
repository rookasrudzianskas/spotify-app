import { Text, View, StyleSheet } from 'react-native';
import {StatusBar} from "expo-status-bar";

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      {/*<FlatList*/}
      {/*  data={tracks}*/}
      {/*  renderItem={({ item }) => <TrackListItem track={item} />}*/}
      {/*/>*/}
      <StatusBar style="auto" />
    </View>
  );
}
