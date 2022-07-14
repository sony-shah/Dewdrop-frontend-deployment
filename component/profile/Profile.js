import React, { useState, useEffect, useCallback, Component } from 'react';
import Image from 'next/image';
import { auth } from '../../firebaseConfig'
import firebaseApp from '../../firebaseConfig'
import { signInWithPopup, OAuthProvider, getAuth, signOut } from 'firebase/auth';
import { collection, ref, push, addDoc, setDoc, doc, docs, getDocs, arrayUnion, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import Router from 'next/router';
import Link from 'next/link';
import Iframe from 'react-iframe';
import Head from 'next/head'
import Clientlogo from './Clientlogo';
import Slider from "react-slick";

import sliderimg from '../../public/ideaoriginator.png'

// images
import ujbuniversalbgimg from '../../public/universalbg.png';

import integrityimg from '../../public/intigrity.png'
import bigprofileimg from '../../public/bigprofile.png'
import profilelogoimg from '../../public/profilelogo.png'
import imageplaceholder from '../../public/imageplace.png'
import gallaryimgone from '../../public/gallary1.webp'
import ujustbedownloadimg from '../../public/appdownload.jpeg'
import umeetimg from '../../public/sliders.png'

import Gallary from './Gallary';

const db = getFirestore();
const authlog = getAuth();


function Profile(props) {
    // console.log("inprofile", props.data);
    const [users, setUsers] = useState([]);

    // var settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //      arrows: true,

    // };

    // const handleOpenApp=()=>{
    //     Router.push("http://umeet.ujustbe.com/");


    // }
    // const handleOpenUmeet=()=>{

    // }

    useEffect(() => {
        const getContent = async () => {
            // console.log('serverside', getSingleData);
            const docRef = doc(db, "UsersData", props.data);
            const docSnap = await getDoc(docRef);
            await onSnapshot(doc(db, "UsersData", props.data), (doc) => {
                console.log("Current data: ", doc.data());
                setUsers(doc.data());

            });

            console.log(users.Clientlogo);
            // setcontentLike(true)

            // setNewcoments({ username: currentUser, usercomments: "", dateTime: "" })
        }

        getContent();
        // return () => {
        //     cleanup
        // }
    }, [])

    return (
        <>

            <Head>
                <title>{users.businessName}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={users.businessName} />
                {/* <meta property="og:url" content={baseURL + users.id} /> */}
                <meta property="og:image" content={users.Thumbnail} />
            </Head>
            {/* lp profile start here */}

            <section className='p-profile profile-banner'

                style={{

                    backgroundImage: "url(/universalbg.png)",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                {/* <Image src={ujbuniversalbgimg} alt="" layout="fixed" ></Image> */}

                <div className='container'>
                    <div className='profileDetails'>
                        {users.PartnerType === "ListedPartner" ?
                            <div className='businesslogo'>
                                <img src={users.businessLogo} alt="images" layout='fixed' />
                            </div> : null
                        }


                        <h1>{users.partnerName}</h1>
                        <h4>{users.PartnerType}</h4>
                        {users.PartnerType === "ListedPartner" ? <h3>Founder: {users.businessName}</h3> : null}
                        {users.PartnerType === "ListedPartner" ? <h2>Business Category: {users.BusinessCategory} </h2> : null}
                        <p>{users.businessDetail}</p>
                    </div>

                    {/* largelp profile picture */}
                    {users.lpProfileimg && <div className='profileImg'>

                        <img src={users.lpProfileimg} alt="images" layout='responsive' />

                    </div>}


                </div>


            </section>

            {/* lp profile start here */}

            {/* client logo start here */}
            {users.PartnerType === "ListedPartner" ?
                <Clientlogo data={users.clientLogo} /> : null}


            {/* ourusp start here  */}

            <section className='p-profile ourusp con-row'>
                <div className='container'>
                    <div className='uspDetails'>
                        <div className='sectionHeading'>
                            <h3>Our USP</h3>
                        </div>
                        <div className='usp-content' dangerouslySetInnerHTML={{ __html: users.lpUsp }}></div>

                    </div>

                    {users.videoUrl &&
                        <div className='businessvideo'>
                            <iframe src={users.videoUrl} height={350} width="100%" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    }
                </div>

            </section>


            {/* {users.PartnerType === "ListedPartner" ? */}
            { users.services && users.services.length !== 0 ?
                <section className='p-profile services-products con-row bgColor'>
                    <div className='container'>

                        <div className='sectionHeading'>
                            <h3>Our Services</h3>
                        </div>
                        <ul className='content-card-data'>
                            {
                                users.services && users.services.map((data) => <li className='list-contentcard'>
                                    <div className='profile-content-card'>
                                        <img src={data.serviceImg} alt="images" />
                                    </div>
                                    <h4>{data.serviceName}</h4>
                                    <p dangerouslySetInnerHTML={{ __html: data.serviceDisc }}></p>
                                </li>)
                            }
                        </ul>
                    </div>
                </section>:null}
                {/* : null} */}

            {/*product start here */}
            {/* {users.products.length > 0 ? */}
            { users.products && users.products.length !== 0 ?
                <section className='p-profile services-products con-row'>
                    <div className='container'>
                        <div className='sectionHeading'>
                            <h3>Our Products</h3>
                        </div>
                        <ul className='content-card-data'>
                            {
                                users.products && users.products.map((data) => <li className='list-contentcard'>
                                    <div className='profile-content-card'>
                                        <img src={data.productsImg} alt="images" />
                                    </div>
                                    <h4>{data.productsName}</h4>
                                    <p dangerouslySetInnerHTML={{ __html: data.productsDisc }}></p>
                                </li>)
                            }
                        </ul>
                    </div>
                </section> :null 
             }


            {/* gallary */}
            { users.gallary && users.gallary.length !== 0 ?
            <Gallary data={users.gallary} />
             :null}
            {/* {users.PartnerType === "ListedPartner" ?
           <section className='p-gallary con-row'>
                 <div className='container'>
                    <Slider {...settings} >

               
                            <ul className='sickslider'>
                            {
                                users.gallary && users.gallary.map((gallaryimg) =>
                                    console.log(gallaryimg),
                                    <li>
                                 
                                
                                   
                                </li>

                                )
                            }
                                
                              
                              
                            </ul>
                          

        
                    </Slider>
                 </div>

            </section>
                : null} */}

            {/* umeet  */}

            <section className='p-gallary con-row'>
                <div className='container'>

                    <ul className='umeet-main'>
                        <li>
                            <div className='umeet-img' >
                                <a target="_blank" href="http://umeet-ujustbe.vercel.app/" ><img src="/sliders.png" layout='fixed' /></a>
                            </div>
                            <div className='umeet-img'  >
                                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.app.ujustbe"><img src="/appdownload.jpeg" layout='fixed' /></a>
                            </div>


                        </li>


                    </ul>

                </div>

            </section>



            {/* href="http://umeet.ujustbe.com/" */}
            {/* */}



        </>
    )
}

export default Profile
{/* <div className='profiledetails'> 
<span></span> 
<h4>partner</h4>
<h1>Suraj Sawant</h1>
<h3>Founder: The Rectangle</h3>
<h2>Business Category: IT and Digital Marketing </h2>
<p>Alliance Is A Reliable Importer, Distributor and Indenter For Raw Materials and Fine Chemicals Used In<br/>
Food, Pharmaceuticals, Bulk Drugs, Construction, Flavor and Fragrance Industry. We Are Also Direct <br/>
Agents For India, Representing Leading Chemical Manufacturers From Different Parts Of The World.</p>

</div> */}