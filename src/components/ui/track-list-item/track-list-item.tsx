//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Track} from "../../../../types";

type TrackListItemProps = {
  track: Track;
};

const TrackListItem = ({track}: TrackListItemProps) => {
  const image = track.album?.images?.[0];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => console.log('Playing track: ', track.id)}
      className="flex flex-row w-full"
    >
      <Text>Track</Text>
    </TouchableOpacity>
  );
};

export default TrackListItem;
