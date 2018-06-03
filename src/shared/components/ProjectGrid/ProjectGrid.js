import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import placeholder from '../../media/placeholder.jpg'

import styles from './ProjectGrid.scss'

const renderItem = ({
  id,
  imageMeta: { url: imgUrl, width, height, alt } = {},
  link,
  title
}) => (
  <Link
    className={styles.item}
    to={link}
    key={id}
  >
    <div className={styles.image}>
      <img
        alt={alt}
        src={imgUrl || placeholder}
        width={width || 100}
        height={height || 100}
      />
    </div>
    <div className={styles.text}>
      <h2>{title}</h2>
    </div>
  </Link>
)

const ProjectGrid = ({ content = [] }) => (
  <div className={styles.container}>
    {content.map(renderItem)}
  </div>
)

ProjectGrid.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      imageAlt: PropTypes.shape({
        alt: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        url: PropTypes.string
      }),
      link: PropTypes.string,
      title: PropTypes.string
    })
  ),
}

export default ProjectGrid;
