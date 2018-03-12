import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import ReactSlick from 'react-slick'
import './Carousel.scss'

class Carousel extends Component {
  state = {
    initialized: false
  }

  componentDidMount = () => {
    this.setState({ initialized: true }, () => {
      setTimeout(() => window.dispatchEvent(new Event('resize'), 0));
    })
  }

  render () {
    const { children, infinite, ...rest } = this.props;
    const { initialized } = this.state;
    const childrenToRender = children && children.length && !initialized ? children[0] : children;
    const infiniteScroll = infinite || (childrenToRender && childrenToRender.length);

    return (
      <ReactSlick
        dots={true}
        fade={true}
        infinite={infiniteScroll}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        {...rest}
      >
        {childrenToRender}
      </ReactSlick>
    )
  }
}

Carousel.propTypes = {
  children:PropTypes.node.isRequired
}

export default Carousel
