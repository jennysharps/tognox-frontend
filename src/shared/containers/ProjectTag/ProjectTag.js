import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchProjectsByTag, getProjectsByTag } from '../../ducks/projects'
import { getTag } from '../../ducks/tags'
import WYSIWYG from '../../components/WYSIWYG'

export class ProjectTag extends React.Component {
  componentDidMount() {
    const { store } = this.context
    const props = this.props
    ProjectTag.fetchData(store, props)
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

    return (
      <div className="App-intro">
        <p>
          Projects tagged <strong>{name}</strong>
        </p>
        <p>
          <Link to={`/`}>
            Home
          </Link>
        </p>
        {Object.keys(projects)
          .map(key => this.renderProject(projects[key]))}
      </div>
    )
  }
}

ProjectTag.fetchData = ({ dispatch }, { match: { params: { tagSlug }} }) =>
  dispatch(fetchProjectsByTag(tagSlug))

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
  projects: PropTypes.shape({
    excerpt: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string
  })
}

const mapStateToProps = ({ projects, tags }, { match: { params: { tagSlug }} }) => {
  const { name } = getTag(tags, tagSlug) || {}
  return {
    name,
    projects: getProjectsByTag(projects, tagSlug)
  }
}

export default connect(mapStateToProps)(ProjectTag)
