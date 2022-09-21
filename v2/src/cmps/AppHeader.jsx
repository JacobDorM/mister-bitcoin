import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

export const AppHeader = () => {
  const { loggedInUser } = useSelector((state) => state.authModule)
  const history = useHistory()
  
  return (
    <header className="app-header">
      <section className="container">
        <h1 className="logo">Contacts</h1>
        {loggedInUser ? (
          <section className="user">
            <p>Name: {loggedInUser.fullname}</p>
            <p>Coins: {loggedInUser.coins}</p>
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
