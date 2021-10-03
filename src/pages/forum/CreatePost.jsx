import React, { useContext, useState } from 'react'
import { ForumContext } from '../../context/forumContext'
import ReactMarkdown from 'react-markdown'
import { components } from '../../components/MarkdownPost'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const CreatePost = () => {
  const { createPost } = useContext(ForumContext)

  const [post, setPost] = useState({
    postTitle: '',
    postText: '',
    postImage: null,
  })

  const submitHandler = (e) => {
    e.preventDefault()

    if (post.postTitle.trim() !== '') {
      createPost(post)
    }
  }

  return (
    <>
      <Navbar />
      <main className='container mx-height '>
        <h1 className='display-4'>Create Post</h1>

        <form onSubmit={(e) => submitHandler(e)}>
          <input
            value={post.postTitle}
            onChange={({ target }) => setPost({ ...post, postTitle: target.value })}
            className='form-control mb-3'
            placeholder='title'
            type='text'
          />
          <input
            onChange={({ target }) => setPost({ ...post, postImage: target.files[0] })}
            className='form-control mb-3'
            type='file'
          />
          <div className='row'>
            <div className='col-6'>
              <textarea
                rows='15'
                placeholder='Enter more information ....'
                value={post.postText}
                onChange={({ target }) => setPost({ ...post, postText: target.value })}
                className='form-control mb-3'
              />
            </div>
            <div className='col-6' style={{ maxWidth: '300px' }}>
              <ReactMarkdown
                style={{ maxWidth: '300px' }}
                components={components}
                children={post.postText}
              />
            </div>
          </div>
          <button className='btn btn-info'>Create Post</button>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default CreatePost
