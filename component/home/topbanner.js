import React, { Component } from 'react';
import Slider from "react-slick";
import Image from 'next/image';
import sliderimg from '../../public/topbanner.png';

export class Topbanner extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        };
        return (
            <Slider {...settings} className='c-topbanner'>
                <div className='topbannerSlide'>
                    {/* <video
                        loop
                        autoPlay
                        src="/dewdrop.mp4" /> */}
                    <Image src={sliderimg} layout='responsive' />
                    <div className='contentdiv'>
                        <h4>Dew Drop</h4>
                        <h2>Special Moment</h2>
                    </div>
                </div>

              
                
                {/* <div>
                    <Image src={sliderimg} layout='responsive' />
                </div> */}
            </Slider>
        )
    }
}

export default Topbanner
