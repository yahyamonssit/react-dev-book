import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../context/chatContext'
import { PortfolioContext } from '../context/context'
import { RiRadioButtonLine } from 'react-icons/ri'
import { AuthContext } from '../context/authContext'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// as i sed in the chat context this bit difficult logic to comprehend
const ChatRoom = () => {
  const { currentUser } = useContext(AuthContext)
  const { users } = useContext(PortfolioContext)
  const { messages, startConversation, selectedUser, setSelectedUser, notifications } =
    useContext(ChatContext)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    if (message.trim() === '') {
      setError('enter a message')
    } else if (!selectedUser.uid) {
      setError('select a user to chat with')
    } else {
      startConversation(message)
      setMessage('')
      setError('')
    }

    setTimeout(() => {
      setError('')
    }, 2500)
  }

  // set notifications

  // scroll down when a message is added to the chat
  const down = useRef()
  useEffect(() => {
    down.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <Navbar />
      <section className='container mx-height '>
        <div className='row'>
          <div className=' col-5 col-lg-5 col-md-12 my-5'>
            <article className='card '>
              <div className='card-body'>
                <h5 className='card-title mb-0'>Users</h5>

                <ul className='media-list list-unstyled mb-0'>
                  {users
                    // => this filter is if you want to message your self (if you are crazy enough)
                    // ?.filter((_user) => _user?.room?.includes(currentUser.email))
                    ?.map((_user) => {
                      const { uid, docId, online, photoURL, username } = _user
                      return (
                        <li key={uid} className='mt-4'>
                          <div className='d-flex  align-items-center'>
                            <Link to={`/p/${username}`} className='pe-3'>
                              <img
                                className='img-fluid avatar avatar-md-sm rounded-circle shadow'
                                src={photoURL}
                                alt={username}
                              />
                            </Link>
                            <div className='flex-1 commentor-detail'>
                              <h6 className='mb-0'>
                                <Link to={`/p/${username}`} className='text-dark media-heading'>
                                  {docId}
                                </Link>
                              </h6>
                              <small className='text-muted'>
                                <button
                                  className={
                                    selectedUser?.uid === uid
                                      ? 'btn btn-sm btn-primary'
                                      : 'btn btn-sm btn-outline-primary'
                                  }
                                  onClick={() =>
                                    setSelectedUser({
                                      ..._user,
                                      email: _user.docId,
                                    })
                                  }
                                >
                                  {username}
                                </button>
                              </small>
                            </div>
                            <span
                              className={
                                online === 'ONLINE'
                                  ? 'text-success'
                                  : online === 'OFFLINE'
                                  ? 'text-danger'
                                  : 'text-warning'
                              }
                            >
                              <RiRadioButtonLine />
                            </span>
                            {notifications &&
                              notifications.from &&
                              notifications.from.email.includes(docId) && (
                                <span className={'text-danger'}>
                                  <RiRadioButtonLine />
                                </span>
                              )}
                          </div>
                        </li>
                      )
                    })}
                </ul>
              </div>
            </article>
          </div>

          <article className='col-6 col-lg-6 col-md-12 my-5'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='display-5'>Chat</h5>
                {error && <div className='alert alert-warning'>{error}</div>}
                <div
                  className='list-group mb-3'
                  style={{
                    maxHeight: '300px',
                    minHeight: '300px',
                    overflowY: 'scroll',
                    scrollBehavior: 'smooth',
                  }}
                >
                  {!selectedUser.uid && (
                    <div className='text-center'>
                      <h3 className='fw-light'>No Selected User</h3>
                    </div>
                  )}
                  {messages.map(({ message, uid, email, createdAt }, idx) => {
                    const author = users?.find((_user) => _user.docId === email)
                    return (
                      <section key={idx} className='list-group-item d-flex justify-content-between'>
                        <article className='d-flex align-items-center'>
                          <div className='d-flex align-items-start flex-column justify-content-center'>
                            <img
                              className='rounded-lg'
                              width='40'
                              src={author?.photoURL}
                              alt={author?.username}
                            />

                            <small
                              className={
                                currentUser.uid === uid
                                  ? 'badge bg-primary my-2'
                                  : 'badge bg-warning my-2'
                              }
                            >
                              {author?.username}
                            </small>
                          </div>
                          <p className='m-3 bg-light'>{message}</p>
                        </article>
                        <small className='fw-bold' style={{ fontSize: '10px' }}>
                          {moment(createdAt?.toDate(), 'MMDDYY').fromNow()}
                        </small>
                      </section>
                    )
                  })}

                  {/* this is to auto scroll down */}
                  <span ref={down}></span>
                </div>

                <form onSubmit={(e) => submitHandler(e)}>
                  <textarea
                    autoFocus
                    className='form-control'
                    placeholder='Enter your message here !'
                    type='text'
                    value={message}
                    onChange={({ target }) => setMessage(target.value)}
                  />
                  <div className='d-flex my-2 flex-row-reverse'>
                    <button className='btn btn-soft-success '>Send</button>
                  </div>
                </form>
              </div>
            </div>
          </article>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ChatRoom
