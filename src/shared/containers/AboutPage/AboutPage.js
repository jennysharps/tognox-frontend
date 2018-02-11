import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPage, getPage } from '../../ducks/pages'

import SEO from '../../components/SEO'
import WYSISWG from '../../components/WYSIWYG'
import { getPathConfig } from '../../utils/pathUtils'

const { slug: aboutSlug } = getPathConfig('about');

const isRequiredDataAvailable = ({ title }) => !!title

export class About extends React.Component {
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
      await About.fetchData(store)
      this.setState({ ready: true })
    }
  }

  render () {
    const { content, seo, title } = this.props
    const { ready } = this.state

    return (
      <div className="App-intro">
        <SEO {...seo} />
        {!ready && <p>Loading...</p>}
        <h2>{title}</h2>
        <WYSISWG content={content} />
      </div>
    )
  }
}

About.fetchData = ({ dispatch }) => dispatch(fetchPage(aboutSlug))

About.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

About.defaultProps = {
  seo: {
    title: 'Loading...'
  }
}

About.propTypes = {
  content: PropTypes.string,
  seo: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string
  }),
  title: PropTypes.string,
}

const mapStateToProps = ({ pages }) => {
  const {
    content,
    seo,
    title
  } = getPage(pages, aboutSlug) || {}

  return {
    content,
    seo,
    title
  }
}

export default connect(mapStateToProps)(About)
