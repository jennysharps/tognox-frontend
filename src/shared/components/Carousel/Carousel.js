import React  from 'react'
import PropTypes from 'prop-types'
import ReactSlick from 'react-slick'
import './Carousel.scss'

const Carousel = ({
  children,
  ...rest
}) => (
    <ReactSlick
      dots={true}
      fade={true}
      infinite={true}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      {...rest}
    >
      {React.Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </ReactSlick>
)

Carousel.propTypes = {
  children:PropTypes.node.isRequired
}

export default Carousel
