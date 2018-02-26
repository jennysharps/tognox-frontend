import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SectionHeading from '../SectionHeading'
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
    {heading && <SectionHeading>{heading}</SectionHeading>}
    {children && (
      <div
        className={styles.multiColumn}
        style={columnCount > 1 ? { columnCount } : undefined}
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
