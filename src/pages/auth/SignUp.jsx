import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { db, timestamp } from '../../firebase'
import { FiHome, FiMail, FiKey, FiUser } from 'react-icons/fi'
import { DEFAULT_PROFILE_AVATAR } from '../../constants'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useContext(AuthContext)

  const handleSignUp = (e) => {
    e.preventDefault()
    if (password.trim() !== confirmPassword.trim()) {
      return setError('Passwords do not match 😭😭')
    }
    if (username.trim() === '') {
      return setError('Username is Required')
    }
    setIsLoading(true)
    setError('')

    try {
      db.collection('users')
        .where('username', '==', username)
        .get()
        .then((snapshot) => {
          const _users = snapshot.docs.map((doc) => {
            return doc.data()
          })

          if (_users?.length <= 0) {
            signup(email, password)
              .then(({ user }) => {
                db.collection('users')
                  .doc(email)
                  .set({
                    username: username,
                    bio: '',
                    address: '',
                    birthDate: '',
                    photoURL: DEFAULT_PROFILE_AVATAR,
                    uid: user.uid,
                    email: email,
                    lastLoggedIn: timestamp(),
                  })
                  .then(() => {
                    window.location = '/profile'
                  })
              })
              .catch((err) => {
                setError(err.message)
              })
              .finally(() => {
                // after the sign up user will be directed to his profile
                setIsLoading(false)
              })
          } else {
            setError('Username Already Taken ')
            setIsLoading(false)
          }
        })
        .catch((err) => {
          setError(err)
        })
    } catch (ex) {
      setError(ex.message)
    }
  }
  return (
    <>
      <div className='back-to-home rounded d-none d-sm-block'>
        <Link to='/' className='btn btn-icon btn-soft-primary'>
          <FiHome />
        </Link>
      </div>

      <section className='bg-auth-home d-table w-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7 col-md-6'>
              <div className='me-lg-5'>
                <img src='images/user/signup.svg' className='img-fluid d-block mx-auto' alt='' />
              </div>
            </div>
            <div className='col-lg-5 col-md-6'>
              <div className='card shadow rounded border-0'>
                <div className='card-body'>
                  <h4 className='card-title text-center'>Sign up</h4>
                  <form className='login-form mt-4' onSubmit={handleSignUp}>
                    {error && <div className='alert alert-danger'>{error}</div>}

                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='mb-3'>
                          <label className='form-label'>
                            Your Username <span className='text-danger'>*</span>
                          </label>
                          <div className='form-icon position-relative'>
                            <FiUser className='fea icon-sm icons' />

                            <input
                              value={username}
                              onChange={(event) => setUsername(event.target.value)}
                              required
                              id='username'
                              name='username'
                              type='text'
                              placeholder='Enter your username here'
                              className='form-control ps-5'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-12'>
                        <div className='mb-3'>
                          <label className='form-label'>
                            Your Email <span className='text-danger'>*</span>
                          </label>
                          <div className='form-icon position-relative'>
                            <FiMail className='fea icon-sm icons' />

                            <input
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                              required
                              id='email'
                              name='email'
                              type='email'
                              placeholder='Enter your email here'
                              className='form-control ps-5'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='col-md-12'>
                        <div className='mb-3'>
                          <label className='form-label'>
                            Password <span className='text-danger'>*</span>
                          </label>
                          <div className='form-icon position-relative'>
                            <FiKey className='fea icon-sm icons' />
                            <input
                              value={password}
                              onChange={(event) => setPassword(event.target.value)}
                              required
                              id='password'
                              name='password'
                              type='password'
                              className='form-control ps-5'
                              placeholder='Enter your password here'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='col-md-12'>
                        <div className='mb-3'>
                          <label className='form-label'>
                            Confirm Password
                            <span className='text-danger'>*</span>
                          </label>
                          <div className='form-icon position-relative'>
                            <FiKey className='fea icon-sm icons' />
                            <input
                              value={confirmPassword}
                              onChange={(event) => setConfirmPassword(event.target.value)}
                              id='password-confirmation'
                              name='password-confirmation'
                              type='password'
                              className='form-control ps-5'
                              placeholder='Confirm Password'
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* <div className='col-md-12'>
                        <div className='mb-3'>
                          <div className='form-check'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              value=''
                              id='flexCheckDefault'
                            />
                            <label
                              className='form-check-label'
                              for='flexCheckDefault'
                            >
                              I Accept
                              <a href='#' className='text-primary'>
                                Terms And Condition
                              </a>
                            </label>
                          </div>
                        </div>
                      </div> */}

                      <div className='col-md-12'>
                        <div className='d-grid'>
                          <button type='submit' disabled={isLoading} className='btn btn-primary'>
                            {isLoading ? (
                              <div className='d-flex justify-content-center'>
                                <div className='spinner-border'></div>
                              </div>
                            ) : (
                              'Register'
                            )}
                          </button>
                        </div>
                      </div>

                      <div className='mx-auto'>
                        <p className='mb-0 mt-3'>
                          <small className='text-dark me-2'>Already have an account ?</small>
                          <Link to='log-in' className='text-dark fw-bold'>
                            Log in
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp
