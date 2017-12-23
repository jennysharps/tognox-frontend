import React from 'react'
import { Link } from 'react-router-dom'

import { getRouteConfig } from '../../utils/routeUtils'

import logo from './logo.svg'

const navItems = [
  { route: 'home', text: 'Home' },
  { route: 'about', text: 'About' },
  { route: 'projects', text: 'Projects' },
  { route: 'publications', text: 'Publications' },
  { route: 'contact', text: 'Contact' },
  { route: 'resources', text: 'Resources' }
]

const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to Universal React</h2>
    <nav>
      <ul>
        {navItems.map(({ route, text }) => {
          const { path, key } = getRouteConfig(route) || {}

          if (!path) {
            console.log(`navigation route not found: ${route}`)
          }

          return path && (
            <li key={key} style={{ display: 'inline-block', margin: '0 5px' }}>
              <Link to={path}>
                {text}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  </header>
)

export default Header;
