import React from 'react'
import PropTypes from 'prop-types'

const WYSIWYG = ({ content: __html, ...rest }) =>
  <div
    dangerouslySetInnerHTML={{ __html }}
    {...rest}
  />

WYSIWYG.propTypes = {
  content: PropTypes.string
}

export default WYSIWYG
