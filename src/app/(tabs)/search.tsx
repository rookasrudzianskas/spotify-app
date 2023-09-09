import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import { tracks } from '../../../assets/data/tracks';
import { Text, View } from '../../components/Themed';
import {useEffect, useState} from "react";
import TrackListItem from "../../components/ui/track-list-item";
import { AntDesign } from '@expo/vector-icons';
import {gql, useQuery} from "@apollo/client";

const query = gql`
    query MyQuery($q: String!) {
        search(q: $q) {
            tracks {
                items {
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
    }
`;

export default function Search() {
  const [search, setSearch] = useState('');

  const { data, loading, error, refetch } = useQuery(query, {
    variables: { q: search },
  });

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      refetch({ q: search });
    }, 500); // Adjust the delay time as needed

    return () => clearTimeout(debounceTimer);
  }, [search, refetch]);

  const tracks = data?.search?.tracks?.items || [];

  return (
    <SafeAreaView className="flex-1 m-5">
      <View className="flex flex-row items-center mb-4 mt-3">
        <AntDesign name="search1" size={20} color="gray" />
        <TextInput
          value={search}
          placeholder="What do you want to listen to?"
          onChangeText={setSearch}
          style={styles.input}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSearch('')}
        >
          <Text className="text-[15px]">Cancel</Text>
        </TouchableOpacity>
      </View>

      {loading && <View className="flex flex-1 items-center justify-center"><ActivityIndicator /></View>}
      {error && <View className="flex flex-1 items-center justify-center"><Text style={{ color: 'white' }}>Failed to fetch recommendations</Text></View>}

      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#121314',
    color: 'white',
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 5,
  },
});
