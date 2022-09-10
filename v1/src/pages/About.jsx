import { NavLink, Route } from 'react-router-dom'

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

export function About() {
  return (
    <section className="about">
      <section className="title-container">
        <h2>About us and contacts</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla minus explicabo ipsum necessitatibus cupiditate facere corrupti, praesentium tempora molestias, accusantium repellendus, in quasi. Iste labore maxime, vitae nulla odit sint.</p>
      </section>

      <nav>
        <NavLink to="/about/team">Team</NavLink>
        <NavLink to="/about/vision">Vision</NavLink>
      </nav>

      <section>
        <Route path="/about/team" component={Team} />
        <Route path="/about/vision" component={Vision} />
      </section>
    </section>
  )
}
