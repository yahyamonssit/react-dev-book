import React from 'react'
import ReactDOM from 'react-dom'
import { AuthProvider } from './context/authContext'
import { ChatProvider } from './context/chatContext'
import { PortfolioProvider } from './context/context'
import { ForumProvider } from './context/forumContext'

import { App } from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
// import './style-dark.css'
import './index.css'

const root = document.getElementById('root')

ReactDOM.render(
  <AuthProvider>
    <PortfolioProvider>
      <ForumProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ForumProvider>
    </PortfolioProvider>
  </AuthProvider>,
  root
)
