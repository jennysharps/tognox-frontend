import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { getPath } from '../../utils/pathUtils'
import logo from './logo.svg'

import styles from './Header.scss'

const navItems = [
  { route: 'home', text: 'Home' },
  { route: 'about', text: 'About' },
  { route: 'projects', text: 'Projects' },
  { route: 'publications', text: 'Publications' },
  { route: 'contact', text: 'Contact' },
  { route: 'resources', text: 'Resources' }
]

const Header = () => (
  <header className={classNames('App-header', styles.header)}>
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to Universal React</h2>
    <nav>
      <ul>
        {navItems.map(({ route, text }, index) => {
          const path = getPath(route)

          if (!path) {
            console.log(`navigation route not found: ${route}`)
          }

          return path && (
            <li
              className={styles.navLink}
              key={`${path}-${index}`}
            >
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
