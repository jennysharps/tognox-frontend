import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getSettings } from '../../ducks/settings/settings'
import { fetchPage, getPage } from '../../ducks/pages'
import Carousel from '../../components/Carousel'
import GridItem from '../../components/GridItem'
import ContentSection from '../../components/ContentSection'
import ContentWrapper from '../../components/ContentWrapper'
import SEO from '../../components/SEO'

import profileImg from './media/francesco_avatar.jpg'
import WYSIWYG from '../../components/WYSIWYG/WYSIWYG'
import ContentGrid from '../../components/ContentGrid'
import IconGridContent from '../../components/IconContentGrid'
import { getPath } from '../../utils/pathUtils'

import styles from './HomePage.scss'

const isRequiredDataAvailable = ({
  aboutBlurb,
  carouselItems
}) => !!(aboutBlurb && carouselItems && carouselItems.length)

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

  renderProjectItem = ({ id, imageMeta, link, title }) => (
    <GridItem
      key={id}
      backgroundImg={imageMeta}
      link={link}
    >
      <h2>{title}</h2>
    </GridItem>
  )

  renderSkillItem = ({ name, proficiency }, i) => (
    <div key={`${name}-${i}`}>
      <h2>{name}</h2>
      <h3>{proficiency}</h3>
    </div>
  )

  render () {
    const { ready } = this.state;
    const {
      aboutBlurb,
      description,
      education,
      hobbies,
      projects,
      quotation: {
        quote,
        attribution
      } = {},
      title,
      seo,
      skills
    } = this.props;

    return (
      <div>
        <SEO {...seo} loading={!ready} />
        <div className={styles.titleBackground} />
        <ContentWrapper className={styles.titleContentWrapper}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>
              {title}
            </h1>
            <h2 className={styles.subtitle}>
              {description}
            </h2>
          </div>
        </ContentWrapper>
        <ContentWrapper>
          <div className={styles.headShotWrapper}>
            <img
              alt="Francesco Tonini"
              className={styles.headShot}
              src={profileImg}
            />
          </div>
          <div className={styles.aboutContent}>
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
                <IconGridContent
                  heading="Hobbies & Interests"
                  content={hobbies}
                />
              </div>
            </Carousel>
          </div>
        </ContentWrapper>
        <ContentWrapper alternate>
          <div>
            <ContentSection
              className={styles.projects}
              heading="Projects"
            >
              <ContentGrid>
                {projects && projects.map(this.renderProjectItem)}
              </ContentGrid>
            </ContentSection>
          </div>
        </ContentWrapper>
        <ContentWrapper>
          <div>
            <ContentSection
              className={styles.content}
              heading="Skills"
            >
              <ContentGrid>
                {skills && skills.map(this.renderSkillItem)}
              </ContentGrid>
            </ContentSection>
          </div>
        </ContentWrapper>
        {quote && (
          <ContentWrapper alternate>
            <figure>
              <blockquote>
                <p>Quote: {quote}</p>
              </blockquote>
              <figcaption>{attribution}</figcaption>
            </figure>
          </ContentWrapper>
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
      imageMeta: PropTypes.shape({
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
  }),
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      proficiency: PropTypes.string
    })
  ),
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
    } = {},
    seo
  } = getPage(pages, frontpage) || {}
  const {
    blurb: aboutBlurb,
    education,
    hobbies,
    skills
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
    skills,
    title: siteTitle
  }
}

export default connect(mapStateToProps)(Home)
