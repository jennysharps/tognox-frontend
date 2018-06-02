import React, { Fragment, createElement } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import placeholder from '../../media/placeholder.jpg'

import styles from './GridItem.scss'

const GridItem = ({
  backgroundImg,
  className = '',
  children,
  link,
}) => {
  const { url: imgUrl, width, height, alt } = backgroundImg || {}
  const content = (
    <Fragment>
      {backgroundImg && (
        <div className={classNames(styles.image)}>
          <img
            alt={alt}
            src={imgUrl || placeholder}
            width={width || 100}
            height={height || 100}
          />
        </div>
      )}
      <div className={styles.text}>
        {children}
      </div>
    </Fragment>
  )

  return createElement(link ? Link : 'div', {
    children: content,
    className: classNames(styles.item, className),
    to: link
  })
}

GridItem.propTypes = {
  id: PropTypes.number,
  backgroundImg: PropTypes.shape({
    alt: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    url: PropTypes.string
  }),
  link: PropTypes.string,
  title: PropTypes.string
}

export default GridItem;
