import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import {App} from './components/app'
import {BrowserRouter as Router, MemoryRouter} from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"

test('full app rendering/navigating', async () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <AuthProvider>
        <App />
        </AuthProvider>
      </Router>,
    )

    const user = userEvent.setup()
    // Verify page content for expected route
    expect(screen.getByText(/you are at login/i)).toBeInTheDocument()
  
    await user.click(screen.getByText(/chats/i))
  
    // Check that the content changed to the new page
    expect(screen.getByText(/you are on the chats page/i)).toBeInTheDocument()
  })
  
  test('landing on a bad page', () => {
    const history = createMemoryHistory()
    history.push('/some/bad/route')
    render(
      <Router history={history}>
        <AuthProvider>
        <App />
        </AuthProvider>
      </Router>,
    )
  
    expect(screen.getByText(/no match/i)).toBeInTheDocument()
  })