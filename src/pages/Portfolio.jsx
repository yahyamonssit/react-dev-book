import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PortfolioContext } from '../context/context'
import Hero from '../components/portfolio/Hero'
import PageLoading from '../components/PageLoading'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Portfolio = () => {
  const { username } = useParams()
  const { isUserExists } = useContext(PortfolioContext)
  const [exists, setExists] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let _exists = false
    isUserExists(username)
      .then((_result) => {
        const data = _result.docs.map((_doc) => {
          return {
            docId: _doc.id,
            ..._doc.data(),
          }
        })
        setUserInfo(data[0])
        _exists = data.length > 0 ? true : false
      })
      .finally(() => {
        setLoading(false)
        setExists(_exists)
      })
  }, [isUserExists, username])

  // show this if loading is finished and he doesn't exist
  if (!loading && !exists) {
    return (
      <div className='text-center'>
        <h1 className='display-1'>User not found</h1>
      </div>
    )
  }

  // show this if still loading
  if (loading) {
    return <PageLoading />
  }

  // show this if user was found
  if (exists) {
    return (
      <>
        <Navbar />

        <Hero userInfo={userInfo} />

        <Footer />
      </>
    )
  }
}

export default Portfolio
