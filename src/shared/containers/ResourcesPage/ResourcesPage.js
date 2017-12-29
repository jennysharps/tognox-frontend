import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchResources, getResources } from '../../ducks/resources'

import SEO from '../../components/SEO'
import WYSIWYG from '../../components/WYSIWYG'

export class Resources extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false
    }
  }

  async componentDidMount() {
    const { store } = this.context
    await Resources.fetchData(store)
    this.setState({ ready: true })
  }

  renderResource = ({ id, title, excerpt, link }) => (
    <div key={id}>
      <Link to={link}>
        <h2>{title}</h2>
      </Link>
      <WYSIWYG content={excerpt}/>
    </div>
  )

  render () {
    const { resources } = this.props;
    const { ready } = this.state

    return (
      <div>
        <SEO title="Resources" />
        {!ready && <p>Loading...</p>}
        <h2>Resources</h2>
        {ready && resources && resources.map(resource => this.renderResource(resource))}
      </div>
    )
  }
}

Resources.fetchData = ({ dispatch }) => dispatch(fetchResources())

Resources.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

Resources.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      excerpt: PropTypes.string,
      link: PropTypes.string,
      slug: PropTypes.string,
      title: PropTypes.string
    })
  )
}

const mapStateToProps = ({ resources }) => ({
  resources: getResources(resources)
})

export default connect(mapStateToProps)(Resources)
