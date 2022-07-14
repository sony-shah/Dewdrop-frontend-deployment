import React from 'react'
import Image from 'next/image';
import dewdropimg from '../../public/dewdrop.jpg'
import { urlObjectKeys } from 'next/dist/shared/lib/utils';

function Dewdrop() {
    return (
        <section className='c-dewdrop con-row'
            style={{

                backgroundImage: "url(/dewdrop.jpg)",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }} >

            {/* <Image src={dewdropimg} alt="background" layout='responsive'/> */}


            <div className='container'>

                <div>
                    <div className='sectionHeading'>
                        <h2>Dew Drops</h2>
                    </div>
                    <p>
                        'Dewdrop' is very small in its appearance but when we see and feel it, it gives a wow feeling and no matter what and we just stop for a moment and cherish it.<br/> <br/>

                        Similarly a bit of knowledge, however small it when shared as-lived (as self-experienced) always gives a wow experience. It creates new pattern in our brain leading to a new learning which we can adopt in our life, be it personal or professional/business.<br/> <br/>

                        Hence we are declaring a  ' bit-of-knowledge sharing ' initiative named 'Dewdrop' through which a Partner(which includes Only Partner and Partners in Listed Partner as well as Mentor role) can share knowledge received from his/her own experience with other Partners .
                    </p>
                </div>
            </div>


        </section>
    )
}

export default Dewdrop
