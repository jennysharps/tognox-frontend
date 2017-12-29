import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPath } from '../../utils/pathUtils'
import { fetchProjects, getProjects } from '../../ducks/projects'

import SEO from '../../components/SEO'
import WYSIWYG from '../../components/WYSIWYG'

export class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false
    }
  }

  async componentDidMount() {
    const { store } = this.context
    await Projects.fetchData(store)
    this.setState({ ready: true })
  }

  renderProject = ({ id, title, excerpt, slug }) => (
    <div key={id}>
      <Link to={getPath('project', { slug })}>
        <h2>{title}</h2>
      </Link>
      <WYSIWYG content={excerpt}/>
    </div>
  )

  render () {
    const { projects } = this.props;
    const { ready } = this.state

    return (
      <div>
        <SEO title="Projects" />
        {!ready && <p>Loading...</p>}
        <h2>Projects</h2>
        {ready && projects && projects.map(project => this.renderProject(project))}
      </div>
    )
  }
}

Projects.fetchData = ({ dispatch }) => dispatch(fetchProjects())

Projects.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      excerpt: PropTypes.string,
      slug: PropTypes.string,
      title: PropTypes.string
    })
  )
}

const mapStateToProps = ({ projects }) => ({
  projects: getProjects(projects)
})

export default connect(mapStateToProps)(Projects)
