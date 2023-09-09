import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import {StatusBar} from "expo-status-bar";
import TrackListItem from "../../components/ui/track-list-item";
import {gql, useQuery} from "@apollo/client";

const query = gql`
    query MyQuery($genres: String!) {
        recommendations(seed_genres: $genres) {
            tracks {
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

export default function TabOneScreen() {
  const { data, loading, error } = useQuery(query, {
    variables: { genres: 'drum-and-bass,house' },
  });

  if (loading) {
    return <View className="flex flex-1 items-center justify-center"><ActivityIndicator /></View>;
  }

  if (error) {
    return (<Text style={{ color: 'white' }}>Failed to fetch recommendations</Text>);
  }

  const tracks = data?.recommendations?.tracks || [];

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
