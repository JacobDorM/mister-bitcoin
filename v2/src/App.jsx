import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
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
import { setContact, saveContact } from './store/actions/contactActions'

const PrivateRoute = (props) => {
  const isAdmin = true
  return isAdmin ? <Route {...props} /> : <Redirect to="/contacts" />
}

const LoggedInUserRoute = (props) => {
  const { loggedInUser } = props
  return loggedInUser ? <Route {...props} /> : <Redirect to="/signup" />
}

const NotLoggedInUserRoute = (props) => {
  const { loggedInUser } = props
  return !loggedInUser ? <Route {...props} /> : <Redirect to="/" />
}

export const App = () => {
  const [localContact, setLocalContact] = useState(null)
  const [funds, setFunds] = useState(null)

  const { contact } = useSelector((state) => state.contactModule)
  const { loggedInUser } = useSelector((state) => state.authModule)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [dispatch])

  const onTransferCoins = async (e) => {
    e.preventDefault()
    if (funds) {
      await dispatch(addMove(funds.amount))
      setFunds(null)
      history.push('/contacts')
    }
  }

  const onChangeContact = async (e) => {
    setLocalContact(contact)
    await utilService.hookOnChange(e, setLocalContact)
  }

  useEffect(() => {
    dispatch(setContact(localContact))
  }, [localContact, dispatch])

  const onSubmitContact = async (e) => {
    e.preventDefault()
    await dispatch(saveContact(localContact))
    history.push('/contacts')
  }

  return (
    <div className="main-app">
      <AppHeader />
      <main className="container">
        <Switch>
          <Route path="/contact/edit/:id?" render={(props) => <ContactEdit {...props} onSubmitContact={onSubmitContact} onChange={onChangeContact} />} />
          <PrivateRoute path="/contact/:id" render={(props) => <ContactDetails {...props} onTransferCoins={onTransferCoins} onChangefunds={async (e) => await utilService.hookOnChange(e, setFunds)} funds={funds} loggedInUser={loggedInUser} />} />
          <LoggedInUserRoute path="/about" component={About} loggedInUser={loggedInUser} />
          <LoggedInUserRoute path="/contacts" component={ContactApp} loggedInUser={loggedInUser} />
          <NotLoggedInUserRoute path="/signup" component={Signup} loggedInUser={loggedInUser} />
          <LoggedInUserRoute path="/statistics" component={Statistics} loggedInUser={loggedInUser} />
          <LoggedInUserRoute path="/" component={Home} match={'a'} loggedInUser={loggedInUser} />
        </Switch>
      </main>
      <footer>
        <section className="container">contactRights 2022 &copy;</section>
      </footer>
    </div>
  )
}
