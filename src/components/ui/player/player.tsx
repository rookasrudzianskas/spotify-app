import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {usePlayerContext} from "../../../providers/player-provider";
import {useEffect, useState} from "react";
import {Sound} from "expo-av/build/Audio/Sound";
import {Audio, AVPlaybackStatus} from "expo-av";

const Player = () => {
  const { track } = usePlayerContext();
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  if(!track) return null;
  const image = track.album.images?.[0];
  //
  // useEffect(() => {
  //   playTrack();
  // }, [track]);

  const playTrack = async () => {
    if(sound) {
      await sound.unloadAsync();
    }

    if(!track.preview_url) return;

    const {sound: newSound} = await Audio.Sound.createAsync({
      uri: track.preview_url,
    });

    setSound(newSound);
    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    await newSound.playAsync();
  }

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if(!status.isLoaded) return;
    setIsPlaying(status.isPlaying);
  }

  const onPlayPause = async () => {
    if(!sound) return;

    if(isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  }

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
        <TouchableOpacity
          onPress={() => onPlayPause()}
          activeOpacity={0.7}
        >
          <Ionicons
            disabled={!track?.preview_url}
            name={isPlaying ? 'pause' : 'play'}
            size={22}
            color={track?.preview_url ? 'white' : 'gray'}
          />
        </TouchableOpacity>
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
