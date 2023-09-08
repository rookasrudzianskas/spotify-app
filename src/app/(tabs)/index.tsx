import {View, FlatList} from 'react-native';
import {StatusBar} from "expo-status-bar";
import { tracks } from '../../../assets/data/tracks';
import TrackListItem from "../../components/ui/track-list-item";


export default function TabOneScreen() {
  return (
    <View className="flex-1 m-5">
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 75 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
