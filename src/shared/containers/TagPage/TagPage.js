import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProjects, getProjectsByTag } from '../../ducks/projects/projects'
import { fetchResources, getResourcesByTag } from '../../ducks/resources/resources'
import { getTag } from '../../ducks/tags'
import { fetchTags } from '../../ducks/tags/tags'

import PageNotFoundPage from '../PageNotFoundPage'
import SEO from '../../components/SEO'
import WYSIWYG from '../../components/WYSIWYG'

const isRequiredDataAvailable = props => !!props.name

export class Tag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false
    }
  }

  async componentDidMount() {
    const { store } = this.context
    const props = this.props
    performance.mark('client side tags fetch start');
    await Tag.fetchData(store, props);
    this.setState({ ready: true }, () => {
      performance.mark('client side tags ready');
    });
    performance.measure(
      'Client side tags start data loading',
      'client side tags fetch start',
      'client side tags ready'
    );
  }

  renderItem = ({ id, title, excerpt, link }) => (
    <div key={id}>
      <Link to={link}>
        <h2>{title}</h2>
      </Link>
      <WYSIWYG content={excerpt}/>
    </div>
  )

  render () {
    const { items, name } = this.props;
    const { ready } = this.state;

    if (ready && !isRequiredDataAvailable(this.props)) {
      return (
        <PageNotFoundPage />
      )
    }

    return (
      <div>
        <SEO title={ready ? `Tag: ${name}` : 'Loading...'} />
        {!ready && <p>Loading...</p>}
        <h2>Items tagged <strong>{name}</strong></h2>
        {items.length
          ? items.map(item => this.renderItem(item))
          : <div>No projects found</div>
        }
      </div>
    )
  }
}

Tag.fetchData = async (
  { dispatch, getState },
  { match: { params: { tagSlug }} }
) => {
  await dispatch(fetchTags(tagSlug))
  const { id: tagId } = getTag(getState().tags, tagSlug) || {}
  const fetchArgs = { tags: [tagId] }

  await Promise.all([
    dispatch(fetchProjects(fetchArgs)),
    dispatch(fetchResources(fetchArgs))
  ])
}

Tag.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

Tag.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      excerpt: PropTypes.string,
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  match: PropTypes.shape({
    params: PropTypes.shape()
  }),
  name: PropTypes.string
}

const mapStateToProps = ({ tags, projects, resources }, { match: { params: { tagSlug }} }) => {
  const { name } = getTag(tags, tagSlug) || {}
  const items = [
    ...getProjectsByTag(projects, tagSlug),
    ...getResourcesByTag(resources, tagSlug)
  ].sort(({ date: dateA }, { date: dateB }) => (
    new Date(dateB).getTime() - new Date(dateA).getTime()
  ))

  return {
    items,
    name
  }
}

export default connect(mapStateToProps)(Tag)
