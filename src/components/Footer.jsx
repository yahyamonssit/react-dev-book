import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='footer footer-bar '>
      <div className='container text-center'>
        <div className='row align-items-center'>
          <div className='col-sm-6'>
            <div className='text-sm-start'>
              <p className='mb-0'>
                ©{new Date().getFullYear()} DevBook. Developed with
                <AiOutlineHeart className='mdi mdi-heart text-danger mx-4' />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
