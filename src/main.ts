import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          film: {
            keyArgs: ['id'],
            read(existing, { args, toReference }) {
              return existing || toReference({ __typename: 'Film', id: args.id });
            },
            merge(existing: unknown[], incoming: unknown[]) {
              return incoming || existing;
            }
          }
        }
      }
    }
  }),
  connectToDevTools: true
});

const app = createApp(App)
  .provide(DefaultApolloClient, apolloClient)

app.mount('#app');
