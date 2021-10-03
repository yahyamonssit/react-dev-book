import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ForumContext } from '../../context/forumContext'
import PageLoading from '../../components/PageLoading'
import { AuthContext } from '../../context/authContext'
import moment from 'moment'
import { PortfolioContext } from '../../context/context'
import ReactMarkdown from 'react-markdown'
import { components } from '../../components/MarkdownPost'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const SinglePost = () => {
  const { currentUser } = useContext(AuthContext)
  const { postId } = useParams()
  const { isPostExists, addComment } = useContext(ForumContext)
  const [exists, setExists] = useState(false)
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const { users } = useContext(PortfolioContext)
  const author = users?.find((_user) => _user.docId === post.author)

  // adding comment
  const submitCommentHandler = (e) => {
    e.preventDefault()
    if (!currentUser) return

    // add comment to this post
    if (comment.trim() !== '') {
      addComment(post, comment)
      setComment('')
    }
  }

  useEffect(() => {
    let _exists = false
    isPostExists(postId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          _exists = true
          setPost({
            docId: doc.id,
            ...doc.data(),
          })
        } else {
          _exists = false
          console.log('No such document!')
        }
      })
      .finally(() => {
        setLoading(false)
        setExists(_exists)
      })
  }, [isPostExists, postId])

  // show this if loading is finished and he doesn't exist
  if (!loading && !exists) {
    return (
      <div className='text-center'>
        <h1 className='display-1'>Post not found</h1>
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
        <main className='container mx-height '>
          <div className='row mb-3'>
            <div className='col-12'>
              <h1 className='display-1'>Post</h1>
              <div className='card'>
                <div className='card-body'>
                  <h5>{author?.username}</h5>
                  {author?.photoURL && (
                    <img width='50' src={author?.photoURL} alt={author?.username} />
                  )}
                  <div className='card my-5 '>
                    <div className='card-body'>
                      <h3>{post.post.postTitle}</h3>
                      {post.post.postImage && (
                        <img width='200' src={post.post.postImage} alt={post.post.postTitle} />
                      )}
                      <ReactMarkdown components={components} children={post.post.postText} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <h4>Leave A Comment :</h4>

              {currentUser ? (
                <form onSubmit={(e) => submitCommentHandler(e)} className='mb-4'>
                  <label htmlFor='comment'>Your Comment</label>
                  <div className='row'>
                    <div className='col-6'>
                      <textarea
                        id='comment'
                        onChange={({ target }) => setComment(target.value)}
                        value={comment}
                        className='form-control mb-2'
                        placeholder='write your answer here !!'
                      />
                    </div>
                    <div className='col-6'>
                      <ReactMarkdown components={components} children={comment} />
                    </div>
                  </div>
                  <button className='btn btn-sm btn-info'>Submit</button>
                </form>
              ) : (
                <Link to='/log-in'>Log In</Link>
              )}
            </div>
          </div>
          <ul className='d-flex flex-column align-items-center media-list list-unstyled mb-0'>
            {post?.comments
              ?.sort((a, b) => b.createdAt - a.createdAt)
              .map(({ userEmail, comment, createdAt }, idx) => {
                const user = users?.find((_user) => _user.docId === userEmail)
                return (
                  <li style={{ width: 90 + '%' }} key={idx} className='mt-4 card'>
                    <div className='card-body d-flex justify-content-between'>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex flex-column align-items-start'>
                          <Link to={`/p/${user?.username}`} className='pe-3'>
                            <img
                              src={user?.photoURL}
                              className='img-fluid avatar avatar-md-sm rounded-circle shadow'
                              alt='img'
                            />
                          </Link>

                          <span
                            className={
                              post?.author === userEmail
                                ? 'badge bg-success my-2'
                                : 'badge bg-warning my-2'
                            }
                          >
                            {post?.author === userEmail ? 'Author' : 'User'}
                          </span>
                        </div>
                        <div className='flex-1 commentor-detail'>
                          <h6 className='mb-0'>
                            <Link to={`/p/${user?.username}`} className='text-dark media-heading'>
                              {user?.username}
                            </Link>
                          </h6>
                          {createdAt && moment(createdAt).fromNow()}
                        </div>
                      </div>
                    </div>
                    <p className='fw-bold px-3 rounded'>
                      <ReactMarkdown components={components} children={comment} />
                    </p>
                  </li>
                )
              })}
          </ul>
        </main>
        <Footer />
      </>
    )
  }
}

export default SinglePost
