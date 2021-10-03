import React, { useContext } from 'react'
import { BsChat } from 'react-icons/bs'
import { useHistory } from 'react-router-dom'
import { ChatContext } from '../../context/chatContext'
import Skills from './Skills'
const Hero = ({ userInfo }) => {
  const { skills, address, bio, birthDate, email, photoURL, username, experience, projects } =
    userInfo
  const { setSelectedUser } = useContext(ChatContext)
  const history = useHistory()

  const triggerNotification = () => {
    Promise.allSettled([
      setSelectedUser({
        ...userInfo,
      }),
    ]).then(() => {
      history.push('/chat-room')
    })
  }

  // TODO: online here
  // TODO: icons
  return (
    <>
      <div className='mx-height'>
        <section
          style={{ backgroundImage: `url('/images/enterprise.png')` }}
          className='bg-half-260 d-table w-100'
        >
          <div className='bg-overlay'></div>
        </section>
        <section className='section'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-4 col-md-5 col-12'>
                <div className='card job-profile shadow border-0'>
                  <div className='text-center py-5 border-bottom rounded-top'>
                    <img
                      src={photoURL}
                      className='avatar avatar-medium mx-auto rounded-circle shadow d-block'
                      alt=''
                    />
                    <h5 className='mt-3 mb-0'>{username}</h5>
                    <p className='text-muted mb-0'>Senior Web Developer</p>
                    {/* TODO: add position */}
                  </div>
                  <div className='card-body'>
                    <h5 className='card-title'>Personal Details :</h5>

                    <ul className='list-unstyled'>
                      <li className='h6'>
                        <span className='text-muted'>Email :</span>
                        {email}
                      </li>
                      <li className='h6'>
                        <span className='text-muted'>D.O.B. :</span>
                        {birthDate}
                      </li>
                      <li className='h6'>
                        <span className='text-muted'>Address :</span>
                        {address}
                      </li>
                    </ul>
                    <div className='d-grid'>
                      <button onClick={triggerNotification} className='btn btn-primary'>
                        <BsChat className='align-middle mx-3' />
                        Contact Me
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-lg-8 col-md-7 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0'>
                <div className='ms-lg-4'>
                  <h4>About Me:</h4>
                  <p className='text-muted mb-0'>{bio}</p>
                  <h4 className='mt-lg-5 mt-4'>Experience :</h4>
                  <div className='row'>
                    {experience?.map(({ year, title, company, description }) => {
                      return (
                        <div className='col-lg-12 mt-4 pt-2'>
                          <div className='d-flex'>
                            <div className='company-logo text-muted h6 me-3 text-center'>
                              {year}
                            </div>
                            <div className='flex-1'>
                              <h5 className='title mb-0'>{title}</h5>
                              <small className='text-muted company-university'>{company}</small>
                              <p className='text-muted mt-2 mb-0'>{description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <Skills skills={skills} />

                  <h4 className='mt-lg-5 mt-4'>Projects :</h4>
                  <section className='row'>
                    {projects &&
                      projects.map((_project) => {
                        const { id, projectTitle, projectUrl, projectDescription, projectImage } =
                          _project
                        return (
                          <article key={id} className='col-md-6 col-12 mt-4 pt-2'>
                            <div className='card border-0 work-container work-classic'>
                              <div className='card-body p-0'>
                                <a target='_blank' href={projectUrl} rel='noreferrer'>
                                  <img
                                    src={projectImage}
                                    alt={projectTitle}
                                    className='img-fluid rounded work-image'
                                  />
                                </a>
                                <div className='content pt-3'>
                                  <h5 className='mb-0'>
                                    <a
                                      target='_blank'
                                      href={projectUrl}
                                      rel='noreferrer'
                                      className='text-dark title'
                                    >
                                      {projectTitle}
                                    </a>
                                  </h5>
                                  <p className='text-muted tag mb-0'>{projectDescription}</p>
                                </div>
                              </div>
                            </div>
                          </article>
                        )
                      })}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Hero
