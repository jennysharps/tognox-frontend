import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchPage, getPage } from '../../ducks/pages'

import WYSISWG from '../../components/WYSIWYG'

const aboutSlug = 'about'

export class About extends React.Component {
  static fetchData = ({ dispatch }) => dispatch(fetchPage(aboutSlug))

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

About.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func
  })
}

About.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
}

const mapStateToProps = ({ pages }) => {
  const {
    content: contentPayload = {},
    title: titlePayload = {}
  } = getPage(pages, aboutSlug) || {}
  return {
    content: contentPayload.rendered,
    title: titlePayload.rendered
  }
}

export default connect(mapStateToProps)(About)
