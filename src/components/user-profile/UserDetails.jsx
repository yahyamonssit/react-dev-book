import React from 'react'

const UserInfo = (props) => {
  const {
    currentUser,
    user,
    message,
    progress,
    submitHandler,
    address,
    birthDate,
    userInfo,
    setUserInfo,
    username,
    bio,
  } = props
  return (
    <>
      <h3 className='display-3'>Profile</h3>
      {message && <div className='alert alert-success'>{message}</div>}

      {user && (
        <img width='100' className='mb-3 img-thumbnail' src={user.photoURL} alt={user.username} />
      )}

      {progress > 0 && (
        <div className='progress mb-3'>
          Uploading
          <div
            className='progress-bar progress-bar-striped progress-bar-animated'
            role='progressbar'
            aria-valuenow={progress}
            aria-valuemin='0'
            aria-valuemax='100'
            style={{ width: progress + '%' }}
          >
            {progress + '%'}
          </div>
        </div>
      )}

      <form onSubmit={(e) => submitHandler(e)} className='card mb-3'>
        <div className='card-body'>
          <h3>User Info</h3>
          <input disabled value={currentUser.email} type='email' className='form-control mb-3' />
          <input
            onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })}
            value={username}
            placeholder='username'
            className='form-control mb-3'
            type='text'
          />
          <input
            onChange={({ target }) => setUserInfo({ ...userInfo, bio: target.value })}
            value={bio}
            placeholder='bio'
            type='text'
            className='form-control mb-3'
          />

          <textarea
            onChange={({ target }) => setUserInfo({ ...userInfo, address: target.value })}
            value={address}
            placeholder='Address'
            className='form-control mb-3'
          />
          <input
            onChange={({ target }) => setUserInfo({ ...userInfo, file: target.files[0] })}
            type='file'
            className='form-control mb-3'
          />
          <input
            onChange={({ target }) => setUserInfo({ ...userInfo, birthDate: target.value })}
            value={birthDate}
            type='date'
            className='form-control mb-3'
          />
          <button className='btn btn-primary mb-3'>Save</button>
        </div>
      </form>
    </>
  )
}

export default UserInfo
