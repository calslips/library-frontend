import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

const query = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`

client.query({ query })
  .then((result) => console.log(result.data))

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)