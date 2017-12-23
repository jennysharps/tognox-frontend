import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WYSIWYG from '../../components/WYSIWYG'
import {
  fetchCitations,
  getCitations
} from '../../ducks/citations/citations'

export class Publications extends React.Component {
  componentDidMount() {
    const { store } = this.context
    Publications.fetchData(store)
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
      const citationsForYear = citations.filter(({ text_year }) => text_year === year)
      return citationsForYear.length
        ? [
          <h2 key={year}>{year}</h2>,
          this.renderCitations(citationsForYear)
        ]
        : null
    })
  }


  render () {
    return (
      <div className="App-intro">
        <p>
          Publications
        </p>
        {this.renderCitationsByYear()}
      </div>
    )
  }
}

Publications.fetchData = ({ dispatch }) => dispatch(fetchCitations())

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
  )
}

const mapStateToProps = ({ citations: citationsState }) => {
  const citations = getCitations(citationsState);
  const years = Object.values(citations)
    .reduce((accumulatedYears, { text_year }) => {
      if (!accumulatedYears.includes(text_year)) {
        accumulatedYears.push(text_year)
      }
      return accumulatedYears;
    }, [])
    .sort((yearA, yearB) => yearB - yearA)

  return {
    citations,
    years
  }
}

export default connect(mapStateToProps)(Publications)
