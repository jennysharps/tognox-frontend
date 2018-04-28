import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { loadStatus } from '../../ducks/status/status'

export class PageNotFoundPage extends Component {
  constructor(props) {
    super(props)
    const { status: { code }, setStatus } = props;
    if (code !== 404) {
      setStatus({ code: 404 })
    }
  }

  render () {
    return (
      <div>
        <Helmet title="Page Not Found" />
        <h1>
          Page not found
        </h1>
        <Link to="/">
          Go home
        </Link>
        <Link to="/a">
          Go somewhere that doesn't exist
        </Link>
        <Link to="/tag/abcde">
          Go somewhere that doesn't exist but matches a route
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ status }) => ({ status })

const mapDispatchToProps = ({
  setStatus: loadStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFoundPage)
