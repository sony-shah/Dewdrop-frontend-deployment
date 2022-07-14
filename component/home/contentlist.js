import Image from 'next/image';
// import React from 'react';
import contentImg from '../../public/content-img.jpg';
import viewicon from '../../public/icon-view.png';
import loveicon from '../../public/icon-love.png';
import commenticon from '../../public/icon-comment.png';
import propic from '../../public/propic.png'
import Link from 'next/link';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig'
import firebaseApp from '../../firebaseConfig'
import React, { useState, useEffect, useCallback } from 'react';




function Contentlist() {
    const [ContentData, setContentData] = useState([]);
    const [LoadingData, setLoadingData] = useState(true);

    useEffect(() => {


        // get all content 
        const getContent = async () => {
            setLoadingData(true)
            const q = query(collection(db, "ContentData"), orderBy('AdminCreatedby', 'desc'))

            onSnapshot(q, (snapshot) => {
                console.log("Task List", snapshot.docs);
                setContentData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setLoadingData(false)
            })
        };

        //   get all user data
        const getUserData = async () => {
            const data = await getDocs(collection(db, "UsersData"));
            setUserdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log("UsersData", Userdata);
          
        };
    


        getContent();
    }, []);

    return (
        <section className='c-contentList con-row'>
            <div className='container'>
                <div className='sectionHeading'>
                    <h2>#freshdewdrops</h2>
                </div>
            {LoadingData ? <div className='loader'> <span className="loader2"></span> </div>:

                <ul>
                    {ContentData && ContentData.slice(0, 3).map(cardData => {
                        console.log(ContentData);


                        return (
                            <li>
                                
                                    <div className='c-cardBox'>
                                        {/* <Image className='cardImg' src={contentImg} layout='responsive' /> */}

                                        <div className='cardImg'> <Link href={"dewdrops?vid=" + cardData.id + "&view=" + cardData.totalViews} as={"dewdrops?vid=" + cardData.id + "&view=" + cardData.totalViews}><a>{cardData.Thumbnail ? <img src={cardData.Thumbnail} /> : null}</a></Link></div>
                                        {/* <div className='cardImg'> <Link href={"dewdrops?vid=" + cardData.id + "&view" + cardData.totalViews} as={"dewdrops?vid=" + cardData.id + "&view" + cardData.totalViews}><a>{cardData.Thumbnail ? <img src={cardData.Thumbnail} /> : null}</a></Link></div> */}


                                        <div className='cardContent'>
                                            <ul>
                                                <li>
                                                    <abbr><Image src={viewicon} layout='responsive' /></abbr>
                                                    <p>{cardData.totalViews}</p>
                                                </li>
                                                <li>
                                                    <abbr><Image src={loveicon} width={34} height={30} layout='responsive' /></abbr>
                                                    <p>{cardData.totallike}</p>
                                                </li>
                                                <li>
                                                    <abbr><Image src={commenticon} layout='responsive' /></abbr>
                                                    <p>{cardData.comments.length}</p>
                                                </li>
                                            </ul>



                                            <div className='partnerPic'>
                                                <Link href={"profile/[profile]"} as={"profile/" + cardData.parternameId}><a><img src={cardData.lpProfile} layout='responsive' /></a></Link>
                                                {/* <img src={userdata.lpProfileimg}  /> */}
                                            </div>

                                            <div className='contentDetails'>
                                                <h4>{cardData.contentName}</h4>
                                                <p>{cardData.inputTag.map((tag) => <span>#{tag}</span>)}</p>
                                            </div>
                                        </div>

                                    </div>
                              
                            </li>

                        )
                    })}



                </ul>

            }
                {/* <ul>
                    <li>
                        <div className='c-cardBox'>
                            <Image className='cardImg' src={contentImg} layout='responsive' />
                            <div className='cardContent'>
                                <ul>
                                    <li>
                                        <abbr><Image src={viewicon} layout='responsive' /></abbr>
                                        <p>100</p>
                                    </li>
                                    <li>
                                        <abbr><Image src={loveicon} width={34} height={30} layout='responsive' /></abbr>
                                        <p>100</p>
                                    </li>
                                    <li>
                                        <abbr><Image src={commenticon} layout='responsive' /></abbr>
                                        <p>100</p>
                                    </li>
                                </ul>

                                <div className='partnerPic'>
                                    <Image src={propic} layout='responsive' />
                                </div>

                                <div className='contentDetails'>
                                    <h4>Content Name</h4>
                                    <p>#tag</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='c-cardBox'>
                            <Image className='cardImg' src={contentImg} layout='responsive' />
                            <div className='cardContent'>
                                <ul>
                                    <li>
                                        <abbr><Image src={viewicon} layout='responsive' /></abbr>
                                        <p>100</p>
                                    </li>
                                    <li>
                                        <abbr><Image src={loveicon} width={34} height={30} layout='responsive' /></abbr>
                                        <p>100</p>
                                    </li>
                                    <li>
                                        <abbr><Image src={commenticon} layout='responsive' /></abbr>
                                        <p>100</p>
                                    </li>
                                </ul>

                                <div className='partnerPic'>
                                    <Image src={propic} layout='responsive' />
                                </div>

                                <div className='contentDetails'>
                                    <h4>Content Name</h4>
                                    <p>#tag</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='c-cardBox'>
                            <Image className='cardImg' src={contentImg} layout='responsive' />
                            <div className='cardContent'>
                                <ul>
                                    <li>
                                        <abbr><Image src={viewicon} layout='responsive' /></abbr>
                                        <p>100</p>
                                    </li>
                                    <li>
                                        <abbr><Image src={loveicon} width={34} height={30} layout='responsive' /></abbr>
                                        <p>100</p>
                                    </li>
                                    <li>
                                        <abbr><Image src={commenticon} layout='responsive' /></abbr>
                                        <p>100</p>
                                    </li>
                                </ul>

                                <div className='partnerPic'>
                                    <Image src={propic} layout='responsive' />
                                </div>

                                <div className='contentDetails'>
                                    <h4>Content Name</h4>
                                    <p>#tag</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul> */}
                <Link href="/dewdrops"><a className="ctaLink">View all</a></Link>
            </div>
        </section>
    )
}

export default Contentlist
