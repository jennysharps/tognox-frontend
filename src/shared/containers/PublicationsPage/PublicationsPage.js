import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCitations, getCitations } from '../../ducks/citations/citations'
import { fetchPage, getPage } from '../../ducks/pages/pages'

import SEO from '../../components/SEO'
import WYSIWYG from '../../components/WYSIWYG'
import { getPathConfig } from '../../utils/pathUtils'

const { slug: publicationsSlug } = getPathConfig('publications');

const isRequiredDataAvailable = ({ years }) => !!years.length

export class Publications extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: isRequiredDataAvailable(props)
    }
  }

  async componentDidMount() {
    const { store } = this.context
    const { ready } = this.state

    if (!ready) {
      await Publications.fetchData(store)
      this.setState({ ready: true })
    }
  }

  renderCitations = (citations) => (
    citations.map(({ id, rendered }) => {
        return (
          <WYSIWYG
            content={rendered}
            key={id}
          />
        )
    })
  )

  renderCitationsByYear = () => {
    const { citations, years } = this.props;
    return years.map(year => {
      const citationsForYear = citations.filter(({ textYear }) => textYear === year)
      return citationsForYear.length
        ? [
          <h2 key={`year-${year}`}>{year}</h2>,
          this.renderCitations(citationsForYear)
        ]
        : null
    })
  }


  render () {
    const { ready } = this.state;
    const { seo } = this.props

    return (
      <div>
        {!ready && <p>Loading...</p>}
        <SEO {...seo} />
        <h2>Publications</h2>
        {this.renderCitationsByYear()}
      </div>
    )
  }
}

Publications.defaultProps = {
  seo: {
    title: 'Loading...'
  }
}

Publications.fetchData = async ({ dispatch }) => {
  await Promise.all([
    dispatch(fetchCitations()),
    dispatch(fetchPage(publicationsSlug))
  ])
}

Publications.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

Publications.propTypes = {
  citations: PropTypes.arrayOf(
    PropTypes.shape({
      rendered: PropTypes.string
    })
  ),
  seo: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string
  }),
  years: PropTypes.array
}

const mapStateToProps = ({ citations: citationsState, pages }) => {
  const citations = getCitations(citationsState)
  const { seo } = getPage(pages, publicationsSlug) || {}
  const years = Object.values(citations)
    .reduce((accumulatedYears, { textYear }) => {
      if (!accumulatedYears.includes(textYear)) {
        accumulatedYears.push(textYear)
      }
      return accumulatedYears;
    }, [])
    .sort((yearA, yearB) => yearB - yearA)

  return {
    citations,
    seo,
    years
  }
}

export default connect(mapStateToProps)(Publications)
