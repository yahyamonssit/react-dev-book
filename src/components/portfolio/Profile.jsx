import moment from 'moment'
import React from 'react'

const Profile = ({ userInfo }) => {
  const { bio, username, email, birthDate } = userInfo

  // TODO: icons
  return (
    <>
      <section className='section mt-60'>
        <div className='container mt-lg-3'>
          <div className='row'>
            <div className='col-lg-4 col-md-6 col-12 d-lg-block d-none'></div>

            <div className='col-lg-8 col-12'>
              <div className='border-bottom pb-4'>
                <h5>{username}</h5>
                <p className='text-muted mb-0'>{bio}</p>
              </div>

              <div className='border-bottom pb-4'>
                <div className='row'>
                  <div className='col-md-6 mt-4'>
                    <h5>Personal Details :</h5>
                    <div className='mt-4'>
                      <div className='d-flex align-items-center'>
                        <i
                          data-feather='mail'
                          className='fea icon-ex-md text-muted me-3'
                        ></i>
                        <div className='flex-1'>
                          <h6 className='text-primary mb-0'>Email :</h6>
                          <a
                            href='mailto:email@example.com'
                            target='_blank'
                            rel='noreferrer'
                            className='text-muted'
                          >
                            {email}
                          </a>
                        </div>
                      </div>
                      <div className='d-flex align-items-center mt-3'>
                        <i
                          data-feather='globe'
                          className='fea icon-ex-md text-muted me-3'
                        ></i>
                        <div className='flex-1'>
                          <h6 className='text-primary mb-0'>Website :</h6>
                          <span className='text-muted'>www.devbook.com</span>
                        </div>
                      </div>
                      <div className='d-flex align-items-center mt-3'>
                        <i
                          data-feather='gift'
                          className='fea icon-ex-md text-muted me-3'
                        ></i>
                        <div className='flex-1'>
                          <h6 className='text-primary mb-0'>Birthday :</h6>
                          <p className='text-muted mb-0'>
                            {moment(birthDate).format('MMM Do YYYY')}
                          </p>
                        </div>
                      </div>
                      <div className='d-flex align-items-center mt-3'>
                        <i
                          data-feather='gift'
                          className='fea icon-ex-md text-muted me-3'
                        ></i>
                        <div className='flex-1'>
                          <h6 className='text-primary mb-0'>Age: :</h6>
                          <p className='text-muted mb-0'>
                            {moment().diff(birthDate, 'years')}
                          </p>
                        </div>
                      </div>
                      <div className='d-flex align-items-center mt-3'>
                        <i
                          data-feather='map-pin'
                          className='fea icon-ex-md text-muted me-3'
                        ></i>
                        <div className='flex-1'>
                          <h6 className='text-primary mb-0'>Location :</h6>
                          <span className='text-muted'>English</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6 mt-4 pt-2 pt-sm-0'>
                    <h5>Experience :</h5>

                    <div className='d-flex key-feature align-items-center p-3 rounded shadow mt-4'>
                      <img
                        src='images/job/Circleci.svg'
                        className='avatar avatar-ex-sm'
                        alt='...'
                      />
                      <div className='flex-1 content ms-3'>
                        <h4 className='title mb-0'>Senior Web Developer</h4>
                        <p className='text-muted mb-0'>3 Years Experience</p>
                        <p className='text-muted mb-0'>
                          <span className='text-muted'>CircleCi</span>
                          @London, UK
                        </p>
                      </div>
                    </div>

                    <div className='d-flex key-feature align-items-center p-3 rounded shadow mt-4'>
                      <img
                        src='images/job/Codepen.svg'
                        className='avatar avatar-ex-sm'
                        alt=''
                      />
                      <div className='flex-1 content ms-3'>
                        <h4 className='title mb-0'>Web Designer</h4>
                        <p className='text-muted mb-0'>2 Years Experience</p>
                        <p className='text-muted mb-0'>
                          <span className='text-muted'>Codepen</span>
                          @Washington D.C, USA
                        </p>
                      </div>
                    </div>

                    <div className='d-flex key-feature align-items-center p-3 rounded shadow mt-4'>
                      <img
                        src='images/job/Gitlab.svg'
                        className='avatar avatar-ex-sm'
                        alt=''
                      />
                      <div className='flex-1 content ms-3'>
                        <h4 className='title mb-0'>UI Designer</h4>
                        <p className='text-muted mb-0'>2 Years Experience</p>
                        <p className='text-muted mb-0'>
                          <span className='text-muted'>Gitlab</span>
                          @Perth, Australia
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className='mt-4 mb-0'>Projects :</h5>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile
