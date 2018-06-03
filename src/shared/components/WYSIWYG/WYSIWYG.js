import { createElement } from 'react'
import PropTypes from 'prop-types'

const WYSIWYG = ({ content: __html, element = 'div', ...rest }) =>
  createElement(element, {
    dangerouslySetInnerHTML: { __html },
    ...rest
  })

WYSIWYG.propTypes = {
  content: PropTypes.string
}

export default WYSIWYG
