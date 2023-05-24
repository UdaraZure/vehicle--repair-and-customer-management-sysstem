import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import garage1 from './garage1.jpg'
import garage2 from './garage2.jpg'
import garage3 from './garage3.jpg'

export default function Homepge() {
  return (
    <div style={{padding:'20px 80px'}}>
      <Carousel fade interval={2000}>
      <Carousel.Item>
      <img
        className="d-block w-100"
        src={garage1}
        alt=""
      />
      <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={garage2}
          alt=""
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={garage3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>
    </div> 
  )
}
