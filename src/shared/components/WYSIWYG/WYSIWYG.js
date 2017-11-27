import React from 'react'
import PropTypes from 'prop-types'

const WYSIWYG = ({ content: __html }) =>
  <div dangerouslySetInnerHTML={{ __html }} />

WYSIWYG.propTypes = {
  content: PropTypes.string
}

export default WYSIWYG
