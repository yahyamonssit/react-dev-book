import React, { useState, useEffect, createContext } from 'react'
import { auth, db, timestamp } from '../firebase'
import PageLoading from '../components/PageLoading'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  // this is the auth scaffolding check
  // discord to find the youtube video
  // that explain this part step by step (good luck 😊)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    const docRef = db.collection('users').doc(currentUser.email)
    return docRef
      .update({
        online: 'OFFLINE',
        lastLoggedIn: timestamp(),
      })
      .finally(() => {
        return auth.signOut()
      })
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  const updateEmail = (email) => {
    return currentUser.updateEmail(email)
  }
  const updatePassword = (password) => {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    if (!currentUser) return

    // change user's status to online when he log-in
    const docRef = db.collection('users').doc(currentUser.email)
    docRef.update({
      online: 'ONLINE',
      // lastLoggedIn: timestamp(),
    })
  }, [currentUser])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  const values = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }
  return (
    <AuthContext.Provider
      value={values}
      children={!isLoading ? children : <PageLoading />}
    />
  )
}
export { AuthContext, AuthProvider }
