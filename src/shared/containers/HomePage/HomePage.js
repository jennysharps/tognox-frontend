import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSettings } from '../../ducks/settings/settings'
import { fetchPage, getPage } from '../../ducks/pages'
import Carousel from '../../components/Carousel'
import ContentSection from '../../components/ContentSection'
import SEO from '../../components/SEO'

import profileImg from './media/francesco_avatar.jpg?sizes=250w'
import styles from './HomePage.scss'
import { getPathConfig } from '../../utils/pathUtils'
import WYSIWYG from '../../components/WYSIWYG/WYSIWYG'

const profileImgSrc = profileImg.sources['250w']

const { slug: aboutSlug } = getPathConfig('about')

const isRequiredDataAvailable = ({
  aboutTitle,
  carouselItems
}) => !!(aboutTitle && carouselItems && carouselItems.length)

export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: isRequiredDataAvailable(props)
    }
  }

  componentDidMount() {
    const store = this.context.store;
    Home.fetchData(store)
  }

  async componentDidMount() {
    const { ready } = this.state

    if (!ready) {
      const store = this.context.store;
      await Home.fetchData(store)
      this.setState({ ready: true })
    }
  }

  renderCarouselItem = ({
    description,
    id,
    title,
    imageMeta: { alt, url }
  }) => (
    <div key={id}>
      <img alt={alt} src={url} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )

  render () {
    const {
      aboutBlurb,
      carouselItems,
      description,
      quotation: {
        quote,
        attribution
      } = {},
      title,
      seo
    } = this.props;

    return (
      <div>
        <SEO {...seo} />
        <div className={styles.background} />
        <div className={styles.aboutWrapper}>
          <div className={styles.aboutTitleWrapper}>
            <h1 className={styles.title}>
              {title}
            </h1>
            <h2 className={styles.subtitle}>
              {description}
            </h2>
          </div>
        </div>
        <div className={styles.aboutWrapper}>
          <div className={styles.headShotWrapper}>
            <img
              className={styles.headShot}
              src={profileImgSrc}
            />
          </div>
          <div
            className={styles.aboutContent}
            style={{ maxWidth: '850px' }}
          >
            <Carousel className={styles.aboutCarousel}>
              <ContentSection
                columns={2}
                heading="About Me"
              >
                <WYSIWYG
                  className={styles.aboutBlurb}
                  content={aboutBlurb}
                />
              </ContentSection>
              <ContentSection
                columns={2}
                heading="About 2"
              >
                <WYSIWYG
                  className={styles.aboutBlurb}
                  content={aboutBlurb}
                />
              </ContentSection>
              <ContentSection
                columns={2}
                heading="About 3"
              >
                <WYSIWYG
                  className={styles.aboutBlurb}
                  content={aboutBlurb}
                />
              </ContentSection>
            </Carousel>
          </div>
        </div>
        {carouselItems && carouselItems.map(carouselItem => this.renderCarouselItem(carouselItem))}
        {quote && (
          <figure>
            <blockquote>
              <p>Quote: {quote}</p>
            </blockquote>
            <figcaption>{attribution}</figcaption>
          </figure>
        )}
      </div>
    )
  }
}

Home.fetchData = async ({ dispatch, getState }) => {
  const { frontpage } = getSettings(getState().settings)
  await Promise.all([
    dispatch(fetchPage(frontpage)),
    dispatch(fetchPage(aboutSlug))
  ])
}

Home.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

Home.defaultProp = {
  seo: {
    title: 'Loading...'
  }
}

Home.propTypes = {
  aboutBlurb: PropTypes.string,
  carouselItems: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      id: PropTypes.number,
      imageMeta: PropTypes.shape({
        alt: PropTypes.string,
        height: PropTypes.number,
        url: PropTypes.string,
        width: PropTypes.number
      }),
      title: PropTypes.string
    }),
  ),
  description: PropTypes.string,
  quotation: PropTypes.shape({
    quote: PropTypes.string,
    attribution: PropTypes.string
  }),
  title: PropTypes.string,
  seo: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string
  })
}

const mapStateToProps = ({ pages, settings }) => {
  const {
    frontpage,
    siteDescription,
    siteTitle
  } = getSettings(settings)
  const {
    carouselItems,
    quotation,
    seo
  } = getPage(pages, frontpage) || {}
  const {
    blurb: aboutBlurb,
    title: aboutTitle
  } = getPage(pages, aboutSlug) || {}

  return {
    aboutBlurb,
    carouselItems,
    description: siteDescription,
    quotation,
    seo,
    title: siteTitle
  }
}

export default connect(mapStateToProps)(Home)
