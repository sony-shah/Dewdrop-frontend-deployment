import React from 'react'

import Image from 'next/image';
import Head from 'next/head'
import mobileimg from '../../public/smartphone.png'
import sendingimg from '../../public/sending.png'
import approveimg from '../../public/approve.png'
import publishimg from '../../public/publishing.png'
import ujbuniversalimg from '../../public/universal.png';
import ideaoriginimg from '../../public/ideaoriginator.png';

function AboutUs() {
    return (
        <>
            <Head>
                <title>About Us</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="UJustBe is a space in which U come to Be Connect Grow live in a World of Happy Faces" />
            </Head>
            <section className='c-aboutus con-row'>
                <div className='container'>
                    <div className='sectionHeading'>
                        <h5>About Us</h5>

                        <h3>
                            UJustBe is a space in which U come to <span>Be</span>, <span>Connect</span> & <span>Grow</span> live in a World of Happy Faces
                        </h3>
                    </div>
                </div>

                <div className='aboutbanner'>
                    <Image src={ujbuniversalimg} alt="background" layout='responsive' />
                </div>

                <div className='container'>
                    <p>
                        UJustBe is a platform built on the belief of connecting people, by understanding their needs and enabling them to help / serve each other. It is a large community of people who aspire to grow in life by supporting each other in fulfilling their dreams and become successful.
                    </p>
                </div>
            </section>

            {/* Guideline section start here */}
            <section className='guidelines con-row'>
                <div className='container'>
                    <div className='sectionHeading'>
                        <h2>Guidelines</h2>
                    </div>

                    <div className='process'>
                        <h5>  Process  </h5>
                        <ul>
                            <li>
                                <div className='processimg'>
                                    <Image src={mobileimg} alt="images" layout='fixed' width={100} height={100} />
                                </div>
                                <h4>Create</h4>
                                <p>Record or write your as-lived experience & share</p>
                            </li>

                            <li>
                                <div className='processimg'>
                                    <Image src={sendingimg} alt="images" layout='fixed' width={100} height={100} />
                                </div>
                                <h4>Review</h4>
                                <p>Core team reviews the content's appropriateness</p>
                            </li>

                            <li>
                                <div className='processimg'>
                                    <Image src={approveimg} alt="images" layout='fixed' width={100} height={100} />
                                </div>
                                <h4>Approve</h4>
                                <p>Core team approves the content if it is appropriate</p>
                            </li>

                            <li>
                                <div className='processimg'>
                                    <Image src={publishimg} alt="images" layout='fixed' width={100} height={100} />
                                </div>
                                <h4>Publish</h4>
                                <p>The approved content is published on DewDrop site</p>
                            </li>
                        </ul>
                    </div>

                    <div className='guidelineContent'>
                        <h2>Guideline Content</h2>
                        <ul>
                            <li> Dew drop can be sent in the form of a message/audio/video or image format.</li>
                            <li>Content of the dew drop will be knowledge sharing of the skills you possess or the expertise you carry. </li>
                            <li>Length of the audio or video should not be more than a minute.</li>
                            <li>Size of the audio or video should not be more than 20mb.</li>
                            <li>Message should be not more than 150 words. </li>
                            <li>Dew drop shall be sent via whatsapp to the admin number on 9326062258.</li>
                            <li>The content will be verified by the UJustBe Event Team and will be posted in the UJustBe Groups.</li>
                            <li>UJustBe will post the dew drop on a daily/weekly basis depending on the number of dewdrops available with the team</li>
                        </ul>

                    </div>

                    <div className='uperfooterimg'>
                        <Image src={ideaoriginimg} alt="background" layout='responsive' priority="preload" />
                    </div>

                </div>

            </section>

        </>

    )
}

export default AboutUs
