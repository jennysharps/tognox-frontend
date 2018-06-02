import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './ContentWrapper.scss'

const ContentWrapper = ({
  alternate,
  children,
  className = '',
  ...rest
}) => (
  <div
    className={classNames(styles.container, className, { [styles.alternate]: alternate })}
    {...rest}
  >
    {children}
  </div>
)

ContentWrapper.propTypes = {
  alternate: PropTypes.bool,
  children:PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default ContentWrapper
