//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {gql} from "@apollo/client";
import TrackListItem from "../../components/ui/track-list-item";
import {tracks} from "../../../assets/data/tracks";

const query = gql`
    query getFavorites($userId: String!) {
        favoritesByUserid(userid: $userId) {
            id
            trackid
            userid
            track {
                id
                name
                preview_url
                artists {
                    id
                    name
                }
                album {
                    id
                    name
                    images {
                        url
                        width
                        height
                    }
                }
            }
        }
    }
`;

const Favorites = () => {
  return (
    <View className="mx-5 mt-5">
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 75 }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Favorites;
