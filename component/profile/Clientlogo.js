import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Slider from "react-slick";
import clinetlogo from '../../public/logo-placeholder.jpg'

const Clientlogo = (props) => {


  console.log(props.data);

  // slick- slider

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

  };




  return (
    <section className='c-clientlogo con-row'>
      <div className='container'>
        <ul>
          {
            props.data && props.data.map((logo, i) => <li key={i}>


              <img src={logo} alt="images" layout='responsive' />


            </li>)
          }

        </ul>
        <Slider {...settings}>

          {
            props.data && props.data.map((logo, i) =>
              <div className='sickslider' key={i}>

                <img src={logo} alt="images" layout='responsive' />


              </div>
            )}


        </Slider>


      </div>

    </section>
  )
}

export default Clientlogo
