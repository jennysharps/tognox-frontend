import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { fetchProjectsByTag, getProjectsByTag } from '../../ducks/projects'
import { getTag } from '../../ducks/tags'
import PageNotFoundPage from '../PageNotFoundPage'
import WYSIWYG from '../../components/WYSIWYG'

const isRequiredDataAvailable = props => !!props.name

export class ProjectTag extends React.Component {
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
      await ProjectTag.fetchData(store, props)
      this.setState({ ready: true })
    }
  }

  renderProject = ({ id, title, excerpt, slug }) => (
    <div key={id}>
      <Link to={`/projects/${slug}`}>
        <h2>{title}</h2>
      </Link>
      <WYSIWYG content={excerpt}/>
    </div>
  )

  render () {
    const { name, projects } = this.props;
    const { ready } = this.state;

    if (!ready) {
      return (
        <div>
          <Helmet title="Loading..." />
          <p>Loading...</p>
        </div>
      )
    }

    if (!isRequiredDataAvailable(this.props)) {
      return (
        <PageNotFoundPage />
      )
    }

    return (
      <div>
        <Helmet title={`Tag: ${name}`} />
        <p>
          Projects tagged <strong>{name}</strong>
        </p>
        {projects.length
          ? projects.map(project => this.renderProject(project))
          : <div>No projects found</div>
        }
      </div>
    )
  }
}

ProjectTag.fetchData = async ({ dispatch }, { match: { params: { tagSlug }} }) =>
  await dispatch(fetchProjectsByTag(tagSlug))

ProjectTag.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

ProjectTag.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape()
  }),
  name: PropTypes.string,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      excerpt: PropTypes.string,
      slug: PropTypes.string,
      title: PropTypes.string
    })
  )
}

const mapStateToProps = ({ projects, tags }, { match: { params: { tagSlug }} }) => {
  const { name } = getTag(tags, tagSlug) || {}
  return {
    name,
    projects: getProjectsByTag(projects, tagSlug)
  }
}

export default connect(mapStateToProps)(ProjectTag)
