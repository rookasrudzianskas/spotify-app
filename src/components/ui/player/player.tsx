import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {usePlayerContext} from "../../../providers/player-provider";
import {useEffect, useState} from "react";
import {Sound} from "expo-av/build/Audio/Sound";
import {Audio, AVPlaybackStatus} from "expo-av";
import {gql, useMutation, useQuery} from "@apollo/client";

const insertFavoriteMutation = gql`
    mutation MyMutation($userId: String!, $trackId: String!) {
        insertFavorites(userid: $userId, trackid: $trackId) {
            id
            trackid
            userid
        }
    }
`;

const removeFavoriteMutation = gql`
    mutation MyMutation($trackId: String!, $userId: String!) {
        deleteFavorites(trackid: $trackId, userid: $userId) {
            id
        }
    }
`;

const isFavoriteQuery = gql`
    query MyQuery($trackId: String!, $userId: String!) {
        favoritesByTrackidAndUserid(trackid: $trackId, userid: $userId) {
            id
            trackid
            userid
        }
    }
`;

const Player = () => {
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const { track } = usePlayerContext();

  const [insertFavorite] = useMutation(insertFavoriteMutation);
  const [removeFavorite] = useMutation(removeFavoriteMutation);

  const { data, refetch } = useQuery(isFavoriteQuery, {
    variables: { userId: 'vadim', trackId: track?.id || '' },
  });

  const isLiked = data?.favoritesByTrackidAndUserid?.length > 0;

  useEffect(() => {
    playTrack();
  }, [track]);

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const playTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    if (!track?.preview_url) {
      return;
    }
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.preview_url,
    });

    setSound(newSound);
    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await newSound.playAsync();
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }

    setIsPlaying(status.isPlaying);
  };

  const onPlayPause = async () => {
    if (!sound) {
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const onLike = async () => {
    if (!track) return;
    if (isLiked) {
      await removeFavorite({
        variables: { userId: 'rokas', trackId: track.id },
      });
    } else {
      await insertFavorite({
        variables: { userId: 'rokas', trackId: track.id },
      });
    }
    refetch();
  };

  if (!track) {
    return null;
  }

  const image = track.album.images?.[0];

  return (
    <View className="absolute w-full top-[-75px] p-2 h-[75px]">
      <View className="bg-[#286660] flex flex-1 flex-row items-center rounded-md p-1 pr-3">
        {image && <Image source={{ uri: image.url }} style={styles.image} />}

        <View style={{ flex: 1 }}>
          <Text className="text-white">{track.name}</Text>
          <Text className="text-gray-400 text-[12px]">{track.artists[0]?.name}</Text>
        </View>

        <TouchableOpacity
          onPress={() => onLike()}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={'white'}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>

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
