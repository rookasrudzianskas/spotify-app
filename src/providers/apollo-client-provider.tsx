import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

const client = new ApolloClient({
  uri: 'https://saltillo.stepzen.net/api/irreverent-goat/__graphql',
  headers: {
    Authorization:
      'apikey saltillo::stepzen.net+1000::c5e3ef401778df7e594c5ffa46283fea6ed840d5a4b5f489e81d8ced13cbe9bf',
  },
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
