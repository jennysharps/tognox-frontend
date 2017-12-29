import React from 'react'
import { Helmet } from 'react-helmet'
import fetch from 'isomorphic-fetch'

class Contact extends React.Component {
  state = {
    email: '',
    name: '',
    message: ''
  }

  onChange = field => e => {
    this.setState({ [field]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    const { email, name, message } = this.state
    fetch('/contact', {
      body: JSON.stringify({ email, name, message }),
      method: 'POST'
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(info => {
        console.log('success', info)
      }).catch((e) => {
        console.log('error:', e)
      })
  }

  render() {
    return (
      <div className="App-intro">
        <Helmet title="Contact" />
        <h2>Contact</h2>
        <p>Please enter your contact details and a short message below and I'll try to get back to you as soon as possible.</p>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              onChange={this.onChange('name')}
              placeholder="Your name"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              name="email"
              onChange={this.onChange('email')}
              placeholder="Your Email address"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              onChange={this.onChange('message')}
              placeholder="Your message"
              type="text"
            />
          </div>
          <input type="submit" value="Send Message" />
        </form>
      </div>
    )
  }
}

export default Contact
