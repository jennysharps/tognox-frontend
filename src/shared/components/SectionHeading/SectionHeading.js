import React  from 'react'
import PropTypes from 'prop-types'
import styles from './SectionHeading.scss'

const SectionHeading = ({
  children,
  ...rest
}) => (
  <h1 className={styles.heading}>{children}</h1>
)

SectionHeading.propTypes = {
  children:PropTypes.node.isRequired
}

export default SectionHeading
