import React from 'react'
import Slider from "react-slick";
import Image from 'next/image';
import sliderimg from '../../public/ideaoriginator.png'

import Swal from 'sweetalert2';
const Gallary = (props) => {

    console.log(props.data);

     var settings = {
        dots: true,
        infinite: true,
        speed: 500, 
        slidesToShow: 1 ,
        slidesToScroll: 1,
         arrows: false,
         autoplay: true,
        autoplaySpeed: 3000,
          pauseOnHover: true,
        
    };

    const handleCarouselView=(gallaryimg)=>{
      Swal.fire({
        // title: 'Sweet!',
        // text: 'Modal with a custom image.',
        imageUrl: gallaryimg,
        imageWidth: "100%",
        // imageHeight:200,
       
        imageAlt: 'Custom image',
        })
    
    }

  return (
    <section className='p-gallary con-row'>
                 <div className='container'>
                   <div className='sectionHeading'>
                        <h3>Gallary</h3>
                   </div>
                    <Slider {...settings} >

               
                            {/* <ul className='sickslider'> */}
                            {
                                props.data && props.data.map((gallaryimg,i) =>
                          

                                     <div className='sickslider' key={i} onClick={() => handleCarouselView(gallaryimg)} >
                                        <img src={gallaryimg} alt="sick-images" layout='fixed'   />
                                    </div> 
                                //     <li key={i} >

                                //          <img src={gallaryimg} alt="-sick-images" layout='responsive'/>
                                   
                                //      </li>
                      

                                )}
                                
                               
                                 
                              
                            {/* </ul> */}
                           

        
                    </Slider>
                 </div>

            </section>
  )
}

export default Gallary