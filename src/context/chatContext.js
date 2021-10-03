import React, { useState, useEffect, createContext, useContext } from 'react'
import { db, timestamp } from '../firebase'
import { AuthContext } from './authContext'
import { PortfolioContext } from './context'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const { user } = useContext(PortfolioContext)
  const [messages, setMessages] = useState([])
  const [notifications, setNotifications] = useState(null)
  const [selectedUser, setSelectedUser] = useState({})
  // this is pretty complicated logic to make a comment on 🙄

  // function that starts a conversation with another user
  const startConversation = (message) => {
    if (!currentUser && !user) return
    if (!selectedUser) return

    // here i basicity make a link between the sender and receiver of the message
    // by creating a room
    const usersColRef = db.collection('users')
    const to = usersColRef.doc(selectedUser.email)
    const from = usersColRef.doc(currentUser.email)
    const chatRoomName = selectedUser.email + ' ' + currentUser.email

    const _message = {
      uid: currentUser.uid,
      email: currentUser.email,
      username: user.username,
      photoURL: user.photoURL,
      roomName: chatRoomName,
      message: message,
      createdAt: timestamp(),
    }

    from
      .update({
        room: chatRoomName,
      })
      .then(() => {
        to.update({
          room: chatRoomName,
        }).then(() => {
          db.collection('messages')
            .add(_message)
            .finally(() => {
              db.collection('notifications').doc(selectedUser.email).set({
                read: false,
                from: _message,
              })
            })
        })
      })
  }

  // change notification status in db
  const changeNotificationStatus = () => {
    db.collection('notifications').doc(currentUser.email).update({
      read: true,
      from: null,
    })
  }

  // listening to notification in db
  useEffect(() => {
    if (!currentUser) return

    const unsubscribe = db
      .collection('notifications')
      .doc(currentUser.email)
      .onSnapshot((_doc) => {
        if (_doc.exists) {
          const notify = { to: _doc.id, ..._doc.data() }
          setNotifications(notify)
        }
      })

    return unsubscribe
  }, [currentUser])

  useEffect(() => {
    if (!currentUser) return
    if (!selectedUser) return

    const unsubscribe = db
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        const _messages = snapshot.docs
          .filter((_doc) => {
            return (
              _doc.data().roomName.includes(currentUser.email) &&
              _doc.data().roomName.includes(selectedUser.email)
            )
          })
          .map((_doc) => {
            return {
              docId: _doc.id,
              ..._doc.data(),
            }
          })

        setMessages(_messages)
      })

    return unsubscribe
  }, [currentUser, selectedUser])

  const values = {
    startConversation,
    messages,
    setSelectedUser,
    selectedUser,
    setNotifications,
    notifications,
    changeNotificationStatus,
  }

  return <ChatContext.Provider value={values} children={children} />
}

export { ChatContext, ChatProvider }
