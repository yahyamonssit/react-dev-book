import React from 'react'

const Skills = ({ skills }) => {
  return (
    <>
      <h4 className='mt-lg-5 mt-4'>Skills :</h4>

      {skills ? (
        skills.map(({ language, percentage, id }) => {
          return (
            <div key={id} className='progress-box mt-4'>
              <h6 className='title text-muted'>{language}</h6>
              <div className='progress'>
                <div
                  className='progress-bar position-relative bg-primary'
                  style={{ width: percentage + '%' }}
                >
                  <div className='progress-value d-block text-muted h6'>
                    {percentage}%
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <h5>
          <i>No skills</i>
        </h5>
      )}
    </>
  )
}

export default Skills
