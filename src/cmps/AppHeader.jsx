import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

function _AppHeader({ loggedInUser, history }) {
  return (
    <header className="app-header">
      <section className="container">
        <h1 className="logo">Contacts</h1>
        {loggedInUser ? (
          <section className="user">
            <p>Name: {loggedInUser.fullname}</p>
            <p>Balance: {loggedInUser.coins}</p>
          </section>
        ) : (
          ''
        )}
        <section className="back">
          <button onClick={history.goBack}>Back</button>
        </section>
        <nav>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </section>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.authModule.loggedInUser,
  }
}

export const AppHeader = connect(mapStateToProps)(withRouter(_AppHeader))
