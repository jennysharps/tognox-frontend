import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSettings } from '../../ducks/settings/settings'
import { fetchPage, getPage } from '../../ducks/pages'

import SEO from '../../components/SEO'

export class Home extends React.Component {
  componentDidMount() {
    const store = this.context.store;
    Home.fetchData(store)
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
      carouselItems,
      quotation: {
        quote,
        attribution
      } = {},
      seo
    } = this.props;

    return (
      <div>
        <SEO {...seo} />
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
  quotation: PropTypes.shape({
    quote: PropTypes.string,
    attribution: PropTypes.string
  }),
  seo: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string
  })
}

const mapStateToProps = ({ pages, settings }) => {
  const { frontpage } = getSettings(settings)
  const {
    carouselItems,
    quotation,
    seo
  } = getPage(pages, frontpage) || {}

  return {
    carouselItems,
    quotation,
    seo
  }
}

export default connect(mapStateToProps)(Home)
