import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchResource, getResource } from '../../ducks/resources'

import PageNotFoundPage from '../../containers/PageNotFoundPage'
import WYSIWYG from '../../components/WYSIWYG'
import SEO from '../../components/SEO'

const isRequiredDataAvailable = props => props.title

export class Resource extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: isRequiredDataAvailable(props)
    }
  }

  async componentDidMount() {
    const { store } = this.context
    const props = this.props
    const { ready } = this.state

    if (!ready) {
      await Resource.fetchData(store, props)
      this.setState({ ready: true })
    }
  }

  render () {
    const {
      content,
      seo,
      title,
      type
    } = this.props;
    const { ready } = this.state

    if (ready && !isRequiredDataAvailable(this.props)) {
      return (
        <PageNotFoundPage />
      )
    }

    return (
      <div>
        <SEO {...seo} />
        {!ready && <p>Loading...</p>}
        <div>
          <h2>{title} (type: {type})</h2>
          <WYSIWYG content={content}/>
        </div>
      </div>
    )
  }
}

Resource.fetchData = ({ dispatch }, { match: { params: { resourceSlug }} }) =>
  dispatch(fetchResource(resourceSlug))

Resource.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

Resource.defaultProps = {
  seo: {
    title: 'Loading...'
  }
}

Resource.propTypes = {
  content: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape()
  }),
  seo: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string
  }),
  title: PropTypes.string,
  type: PropTypes.string
}

Resource.defaultProps = {
  seo: {
    title: 'Loading...'
  }
}

const mapStateToProps = ({ resources }, { match: { params: { resourceSlug }} }) => {
  const {
    content,
    seo,
    title,
    templateType: type
  } = getResource(resources, resourceSlug)

  return {
    content,
    seo,
    title,
    type
  }
}

export default connect(mapStateToProps)(Resource)
