import React from 'react'

const Projects = (props) => {
  const {
    removeProject,
    submitProjectHandler,
    projectTitle,
    setProjectTitle,
    projectUrl,
    setProjectUrl,
    setProjectImage,
    projectDescription,
    setProjectDescription,
    projectsList,
    setProjectsList,
  } = props
  return (
    <>
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
                    {/* TODO: icon <FiTrash2 />   */}
                  </button>
                </li>
              )
            })}
          </ul>
          <button className='btn btn-primary mb-3'>Save</button>
        </div>
      </form>
    </>
  )
}

export default Projects
