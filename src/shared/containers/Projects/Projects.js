import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchProjects, getProjects } from '../../ducks/projects'
import WYSIWYG from '../../components/WYSIWYG'

export class Projects extends React.Component {
  componentDidMount() {
    const store = this.context.store
    Projects.fetchData(store)
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
    const { projects } = this.props;

    return (
      <div className="App-intro">
        <p>
          Projects page
        </p>
        <p>
          <Link to={`/`}>
            Home
          </Link>
        </p>
        {projects && projects.map(project => this.renderProject(project))}
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
  projects: PropTypes.arrayOf([
    PropTypes.shape({
      excerpt: PropTypes.string,
      slug: PropTypes.string,
      title: PropTypes.string
    })
  ])
}

const mapStateToProps = ({ projects }) => ({
  projects: getProjects(projects)
})

export default connect(mapStateToProps)(Projects)
