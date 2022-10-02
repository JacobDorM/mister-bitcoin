import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ContactApp } from './pages/ContactApp'
import { AppHeader } from './cmps/AppHeader'
import { About } from './pages/About'
import { ContactDetails } from './pages/ContactDetails'
import { ContactEdit } from './pages/ContactEdit'
import { Home } from './pages/Home'
import { Statistics } from './pages/Statistics'
import { Signup } from './pages/Signup'
import { getLoggedInUser, addMove } from './store/actions/authActions'
import { utilService } from './services/utilService'
import { loadContacts } from './store/actions/contactActions'
import { loadMoves } from './store/actions/moveActions'

const PrivateRoute = ({ children }) => {
  const isAdmin = true
  return isAdmin ? children : <Navigate to="/contacts" />
}

const LoggedInUserRoute = (props) => {
  const { loggedInUser, children } = props
  return loggedInUser ? children : <Navigate to="/signup" />
}

const NotLoggedInUserRoute = (props) => {
  const { loggedInUser, children } = props
  return !loggedInUser ? children : <Navigate to="/" />
}

const Team = () => {
  return (
    <ul>
      <li>Moshe Leon</li>
      <li>Lala Ben Regev</li>
      <li>Shimon DiCaprio</li>
    </ul>
  )
}

const Vision = () => {
  return (
    <ol>
      <li>Save the world with our contacts</li>
      <li>Take over the world with our contacts</li>
    </ol>
  )
}

export const App = () => {
  const [funds, setFunds] = useState(null)

  const { contact } = useSelector((state) => state.contactModule)
  const { loggedInUser } = useSelector((state) => state.authModule)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getLoggedInUser())
    dispatch(loadContacts())
  }, [dispatch])

  const onTransferCoins = async (e) => {
    e.preventDefault()
    if (funds) {
      await dispatch(loadMoves())
      await dispatch(addMove(funds.amount))
      setFunds(null)
      navigate('/contacts')
    }
  }

  return (
    <div className="main-app">
      <AppHeader />
      <main className="container">
        <Routes>
          <Route path="/contact/edit/:id" element={<ContactEdit contact={contact} />} />
          <Route path="/contact/edit/" element={<ContactEdit contact={contact} />} />
          <Route
            path="/contact/:id"
            element={
              <PrivateRoute>
                <ContactDetails onTransferCoins={onTransferCoins} onChangefunds={async (e) => await utilService.hookOnChange(e, setFunds)} funds={funds} loggedInUser={loggedInUser} contact={contact} />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <LoggedInUserRoute loggedInUser={loggedInUser}>
                <About />
              </LoggedInUserRoute>
            }
          >
            <Route path="team" element={<Team />} />
            <Route path="vision" element={<Vision />} />
          </Route>
          <Route
            path="/contacts"
            element={
              <LoggedInUserRoute loggedInUser={loggedInUser}>
                <ContactApp />
              </LoggedInUserRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <NotLoggedInUserRoute loggedInUser={loggedInUser}>
                <Signup />
              </NotLoggedInUserRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <LoggedInUserRoute loggedInUser={loggedInUser}>
                <Statistics />
              </LoggedInUserRoute>
            }
          />
          <Route
            path="/"
            element={
              <LoggedInUserRoute loggedInUser={loggedInUser}>
                <Home />
              </LoggedInUserRoute>
            }
          />
        </Routes>
      </main>
      <footer>
        <section className="container">contactRights 2022 &copy;</section>
      </footer>
    </div>
  )
}
