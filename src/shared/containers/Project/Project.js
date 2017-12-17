import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import WYSIWYG from '../../components/WYSIWYG'
import { fetchProject, getProject } from '../../ducks/projects/projects'

export class Project extends React.Component {
  componentDidMount() {
    const { store } = this.context
    const props = this.props
    Project.fetchData(store, props)
  }

  render () {
    const {
      citations,
      content,
      tags,
      title
    } = this.props;

    return (
      <div className="App-intro">
        <p>
          Projects page
        </p>
        <p>
          <Link to="/">
            Home
          </Link>
        </p>
        <div>
          <h2>{title}</h2>
          <WYSIWYG content={content}/>
        </div>
        {citations &&
          <div>
            Citations:
            {citations.map(({ id, rendered }) => (
              <WYSIWYG
                content={rendered}
                key={id}
              />
            ))}
          </div>
        }
        {tags &&
          <div>
            Tags:
            {tags.map(({ id, name, slug }) => (
              <Link to={`/tag/${slug}`} key={id}>
                {name}
              </Link>
            ))}
          </div>
        }
      </div>
    )
  }
}

Project.fetchData = ({ dispatch }, { match: { params: { projectSlug }} }) =>
  dispatch(fetchProject(projectSlug))

Project.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

Project.propTypes = {
  citations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      rendered: PropTypes.string
    })
  ),
  content: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape()
  }),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      slug: PropTypes.string
    }),
  ),
  title: PropTypes.string
}

const mapStateToProps = ({ projects }, { match: { params: { projectSlug }} }) => {
  const {
    citations,
    content,
    tags,
    title
  } = getProject(projects, projectSlug)
  return {
    citations,
    content,
    tags,
    title
  }
}

export default connect(mapStateToProps)(Project)
