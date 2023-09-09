//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {gql, useQuery} from "@apollo/client";
import TrackListItem from "../../components/ui/track-list-item";

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
  const { data, loading, error } = useQuery(query, {
    variables: { userId: 'rokas' },
  });

  if (loading) {
    return <View className="flex flex-1 items-center justify-center"><ActivityIndicator /></View>;
  }

  if (error) {
    return (<Text style={{ color: 'white' }}>Failed to fetch recommendations</Text>);
  }

  const tracks = data?.recommendations?.tracks || [];

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
