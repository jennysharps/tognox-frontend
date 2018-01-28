import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Parallax, Background } from 'react-parallax'

import bgImg from './media/landscape_banner.png?sizes=200w+520w+742w+945w+1132w+1400w'
import profileImg from './media/ID.png?sizes=250w'

import styles from './PageNotFound.scss'

const {
  sources: bgImgSources,
  srcSet: bgImgSrcSet
} = bgImg
const defaultBgImgSrc = bgImgSources['1400w']
const profileImgSrc = profileImg.sources['250w']

export const PageNotFound = (props, context = {}) => {
  if (context.setStatus) {
    context.setStatus(404)
  }

  return (
    <div>
      <Helmet title="Page Not Found" />
      <Parallax
        bgImage={defaultBgImgSrc}
        strength={150}
      >
        <div className={styles.aboutWrapper}>
          <h1 className={styles.aboutTitle}>
            Page not found
          </h1>
        </div>
      </Parallax>
      <div className={styles.aboutWrapper}>
        <h1 style={{ height: '250px' }}>Test</h1>
        <div className={styles.headShotWrapper}>
          <img
            className={styles.headShot}
            src={profileImgSrc}
          />
        </div>
      </div>
      <Parallax>
        <Background>
          <img src={defaultBgImgSrc} />
        </Background>
        <h1 style={{ height: '250px' }}>
          Page not found
        </h1>
        <Link to="/">
          Go home
        </Link>
      </Parallax>
    </div>
  )
}
PageNotFound.contextTypes = {
  setStatus: PropTypes.func
}

export default PageNotFound
