import React from 'react'
import PropTypes from 'prop-types'
import { Helmet as ReactHelmet } from 'react-helmet'

const Helmet = ({ children, description, title } = {}) => (
  <ReactHelmet
    meta={[
      { name: 'description', content: description }
    ]}
    title={title}
  >
    {children}
  </ReactHelmet>
)

Helmet.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  keywords: PropTypes.string,
  title: PropTypes.string
}

export default Helmet;
