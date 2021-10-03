import React from 'react'

const Experience = (props) => {
  const {
    year,
    setYear,
    title,
    setTitle,
    company,
    setCompany,
    description,
    setDescription,
    expList,
    setExpList,
    updateExperience,
    submitExperienceHandler,
    experience,
  } = props
  return (
    <>
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
                      {/* <FiTrash2 /> */}
                      remove
                      {/* TODO: icons */}
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

export default Experience
