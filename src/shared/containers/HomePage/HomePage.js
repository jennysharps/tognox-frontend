import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getSettings } from '../../ducks/settings/settings'
import { fetchPage, getPage } from '../../ducks/pages'
import Carousel from '../../components/Carousel'
import ContentSection from '../../components/ContentSection'
import SEO from '../../components/SEO'

import profileImg from './media/francesco_avatar.jpg?sizes=250w'
import styles from './HomePage.scss'
import WYSIWYG from '../../components/WYSIWYG/WYSIWYG'
import { getPath } from '../../utils/pathUtils'

const profileImgSrc = profileImg.sources['250w']

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

  renderEducationItem = ({
    description,
    name,
    yearsAttended
  }, i) => (
    <div
      className={styles.item}
      key={`${name}-${i}`}
    >
      <h2 className={styles.name}>{name}</h2>
      <h3 className={styles.years}>{yearsAttended}</h3>
      <p>{description}</p>
    </div>
  )

  renderHobbyItem = ({ name, icon }, i) => (
    <div
      className={styles.item}
      key={`${name}-${i}`}
    >
      {icon &&
        <div className={styles.iconWrapper}>
          <img
            alt={name}
            className={styles.icon}
            src={icon}
          />
        </div>
      }
      <h2 className={styles.name}>{name}</h2>
    </div>
  )

  renderProjectItem = ({
    id,
    imageMeta: { url: imgUrl, ...restImg },
    link,
    title
  }) => (
    <Link
      className={styles.item}
      to={link}
      key={id}
    >
      <img
        src={imgUrl}
        {...restImg}
      />
      <h2>{title}</h2>
    </Link>
  )

  render () {
    const {
      aboutBlurb,
      carouselItems,
      description,
      education,
      hobbies,
      projects,
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
        <div className={styles.titleBackground} />
        <div className={styles.titleContentWrapper}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>
              {title}
            </h1>
            <h2 className={styles.subtitle}>
              {description}
            </h2>
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.headShotWrapper}>
            <img
              className={styles.headShot}
              src={profileImgSrc}
            />
          </div>
          <div
            className={styles.aboutContent}
          >
            <Carousel className={styles.aboutCarousel}>
              <div>
                <ContentSection
                  columns={2}
                  heading="About Me"
                >
                  <WYSIWYG
                    className={styles.aboutBlurb}
                    content={aboutBlurb}
                  />
                </ContentSection>
              </div>
              <div>
                <ContentSection heading="Education">
                  <div className={classnames(styles.fitContent, styles.aboutEducation)}>
                    {education && education.map(this.renderEducationItem)}
                  </div>
                </ContentSection>
              </div>
              <div>
                <ContentSection heading="Hobbies & Interests">
                  <div className={classnames(styles.fitContent, styles.aboutHobbies)}>
                    {hobbies && hobbies.map(this.renderHobbyItem)}
                  </div>
                </ContentSection>
              </div>
            </Carousel>
          </div>
        </div>
        <div className={classnames(styles.contentWrapper, styles.alternate)}>
          <div>
            <ContentSection
              className={styles.content}
              heading="Projects"
            >
              {projects && projects.map(this.renderProjectItem)}
            </ContentSection>
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <div>
            <ContentSection
              className={styles.content}
              heading="Skills"
            >
              <p>Stuff</p>
            </ContentSection>
          </div>
        </div>
        {carouselItems && carouselItems.map(this.renderCarouselItem)}
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
  await dispatch(fetchPage(frontpage))
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
  education: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      yearsAttended: PropTypes.string,
      description: PropTypes.string
    })
  ),
  hobbies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string
    })
  ),
  projects: PropTypes.arrayOf(
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
    relatedContent: {
      about = {},
      projects = []
    },
    seo
  } = getPage(pages, frontpage) || {}
  const {
    blurb: aboutBlurb,
    education,
    hobbies
  } = about

  return {
    aboutBlurb,
    carouselItems,
    description: siteDescription,
    education,
    hobbies,
    projects: projects.map(({
      id,
      imageMeta,
      postName: slug,
      postTitle: title
    }) => ({ id, imageMeta, link: getPath('project', { slug }), title })),
    quotation,
    seo,
    title: siteTitle
  }
}

export default connect(mapStateToProps)(Home)
