//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Track} from "../../../../types";
import {usePlayerContext} from "../../../providers/player-provider";

type TrackListItemProps = {
  track: Track;
};

const TrackListItem = ({track}: TrackListItemProps) => {
  const { setTrack } = usePlayerContext();

  const image = track.album?.images?.[0];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setTrack(track)}
      className="flex flex-row w-full my-1"
    >
      {image && <Image source={{ uri: image.url }} className="w-12 h-12 rounded-md" />}
      <View className="flex items-start ml-5">
        <Text className="text-lg font-[500] text-white">{track.name.slice(0, 30)}</Text>
        <Text className="text-base text-gray-600 font-[500] -mt-1">{track.artists[0]?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TrackListItem;
