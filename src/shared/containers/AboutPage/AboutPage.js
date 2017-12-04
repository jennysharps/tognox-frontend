import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchPage, getPage } from '../../ducks/pages'

import WYSISWG from '../../components/WYSIWYG'

export class About extends React.Component {
  componentDidMount() {
    const store = this.context.store;
    About.fetchData(store)
  }

  render () {
    const { content } = this.props;

    return (
      <div className="App-intro">
        <p>
          About page
        </p>
        <p>
          <Link to={`/`}>
            Home
          </Link>
        </p>
        <p>
          <Link to={`/aljlskaklksdkfaj falsflasd`}>
            Go to non-existent page
          </Link>
        </p>
        <WYSISWG content={content} />
      </div>
    )
  }
}

About.fetchData = ({ dispatch }) => dispatch(fetchPage(About.slug))

About.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

About.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
}

About.slug = 'about'

const mapStateToProps = ({ pages }) => {
  const {
    content,
    title
  } = getPage(pages, About.slug) || {}
  return {
    content,
    title
  }
}

export default connect(mapStateToProps)(About)
