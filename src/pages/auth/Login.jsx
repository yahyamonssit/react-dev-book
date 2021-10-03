import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { FiHome, FiMail, FiKey } from 'react-icons/fi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const history = useHistory()

  const handleSignUp = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      login(email, password)
        .then(() => {
          history.push('/')
        })
        .catch((err) => {
          setError(err.message)
        })
        .finally(() => {
          setIsLoading(false)
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
      <section className='bg-home d-flex align-items-center'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7 col-md-6'>
              <div className='me-lg-5'>
                <img
                  src='images/user/login.svg'
                  className='img-fluid d-block mx-auto'
                  alt=''
                />
              </div>
            </div>
            <div className='col-lg-5 col-md-6'>
              <div className='card login-page bg-white shadow rounded border-0'>
                <div className='card-body'>
                  <h4 className='card-title text-center'>Login</h4>

                  <form onSubmit={handleSignUp} className='login-form mt-4'>
                    {error && <div className='alert alert-danger'>{error}</div>}
                    <div className='row'>
                      <div className='col-lg-12'>
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
                              type='email'
                              placeholder='Enter your email here'
                              className='form-control ps-5'
                              name='email'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='col-lg-12'>
                        <div className='mb-3'>
                          <label className='form-label'>
                            Password <span className='text-danger'>*</span>
                          </label>
                          <div className='form-icon position-relative'>
                            <FiKey className='fea icon-sm icons' />

                            <input
                              value={password}
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                              required
                              id='password'
                              name='password'
                              type='password'
                              placeholder='Enter your password here'
                              className='form-control ps-5'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='col-lg-12'>
                        <div className='d-flex justify-content-between'>
                          <p className='forgot-pass mb-3'>
                            <Link to='/' className='text-dark fw-bold'>
                              Forgot password ?
                            </Link>
                          </p>
                        </div>
                      </div>

                      <div className='col-lg-12 mb-0'>
                        <div className='d-grid'>
                          <button
                            disabled={isLoading}
                            type='submit'
                            className='btn btn-primary'
                          >
                            {isLoading ? (
                              <div className='d-flex justify-content-center'>
                                <div className='spinner-border'></div>
                              </div>
                            ) : (
                              'Log in'
                            )}
                          </button>
                        </div>
                      </div>

                      <div className='col-12 text-center'>
                        <p className='mb-0 mt-3'>
                          <small className='text-dark me-2'>
                            Don't have an account ?
                          </small>
                          <Link to='/sign-up' className='text-dark fw-bold'>
                            Sign Up
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

export default Login
