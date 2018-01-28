import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProject, getProject } from '../../ducks/projects/projects'
import { getPath } from '../../utils/pathUtils'

import PageNotFoundPage from '../../containers/PageNotFoundPage'
import SEO from '../../components/SEO'
import WYSIWYG from '../../components/WYSIWYG'

const isRequiredDataAvailable = props => !!props.title

export class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false
    }
  }

  async componentDidMount() {
    const { store } = this.context
    await Project.fetchData(store, this.props)
    this.setState({ ready: true })
  }

  render () {
    const {
      citations,
      content,
      seo,
      tags,
      title
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
        <h2>{title}</h2>
        <WYSIWYG content={content}/>
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
              <Link
                key={id}
                to={getPath('tag', { slug })}
              >
                {name}
              </Link>
            ))}
            <Link to={getPath('tag', { slug: 'fake' })}>
              Fake
            </Link>
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

Project.defaultProps = {
  seo: {
    title: 'Loading...'
  }
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
  seo: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string
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
    seo,
    tags,
    title
  } = getProject(projects, projectSlug) || {}

  return {
    citations,
    content,
    seo,
    tags,
    title
  }
}

export default connect(mapStateToProps)(Project)
