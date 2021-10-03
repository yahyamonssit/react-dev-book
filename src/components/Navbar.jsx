/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { PortfolioContext } from '../context/context'
import { BsBellFill } from 'react-icons/bs'
import { ChatContext } from '../context/chatContext'
// this is a very basic component
import logo from '../logo.svg'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const { user } = useContext(PortfolioContext)
  const { setNotifications, notifications, setSelectedUser, changeNotificationStatus } =
    useContext(ChatContext)
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  const triggerNotification = () => {
    if (notifications?.from) {
      Promise.allSettled([
        setSelectedUser({
          ...notifications.from,
        }),
        setNotifications({
          read: true,
          from: null,
        }),
        changeNotificationStatus(),
        (document.title = 'DevBook | Portfolio'),
      ]).then(() => {
        history.push('/chat-room')
      })
    }
  }

  useEffect(() => {
    if (!window.Notification) {
      console.log('Browser does not support notifications.')
    } else {
      // check if permission is already granted
      if (Notification.permission === 'granted') {
        // show notification here
        if (notifications && notifications.from && notifications.to.includes(currentUser.email)) {
          // doesn't work in mobile yet
          const options = {
            body: notifications.from.message,
            icon: notifications.from.photoURL,
          }
          const notification = new Notification(
            `New message from ${notifications.from.username}`,
            options
          )

          document.title = `${notifications.from.username} sent you a message`

          // const audio = new Audio('/assets/wewew.m4a')
          // audio.play()

          notification.onclick = () => triggerNotification
        }
      } else {
        // request permission from user
        Notification.requestPermission()
          .then(function (p) {
            if (p === 'denied') {
              // show notification here
              console.log('User blocked notifications.')
            }
          })
          .catch(function (err) {
            console.error(err)
          })
      }
    }
  }, [notifications])

  return (
    <>
      <header id='topnav' className='defaultscroll sticky bg-white'>
        <div className='container'>
          <Link to='/' className='logo'>
            <img alt='dev book' src={logo} className='logo-light-mode' />
          </Link>
          <div style={{ display: 'block', position: 'unset' }} id='navigation'>
            <ul className='navigation-menu'>
              <li>
                <Link to='/posts' className='sub-menu-item'>
                  Forum
                </Link>
              </li>

              {currentUser ? (
                <>
                  <li className='menu-item'>
                    <Link to='/chat-room'>chat room</Link>
                  </li>

                  <li className='menu-item'>
                    <Link to='/profile'>Settings</Link>
                  </li>

                  {user && user.username && (
                    <li className='menu-item'>
                      <Link to={`/p/${user.username}`}>{user.username}</Link>
                    </li>
                  )}

                  <li className='menu-item buy-button'>
                    <button
                      onClick={triggerNotification}
                      className='btn text-primary btn-notification'
                    >
                      <BsBellFill />
                      {notifications && notifications.from && (
                        <span className='notification'></span>
                      )}
                    </button>
                  </li>

                  <li className='menu-item buy-button'>
                    <button
                      onClick={() => {
                        setIsLoading(true)
                        logout().finally(() => {
                          setIsLoading(false)
                        })
                      }}
                      className='btn btn-sm btn-soft-primary'
                    >
                      {isLoading ? (
                        <div className='d-flex justify-content-center'>
                          <div className='spinner-border'></div>
                        </div>
                      ) : (
                        'LOGOUT'
                      )}
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className='menu-item'>
                    <Link to='/sign-up'>sign up</Link>
                  </li>
                  <li className='menu-item '>
                    <Link to='/log-in'>log in</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
