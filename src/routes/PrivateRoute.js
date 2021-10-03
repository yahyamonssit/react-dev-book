import React from 'react'
import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

// this is the private route that protects
// our app from getting accessed by user not logged in
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to='/log-in' />
        )
      }}
    ></Route>
  )
}

export default PrivateRoute
