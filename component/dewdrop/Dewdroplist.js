import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { auth } from '../../firebaseConfig'
import firebaseApp from '../../firebaseConfig'
import { signInWithPopup, OAuthProvider, getAuth, signOut } from 'firebase/auth';
import { collection, ref, push, addDoc, setDoc, doc, docs, getDocs, arrayUnion, getDoc, updateDoc, Timestamp, query, orderBy } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import Router from 'next/router';
import { useRouter } from "next/router";

import Link from 'next/link';

const db = getFirestore();
const authlog = getAuth();
// import commentcount from '../../public/icon-comment.png';

// dewdroplist images
import propic from '../../public/propic.png'
import intigrityimg from '../../public/intigrity.png'
import loveimg from '../../public/icon-love.png'
import propicimg from '../../public/propic.png'
import sendcommentimg from '../../public/sendcomment.png'
import logosmallimg from '../../public/tinylogo.png'
import logobigimg from '../../public/biglogo.png'
import shareimg from '../../public/share.png'
import showimg from '../../public/icon-view.png'
import commentcount from '../../public/icon-comment.png'
import DewdropPopup from './DewdropPopup';
import contentImg from '../../public/content-img.jpg';
import viewicon from '../../public/icon-view.png';
import loveicon from '../../public/icon-love.png';
// import { useRouter } from 'next/router'
// import { useLocation } from 'react-router-dom';

// import { useCallback } from 'react/cjs/react.development';
// import { useEffect } from 'react';

function Dewdroplist() {



    const [isOpen, setIsOpen] = useState(false);
    const [ContentData, setContentData] = useState([]);
    const [Userdata, setUserdata] = useState([]);
    const [singledata, setsingleData] = useState([]);
    const [totalview, settotalview] = useState([]);
    const [conloading, setconloading] = useState(true);
    const [directvid, setdirectvid] = useState("");
    const router = useRouter();
    const data = router.query.vid;
    const data1 = router.query.view;
    // setdirectvid(router.query.vid)

    console.log("props", router.query);
    console.log("props state", directvid);

    function openbox(item) {
        setIsOpen(item)
    }

    const HandlePoupDewdrop = (data,totalview) => {
        console.log("single data",totalview);
        setIsOpen(!isOpen);
        setsingleData(data);
        settotalview(+totalview);
        router.push(`?vid=${data}&view=${totalview}`, undefined, { shallow: true })

    }

    // const HandlePoupDewdrop2 = () => {
    //     console.log("test 2");
    //     const parameter = router.query;
    //     console.log("log", router.query);
    //     // // console.log("single data",data);
    //     // setIsOpen(!isOpen);
    //     // setdirectvid(urlquery);
    //     // router.push(`?vid=${data}`, undefined, { shallow: true })

    // }

    // const handleKeyDown=(e)=>{
    //     console.log('You pressed the escape key!')
    //     if(e.key === 'Enter'){
    //         console.log('You pressed the escape key!')
    //     }    
    // }

    // const handlevideo

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            console.log("esc pressed");
            setIsOpen(false);
            router.back()
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction);

        return () => {
            document.removeEventListener("keydown", escFunction);
        };
    }, [escFunction]);

    useEffect(() => {

        // get all content 
        const getContent = async () => {

           const q = query(collection(db, "ContentData"), orderBy('AdminCreatedby', 'desc'))

            onSnapshot(q, (snapshot) => {
                console.log("Task List", snapshot);
                setContentData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

            })

        };


        getContent();
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        console.log('DATA')
        console.log("DATA",data)
        if (data === undefined) {
            return
            console.log('UNDEFINE')
        }
        else{
            HandlePoupDewdrop(data, data1);
        }
        
    }, [router.isReady])

    return (
        <>
            <section className='c-contentList con-row'>
                <div className='container'>

                    <div className='sectionHeading'>
                        <h2>DewDrops</h2>
                    </div>

                    <ul>
                        {ContentData && ContentData.map(cardData => {
                            // console.log(ContentData);


                            return (
                                <li>
                                    <div className='c-cardBox'
                                        onClick={() => HandlePoupDewdrop(cardData.id, cardData.totalViews)}>
                                        {/* <Image className='cardImg' src={contentImg} layout='responsive' /> */}
                                        <div className='cardImg'> {cardData.Thumbnail === "" ? null : <img src={cardData.Thumbnail} />
                                        }</div>
                                        {/* <div className='cardImg'> <img src={cardData.Thumbnail} /></div> */}


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
                                                    <abbr><Image src={commentcount} layout='responsive' /></abbr>
                                                    <p>{cardData.comments.length}</p>
                                                </li>
                                            </ul>



                                            <div className='partnerPic'>
                                                <Link href={"profile/[profile]"} as={"profile/" + cardData.parternameId}><a><img src={cardData.lpProfile} /></a></Link>
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
                    {/* {ContentData?null:} */}

                    {/* <Link href="#"><a  className="ctaLink">View all</a></Link> */}

                </div>
                {/* {conloading === true ? <span class="loader2"></span> : null} */}
            </section>


            {/* dewdrop popup */}


            {isOpen &&

                <DewdropPopup openBox={openbox} totalview={totalview} condata={singledata} />

            }
            {/* {isOpen &&

                <DewdropPopup openBox={openbox} condata={singledata} />

            } */}

        </>
    )
}

export default Dewdroplist
