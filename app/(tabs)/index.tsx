import {View, FlatList} from 'react-native';
import {StatusBar} from "expo-status-bar";
import { tracks } from '../../assets/data/tracks';
import TrackListItem from "../../src/components/ui/track-list-item";


export default function TabOneScreen() {
  return (
    <View className="flex-1">
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}
