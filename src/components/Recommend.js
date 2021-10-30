import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { USER, ALL_BOOKS } from '../queries'

const Recommend = ({ show, token }) => {
  const [getUser, userResult] = useLazyQuery(USER, {
    fetchPolicy: 'network-only'
  })
  const booksResult = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (token) {
      getUser()
    }
  }, [getUser, token])

  if (!show) {
    return null
  }
  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = userResult.data.me.favoriteGenre
  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th><strong>author</strong></th>
            <th><strong>published</strong></th>
          </tr>
          {books.filter(b => b.genres.includes(favoriteGenre))
            .map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommend