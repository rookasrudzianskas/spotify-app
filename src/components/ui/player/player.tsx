//@ts-nocheck
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { tracks } from '../../../../assets/data/tracks';

const track = tracks[0];

const Player = () => {
  if(!track) return null;
  const image = track.album.images?.[0];

  return (
    <View className="absolute w-full top-[-75px] p-2 h-[75px]">
      <View className="bg-[#286660] flex flex-1 flex-row items-center rounded-md p-1 pr-3">
        {image && <Image source={{ uri: image.url }} style={styles.image} />}

        <View style={{ flex: 1 }}>
          <Text className="text-white">{track.name}</Text>
          <Text className="text-gray-400 text-[12px]">{track.artists[0]?.name}</Text>
        </View>

        <Ionicons
          name={'heart-outline'}
          size={20}
          color={'white'}
          style={{ marginHorizontal: 10 }}
        />
        <Ionicons
          disabled={!track?.preview_url}
          name={'play'}
          size={22}
          color={track?.preview_url ? 'white' : 'gray'}
        />
      </View>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});
