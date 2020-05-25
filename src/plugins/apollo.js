import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

Vue.use(VueApollo)

const authLink = setContext((opt, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_API,
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

export default new VueApollo({
  defaultClient: apolloClient,
})
