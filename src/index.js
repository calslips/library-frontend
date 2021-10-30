import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  gql
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
      author {
        name
        id
        born
        bookCount
      }
      id
      genres
    }
    me {
      username
      favoriteGenre
      id
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