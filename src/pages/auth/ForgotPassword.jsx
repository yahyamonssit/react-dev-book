import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { FiHome, FiMail } from 'react-icons/fi'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { resetPassword } = useContext(AuthContext)

  const handleForgotPassword = (e) => {
    e.preventDefault()
    try {
      setMessage('')
      setError('')
      setIsLoading(true)

      resetPassword(email)
        .then(() => {
          setMessage('Check your email for further instructions 😊😊')
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
                  src='images/user/recovery.svg'
                  className='img-fluid d-block mx-auto'
                  alt=''
                />
              </div>
            </div>
            <div className='col-lg-5 col-md-6'>
              <div className='card shadow rounded border-0'>
                <div className='card-body'>
                  <h4 className='card-title text-center'>Recover Account</h4>

                  <form
                    onSubmit={handleForgotPassword}
                    className='login-form mt-4'
                  >
                    {message && (
                      <div className='alert alert-success'>{message}</div>
                    )}
                    {error && <div className='alert alert-danger'>{error}</div>}
                    <div className='row'>
                      <div className='col-lg-12'>
                        <p className='text-muted'>
                          Please enter your email address. You will receive a
                          link to create a new password via email.
                        </p>
                        <div className='mb-3'>
                          <label className='form-label'>
                            Email address <span className='text-danger'>*</span>
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
                              className='form-control ps-5'
                              placeholder='Enter Your Email Address'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='d-grid'>
                          <button
                            className='btn btn-primary'
                            disabled={isLoading}
                            type='submit'
                          >
                            {isLoading ? (
                              <div className='d-flex justify-content-center'>
                                <div className='spinner-border'></div>
                              </div>
                            ) : (
                              'Send'
                            )}
                          </button>
                        </div>
                      </div>
                      <div className='mx-auto'>
                        <p className='mb-0 mt-3'>
                          <small className='text-dark me-2'>
                            Remember your password ?
                          </small>
                          <Link to='/log-in' className='text-dark fw-bold'>
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

export default ForgotPassword
