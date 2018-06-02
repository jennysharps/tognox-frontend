import React from 'react'
import PropTypes from 'prop-types'
import ContentSection from '../ContentSection'
import styles from './IconContentGrid.scss'
import WYSIWYG from '../WYSIWYG/WYSIWYG'

const IconContentGrid = ({
  className = '',
  heading,
  content = [],
  ...rest
}) => (
  <ContentSection
    className={className}
    heading={heading}
  >
    <div className={styles.content}>
      {content.map(({ name, icon }, i) => (
        <div
          className={styles.item}
          key={`${name}-${i}`}
        >
          {icon && (
            <div className={styles.iconWrapper}>
              <img
                alt={name}
                className={styles.icon}
                src={icon}
              />
            </div>
          )}
          <WYSIWYG
            className={styles.name}
            content={name}
            element="h2"
          />
        </div>
      ))}
    </div>
  </ContentSection>
)

IconContentGrid.propTypes = {
  className: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string
    })
  ).isRequired,
}

export default IconContentGrid
