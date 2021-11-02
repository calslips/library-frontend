import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { USER, ALL_BOOKS } from '../queries'

const Recommend = ({ show, token }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [getUser, userResult] = useLazyQuery(USER, {
    fetchPolicy: 'network-only'
  })
  const [getFavoriteBooks, favoriteBooksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (token) {
      getUser()
    }
  }, [token, getUser])

  useEffect(() => {
    if (token && userResult.data) {
      setFavoriteGenre(userResult.data.me.favoriteGenre)
      getFavoriteBooks({ variables: { genre: favoriteGenre }})
      favoriteBooksResult.data && setFavoriteBooks(favoriteBooksResult.data.allBooks)
    }
  }, [token, userResult.data, favoriteGenre, getFavoriteBooks, favoriteBooksResult.data])

  if (!show) {
    return null
  }
  if (userResult.loading || favoriteBooksResult.loading) {
    return <div>loading...</div>
  }

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
          {favoriteBooks
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