import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export const ErrorPage = ({ status: { code } }) => {
  return (
    <div>
      <Helmet title={code === 404 ? 'Not found' : 'Error'} />
      {code === 404
        ? (<div>Not Found</div>)
        : (<div>Error</div>)
      }
      <Link to="/">
        Go home
      </Link>
    </div>
  )
}

const mapStateToProps = ({ status }) => ({ status })

export default connect(mapStateToProps)(ErrorPage)
