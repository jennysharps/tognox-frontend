import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './ContentSection.scss'

const ContentSection = ({
  children,
  className = '',
  columns: columnCount = 1,
  heading,
  ...rest
}) => (
  <section
    className={classNames(styles.container, className)}
    {...rest}
  >
    {heading && <h1>{heading}</h1>}
    {children && (
      <div
        className={styles.multiColumn}
        style={columnCount > 1 ? {columnCount} : undefined}
      >
        {children}
      </div>
    )}
  </section>
)

ContentSection.propTypes = {
  children:PropTypes.node.isRequired,
  columns: PropTypes.number,
  heading: PropTypes.node.isRequired
}

export default ContentSection
