import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
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
import { getLoggedInUser, addMove } from './store/actions/authActions'
import { utilService } from './services/utilService'
import { setContact, saveContact, loadContacts } from './store/actions/contactActions'

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

class _App extends Component {
  state = {
    contact: this.props.contact,
    funds: null,
  }

  async componentDidMount() {
    this.props.getLoggedInUser()
  }

  onTransferCoins = async (e) => {
    e.preventDefault()
    this.props.addMove(this.props.loggedInUser, this.props.contact, this.state.funds.amount)
    this.props.history.push('/contacts')
  }

  onChangefunds = async (e) => {
    await utilService.onChange(e, this, 'funds')
  }

  onChangeContact = async (e) => {
    this.setState({ contact: this.props.contact })
    await utilService.onChange(e, this, 'contact')
    await this.props.setContact(this.state.contact)
  }

  onSubmitContact = async (e) => {
    await utilService.onSubmit(e, this, 'saveContact', 'contact')
    await this.props.loadContacts()
    this.props.history.push('/contacts')
  }

  render() {
    const { loggedInUser } = this.props

    return (
      <div className="main-app">
        <AppHeader />
        <main className="container">
          <Switch>
            <Route path="/contact/edit/:id?" render={(props) => <ContactEdit {...props} onSubmitContact={this.onSubmitContact} onChange={this.onChangeContact} />} />
            <PrivateRoute path="/contact/:id" render={(props) => <ContactDetails {...props} onTransferCoins={this.onTransferCoins} onChangefunds={this.onChangefunds} funds={this.state.funds} />} />
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
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.authModule.loggedInUser,
    contact: state.contactModule.contact,
  }
}

const mapDispatchToProps = {
  getLoggedInUser,
  setContact,
  saveContact,
  loadContacts,
  addMove,
}

export const App = connect(mapStateToProps, mapDispatchToProps)(withRouter(_App))
