import React, { useContext, useEffect, useState } from 'react'
import { PortfolioContext } from '../context/context'
import { AuthContext } from '../context/authContext'
import { FiTrash2 } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// i refactored this to be much cleaner and more understandable
const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const {
    progress,
    updateUserProfile,
    message,
    user,
    updateSkill,
    updateExperience,
    addProject,
    removeProject,
  } = useContext(PortfolioContext)

  const [userInfo, setUserInfo] = useState({
    username: '',
    bio: '',
    address: '',
    file: null,
    birthDate: '',
    skills: [],
  })

  const { username, bio, address, birthDate, skills, experience, projects } = userInfo
  // Skills
  const [language, setLanguage] = useState('')
  const [percentage, setPercentage] = useState(50)
  const [skillsList, setSkillsList] = useState([])

  // Exp
  const [year, setYear] = useState('')
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [expList, setExpList] = useState([])

  // projects
  const [projectTitle, setProjectTitle] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [projectImage, setProjectImage] = useState(null) // Type File
  const [projectDescription, setProjectDescription] = useState('')
  const [projectsList, setProjectsList] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()

    if (username.trim() !== '') {
      updateUserProfile(userInfo)
    }
  }

  const submitSkillHandler = (e) => {
    e.preventDefault()
    // add skills

    if (language.trim() !== '') {
      userInfo.skills = [
        ...skills,
        {
          id: Date.now(),
          language,
          percentage,
        },
      ]
      updateSkill(userInfo.skills)
      setPercentage(50)
    } else {
      // set an error
    }
  }

  const submitExperienceHandler = (e) => {
    e.preventDefault()
    // add skills
    userInfo.experience = [
      ...experience,
      {
        id: Date.now(),
        year,
        title,
        company,
        description,
      },
    ]
    updateExperience(userInfo.experience)
    setYear('')
    setTitle('')
    setCompany('')
    setDescription('')
  }

  const submitProjectHandler = (e) => {
    e.preventDefault()

    // add project
    const _projectObj = {
      id: Date.now(),
      projectTitle,
      projectUrl,
      projectDescription,
      projectImage, // type file
    }
    addProject(_projectObj, projects)
  }

  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.username || '',
        bio: user.bio || '',
        address: user.address || '',
        birthDate: user.birthDate || '',
        // skills
        skills: user.skills || [],
        // experience
        experience: user.experience || [],
        // projects
        projects: user.projects || [],
      })
      setSkillsList(user.skills || [])
      setExpList(user.experience || [])
      setProjectsList(user.projects || [])
    }
  }, [user])

  return (
    <>
      <Navbar />
      <section className='container mx-height '>
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

        <form onSubmit={(e) => submitSkillHandler(e)} className='card mb-3'>
          <div className='card-body'>
            <h3>Skills</h3>
            <label htmlFor='lang'>Language - {language}</label>
            <select
              defaultValue='select-value'
              onChange={({ target }) => setLanguage(target.value)}
              className='form-select mb-3'
              id='lang'
            >
              <option disabled value='select-value'>
                Select an Option
              </option>
              <option value='HTML'>HTML</option>
              <option value='CSS'>CSS</option>
              <option value='JS'>JS</option>
              <option value='PHP'>PHP</option>
              <option value='REACTJS'>REACTJS</option>
              <option value='LARAVEL'>LARAVEL</option>
            </select>
            <label htmlFor='percent'>Percentage - {percentage}%</label>
            <input
              onChange={({ target }) => setPercentage(target.value)}
              id='percent'
              value={percentage}
              className='form-range'
              type='range'
              min='0'
              max='100'
            />
            <h5>Skills List</h5>
            {skillsList.length === 0 && 'no skills yet'}
            <ul className='list-group mb-3'>
              {skillsList.map(({ language, percentage, id }) => {
                return (
                  <li key={id} className='list-group-item d-flex justify-content-between'>
                    {language} -{percentage}%
                    <button
                      onClick={() => {
                        setSkillsList(skillsList.filter((s) => s.id !== id))
                        updateSkill(skillsList.filter((s) => s.id !== id))
                      }}
                      type='button'
                      className='btn btn-sm btn-outline-danger'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                )
              })}
            </ul>
            <button className='btn btn-primary mb-3'>Save</button>
          </div>
        </form>

        <form onSubmit={(e) => submitExperienceHandler(e)} className='card mb-3'>
          <div className='card-body'>
            <h3>Experience</h3>

            <input
              onChange={({ target }) => setYear(target.value)}
              value={year}
              placeholder='Year'
              className='form-control mb-3'
              type='text'
            />
            <input
              onChange={({ target }) => setTitle(target.value)}
              value={title}
              placeholder='Title'
              className='form-control mb-3'
              type='text'
            />
            <input
              onChange={({ target }) => setCompany(target.value)}
              value={company}
              placeholder='Company'
              className='form-control mb-3'
              type='text'
            />
            <textarea
              onChange={({ target }) => setDescription(target.value)}
              value={description}
              placeholder='Description'
              className='form-control mb-3'
              type='text'
            />
            <h5>Exp List</h5>
            {expList.length === 0 && 'no experience yet'}

            <ul className='list-group mb-3'>
              {expList &&
                expList.map(({ year, title, id }, idx) => {
                  return (
                    <li key={id} className='list-group-item d-flex justify-content-between'>
                      {year}, {title} - {idx + 1}
                      <button
                        onClick={() => {
                          setExpList(experience.filter((s) => s.id !== id))
                          updateExperience(experience.filter((s) => s.id !== id))
                        }}
                        type='button'
                        className='btn btn-sm btn-outline-danger'
                      >
                        <FiTrash2 />
                      </button>
                    </li>
                  )
                })}
            </ul>
            <button className='btn btn-primary mb-3'>Save</button>
          </div>
        </form>

        <form onSubmit={(e) => submitProjectHandler(e)} className='card'>
          <div className='card-body'>
            <h3>Projects</h3>

            <input
              value={projectTitle}
              onChange={({ target }) => setProjectTitle(target.value)}
              placeholder='Title'
              className='form-control mb-3'
              type='text'
            />
            <input
              value={projectUrl}
              onChange={({ target }) => setProjectUrl(target.value)}
              placeholder='Url'
              className='form-control mb-3'
              type='text'
            />
            <input
              onChange={({ target }) => setProjectImage(target.files[0])}
              placeholder='Image'
              className='form-control mb-3'
              type='file'
            />
            <textarea
              value={projectDescription}
              onChange={({ target }) => setProjectDescription(target.value)}
              placeholder='Description'
              className='form-control mb-3'
            />

            <h5>Project List</h5>

            {projectsList.length === 0 && 'no projects yet'}

            <ul className='list-group mb-3'>
              {projectsList.map((_project) => {
                return (
                  <li key={_project.id} className='list-group-item d-flex justify-content-between'>
                    {_project.projectTitle}
                    <button
                      onClick={() => {
                        setProjectsList(projectsList.filter((s) => s.id !== _project.id))
                        removeProject(projectsList.filter((s) => s.id !== _project.id))
                      }}
                      type='button'
                      className='btn btn-sm btn-outline-danger'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                )
              })}
            </ul>
            <button className='btn btn-primary mb-3'>Save</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default Profile
