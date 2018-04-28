import React from 'react'
import { connect, withRouter } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export const ErrorPage = ({ status: { code } }) => (
  <div>
    <Helmet title="Error" />
    <h1>
      Error: {code}
    </h1>
    <a href="/">
      Go home
    </a>
    <a href="/a">
      Go somewhere that doesn't exist
    </a>
    <a href="/tag/abcde">
      Go somewhere that doesn't exist but matches a route
    </a>
  </div>
)

const mapStateToProps = ({ status }) => ({ status })

export default connect(mapStateToProps)(ErrorPage)
