import React, { Children } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames'

import styles from './ContentGrid.scss'

const ContentGrid = ({ children, backgroundStyle = 'solid' }) => (
  <div className={classNames(styles.container, styles[`bg-${backgroundStyle}`])}>
    {Children.map(children, (child, i) => (
      <div className={classNames(styles.item, (i + 1) % 2 === 0  ? 'even' : 'odd' )}>
        <div className={styles.content}>
          {child}
        </div>
      </div>
    ))}
  </div>
)

ContentGrid.propTypes = {
  backgroundStyle: PropTypes.string,
  children: PropTypes.node
}

export default ContentGrid;
