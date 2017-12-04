import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchProjects } from '../../ducks/projects'
import WYSIWYG from '../../components/WYSIWYG'

export class Projects extends React.Component {
  componentDidMount() {
    const store = this.context.store;
    Projects.fetchData(store)
  }

  renderProject = ({ id, title, excerpt }) => (
    <div key={id}>
      <h2>{title}</h2>
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
        {Object.values(projects)
          .map(project => this.renderProject(project))}
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
  projects: PropTypes.shape({
    excerpt: PropTypes.string,
    title: PropTypes.string
  })
}

const mapStateToProps = ({ projects }) => ({
  projects
})

export default connect(mapStateToProps)(Projects)
