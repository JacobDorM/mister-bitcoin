import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
import { ContactApp } from './pages/ContactApp'
import { AppHeader } from './cmps/AppHeader'
import { About } from './pages/About'
import { ContactDetails } from './pages/ContactDetails'
import { ContactEdit } from './pages/ContactEdit'
import { Home } from './pages/Home'
import { Statistics } from './pages/Statistics'
import { Signup } from './pages/Signup'
import { getLoggedInUser } from './store/actions/authActions'

const PrivateRoute = (props) => {
  const isAdmin = true
  // return isAdmin ? <Route path={props.path} component={props.component} /> : <Redirect to='/' />
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

class _App extends Component {
  async componentDidMount() {
    this.props.getLoggedInUser()
  }

  render() {
    const { loggedInUser } = this.props

    return (
      <Router>
        <div className="main-app">
          <AppHeader />
          <main className="container">
            <Switch>
              <Route path="/contact/edit/:id?" component={ContactEdit} />
              <PrivateRoute path="/contact/:id" component={ContactDetails} />
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
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.authModule.loggedInUser,
  }
}

const mapDispatchToProps = {
  getLoggedInUser,
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
