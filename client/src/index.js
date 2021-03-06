import React from "react";
import ReactGA from "react-ga";
import ReactDOM from "react-dom";
import ContextProvider from "./context/Provider";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  // split,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { WebSocketLink } from "@apollo/link-ws";
import App from "./App";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("flogsToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : "",
    },
  };
});

let uri = "http://localhost:4000/graphql";
if (process.env.NODE_ENV === "production") {
  uri = "https://flogs.me/graphql";
}

const httpLink = new HttpLink({
  uri,
});

// Google analytics
if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-158975814-4");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

// TO DO, SUBSCRIPTIONS/CACHE MANIPULATION
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
//   options: {
//     reconnect: true
//   }
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   authLink.concat(httpLink)
// );

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: splitLink
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
