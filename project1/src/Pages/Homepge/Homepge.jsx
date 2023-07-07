import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import garage1 from './garage1.jpg'
import garage2 from './garage2.jpg'
import garage3 from './garage3.jpg'
import './HomepageStyle.css';
import OfferCard from '../../components/OfferCard';

export default function Homepge() {
  return (
    <>
    <div className="header" style={{padding:'20px 80px'}} >
    <table>
    <center>  
    {/* Carousel */}
      <tr>
        <td colSpan={5}>
          <div className="homepage">
            <hr size="20" color="white" width="100%"/>
            <Carousel fade interval={2000} style={{marginTop:"10vh"}}>
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
        </td>
 </tr>
  {/* Services */}
      <tr className='Row'>
        <td className='Servies' colSpan={5}>
          <p className='Heading'>SERVICES</p>
        </td>
      </tr>
      <tr className='middleRow'>
        <td>
        <div class="card">
          <p class="card-title">Product Name</p>
          <p class="small-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            veritatis nobis saepe itaque rerum nostrum aliquid obcaecati odio
            officia deleniti. Expedita iste et illum, quaerat pariatur consequatur
            eum nihil itaque!
          </p>
          <div class="go-corner">
            <div class="go-arrow">→</div>
          </div>
        </div>
        </td>
        <td>
        <div class="card">
          <p class="card-title">Product Name</p>
          <p class="small-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            veritatis nobis saepe itaque rerum nostrum aliquid obcaecati odio
            officia deleniti. Expedita iste et illum, quaerat pariatur consequatur
            eum nihil itaque!
          </p>
          <div class="go-corner">
            <div class="go-arrow">→</div>
          </div>
        </div>
        </td>
        <td>
        <div class="card">
          <p class="card-title">Product Name</p>
          <p class="small-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            veritatis nobis saepe itaque rerum nostrum aliquid obcaecati odio
            officia deleniti. Expedita iste et illum, quaerat pariatur consequatur
            eum nihil itaque!
          </p>
          <div class="go-corner">
            <div class="go-arrow">→</div>
          </div>
        </div>
        </td>
      </tr>
      <tr className='middleRow'> 
        <td>
        <div class="card">
          <p class="card-title">Product Name</p>
          <p class="small-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            veritatis nobis saepe itaque rerum nostrum aliquid obcaecati odio
            officia deleniti. Expedita iste et illum, quaerat pariatur consequatur
            eum nihil itaque!
          </p>
          <div class="go-corner">
            <div class="go-arrow">→</div>
          </div>
        </div>
        </td>
        <td>
        <div class="card">
          <p class="card-title">Product Name</p>
          <p class="small-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            veritatis nobis saepe itaque rerum nostrum aliquid obcaecati odio
            officia deleniti. Expedita iste et illum, quaerat pariatur consequatur
            eum nihil itaque!
          </p>
          <div class="go-corner">
            <div class="go-arrow">→</div>
          </div>
        </div>
        </td>
        <td>
        <div class="card">
          <p class="card-title">Product Name</p>
          <p class="small-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            veritatis nobis saepe itaque rerum nostrum aliquid obcaecati odio
            officia deleniti. Expedita iste et illum, quaerat pariatur consequatur
            eum nihil itaque!
          </p>
          <div class="go-corner">
            <div class="go-arrow">→</div>
          </div>
        </div>
        </td>
      </tr>     
      <tr className='Row'>
        <td colSpan={5}>
          <p className='Heading'>OFFERS</p>
        </td>
      </tr>
      </center> 
      </table>
      
        <div className='OfferCard' >
          <OfferCard/>
        </div>

    </div>  
    </>
  ) 
}
      
