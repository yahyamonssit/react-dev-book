import React from 'react'
import { FiTrash2 } from 'react-icons/fi'

const Skills = (props) => {
  const {
    updateSkill,
    submitSkillHandler,
    language,
    setLanguage,
    percentage,
    setPercentage,
    skillsList,
    setSkillsList,
  } = props
  return (
    <>
      <form onSubmit={(e) => submitSkillHandler(e)} className='card mb-3'>
        <div className='card-body'>
          <h3>Skills</h3>
          <label htmlFor='lang'>Language - {language}</label>
          <select
            onChange={({ target }) => setLanguage(target.value)}
            id='lang'
            className='form-select mb-3'
          >
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
    </>
  )
}

export default Skills
