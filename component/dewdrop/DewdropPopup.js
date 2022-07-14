import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { auth } from '../../firebaseConfig'
import firebaseApp from '../../firebaseConfig'
import { signInWithPopup, OAuthProvider, getAuth, signOut } from 'firebase/auth';
import { collection, ref, push, addDoc, setDoc, doc, query, docs, getDocs, arrayUnion, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { FiHeart, FiEye } from 'react-icons/fi';
import { BiCommentDetail } from 'react-icons/bi';
import Head from 'next/head'
import Link from 'next/link';
import Iframe from 'react-iframe'
const db = getFirestore();
const authlog = getAuth();
import Swal from 'sweetalert2';
import { FcLike } from 'react-icons/fc'
import { IoShareOutline } from 'react-icons/io5'
import Router from 'next/router';
import { useRouter } from "next/router";

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'next-share';

// dewdroplist images
import intigrityimg from '../../public/intigrity.png'
import loveimg from '../../public/icon-love.png'
import propicimg from '../../public/propic.png'
import sendcommentimg from '../../public/sendcomment.png'
import logosmallimg from '../../public/tinylogo.png'
import logobigimg from '../../public/biglogo.png'
import shareimg from '../../public/share.png'
import showimg from '../../public/icon-view.png'
import commentcount from '../../public/icon-comment.png'
import placeholdericon from '../../public/placeholder.jpeg'
import { async } from '@firebase/util';

// import React, { Component } from "react";
// import {useRouter} from "next/router";
// import Header from '../header'


function DewdropPopup(props) {
    const getSingleData = props.condata;
    const initialview = props.totalview;
    console.log(initialview);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState("Rajeev")
    const [servercoments, setServercoments] = useState([]);
    const [newcoments, setNewcoments] = useState([]);
    const [usercomments, setUsercomments] = useState("");
    const [contentLike, setcontentLike] = useState(false);
    const [TotalViews, setTotalViews] = useState(0);
    const usersCollectionRef = collection(db, "ContentData");
    const [LoadingData, setLoadingData] = useState(true);
    const [isShare, setisShare] = useState(false);
    const router = useRouter();
    const baseURL = "https://dewdrops.vercel.app/dewdrops?vid="

    function handleChange(event) {
        event.preventDefault();
        const LoginDetails = localStorage.getItem("userdetail");
        const UserDetail = JSON.parse(LoginDetails);
        if (!LoginDetails) {
            Swal.fire({
                position: 'middle',
                icon: 'warning',
                title: 'you need to login',
                showConfirmButton: true,
                showCancelButton: true,
                // timer: 1500,
            }).then((result) => {
                if (result.isConfirmed) {
                    //   Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    //   )
                    // router.push("/login?vid=" + getSingleData)
                    router.push(`/login?vid=${getSingleData}&view=${TotalViews}`, undefined, { shallow: true })
                }
            })

        } else {
            console.log("logindata", UserDetail.username);
            const userName = UserDetail.username;
            setNewcoments({ username: userName, usercomments: event.target.value, dateTime: "" })
            setUsercomments(event.target.value)
            console.log("Update Data", usercomments);
        }

    }

    const handleUpdateComments = async (comments) => {
        const LoginDetails = localStorage.getItem("userdetail");
        console.log("logindata", LoginDetails);

        if (!LoginDetails) {
            Swal.fire({
                title: 'you need to login first!',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Login!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    // )
                    router.push("/login?vid=" + getSingleData);
                }
            })

        } else {
            const userName = LoginDetails.username;
            console.log("comments", servercoments);
            setServercoments([...servercoments, newcoments])
            console.log("updated comments", servercoments);
            const userDoc = doc(db, "ContentData", getSingleData);
            //const newFields =  {comments: [...comments, servercoments]};
            await updateDoc(userDoc, {
                comments: arrayUnion(newcoments),
                totalCp: users.totalCp + 2
            });
            setUsercomments("")
            //await updateDoc(userDoc, newFields);
        }

    }

    const updateUser = async (totallike, totalCp) => {

        const LoginDetails = localStorage.getItem("userdetail");
        const UserDetail = JSON.parse(LoginDetails);


        if (!LoginDetails) {
            Swal.fire({
                position: 'middle',
                icon: 'warning',
                title: 'you need to login',
                showConfirmButton: true,
                showCancelButton: true,
                // timer: 1500,
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoadingData(true);
                    //   Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    //   )
                    Router.push("/login?vid=" + getSingleData)
                    //   history.push('/ticket-list')
                }
            })
        } else {

            const userName = UserDetail.username;
            console.log(userName);

            const userDoc = doc(db, "ContentData", getSingleData);
            const newFields = { totallike: totallike + 1, totalCp: totalCp + 1 };
            await updateDoc(userDoc, newFields);
            setcontentLike(true);
        }

    };


    const close = async () => {
        props.openBox(false);
        router.back();
    };
    const closeshare = async () => {
        setisShare(false)
    };
    const openshare = async () => {
        setisShare(true)
    };

    useEffect(() => {
        const getContent = async () => {
            console.log('serverside', getSingleData);
            const docRef = doc(db, "ContentData", getSingleData);
            const docSnap = await getDoc(docRef);
            await onSnapshot(doc(db, "ContentData", getSingleData), (doc) => {
                console.log("Current data: ", doc.data());
                setUsers(doc.data());
                setServercoments(doc.data().comments.reverse());
                setTotalViews(doc.data().totalViews);
                setLoadingData(false);

            });
            const userDoc = doc(db, "ContentData", getSingleData);
            const newFields = { totalViews: initialview + 1 };
            await updateDoc(userDoc, newFields);
        }

        // };
        getContent();
        // updateview();

    }, [])



    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('enter press here! ')
            handleUpdateComments()
        }
    }



    return (
        <>

            <Head>
                <title>{users.contentName}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={users.contDiscription} />
                <meta property="og:url" content={baseURL + users.id} />
                <meta property="og:image" content={users.Thumbnail} />
            </Head>

            <section className='c-dewdropdetails con-row'>
                {/* <div onClick={() => props.openBox(false)} className='bg-details'></div> */}
                <div onClick={() => close()} className='bg-details'></div>
                <div onClick={() => close()} className='closeicon'>X</div>

                {users ?
                    <div className='container'>

                        <div className='contentImg'>
                            {LoadingData ? <div className='loader'> <span className="loader2"></span> </div> :
                                <>
                                    {
                                        users.contentFormat === "Image" ? <img src={users.Thumbnail} alt="images" /> : <Iframe url={users.videoUrl}
                                            width="100%"
                                            height="550px"
                                            id="myId"
                                            className="myClassname"
                                            display="initial"
                                            position="relative" />
                                    }
                                </>
                            }

                        </div>


                        <div className='contentDetails'>

                            <div className='businessname'>
                                <div className='businessPic'>
                                    {
                                        users.lpProfile ? <img src={users.lpProfile} alt="images" width={50} height={50} layout='responsive' /> : null
                                    }
                                </div>
                                <div className='bName'>
                                    <h2><Link href={"profile/[profile]"} as={"profile/" + users.parternameId}><a>{users.partnerNamelp}</a></Link></h2>
                                    <h4>{users.partnerDesig}</h4>
                                </div>
                            </div>
                            <div className='commentSection'>
                                <div className='descrption'>
                                    <h2>{users.contentName}</h2>
                                    <h3>Description</h3>
                                    <p>{users.contDiscription}</p>
                                    <h6>{users.inputTag && users.inputTag.map((tag) => <span>#{tag}</span>)}</h6>

                                </div>
                                <h3>Comments</h3>
                                {users.comments && users.comments.slice(0).reverse().map((coment) => <div className='commentrow'>
                                    <div className='businessPic'>
                                        <Image src={placeholdericon} alt="images" layout='responsive' />
                                    </div>
                                    <div className='commentdetails'>

                                        <h2>{coment.username}</h2>
                                        <p>{coment.usercomments}</p>

                                    </div>
                                </div>)}
                                {users.comments === null ? <div className='commentrow nocoments'>You are the first to comment</div> : null}
                            </div>

                            <div className='entercomment'>

                                <div className='sharecontent'>
                                    <ul>
                                        {users.comments ? <li>
                                            <BiCommentDetail />
                                            <span>{users.comments.length}</span>
                                        </li> : null}
                                        <li>
                                            <button className='likebtn' disabled={contentLike} onClick={() => {
                                                updateUser(users.totallike, users.totalCp);
                                            }}> <FiHeart /></button>
                                            <span>{users.totallike}</span>

                                        </li>
                                        <li>
                                            <FiEye /> <span>{users.totalViews}</span>
                                        </li>
                                    </ul>

                                    <ul>
                                        <li>
                                        <button onClick={() => {
                                                openshare();
                                            }}><IoShareOutline /> </button>
                                            
                                        </li>
                                    </ul>

                                </div>

                                <div className='commentinput'>
                                    <input type="text"
                                        placeholder='Comments'
                                        value={usercomments}
                                        onChange={handleChange}
                                        onKeyPress={handleKeyPress}
                                    />
                                    {/* <button
                                        onClick={() => handleUpdateComments(newcoments)}>Update Coments</button> */}
                                    <button onClick={() => handleUpdateComments(users.comments)}> <Image src={sendcommentimg} alt="images" layout='fixed' /></button>
                                </div>
                            </div>


                        </div>
                    </div> : null

                }

            </section>
            {
                isShare?<section className='c-sharepop'>
                <div className='share-con'>
                <div onClick={() => closeshare()} className='closeicon'>X</div>
                    <ul><li><FacebookShareButton
                        url={baseURL + getSingleData}
                        quote={users.contDiscription}
                        // hashtag={"#`$users.contDiscription`"}
                    >
                        <FacebookIcon size={48} round />
                    </FacebookShareButton></li>
                        <li>
                            <TwitterShareButton
                                url={baseURL + getSingleData}
                                title={users.contentName}
                            >
                                <TwitterIcon size={48} round />
                            </TwitterShareButton>
                        </li>
                        <li>
                            <LinkedinShareButton url={baseURL + getSingleData}>
                                <LinkedinIcon size={48} round />
                            </LinkedinShareButton>
                        </li>
                        <li>
                            <WhatsappShareButton
                                url={baseURL + getSingleData}
                                title={users.contentName}
                                separator=":: "
                            >
                                <WhatsappIcon size={48} round />
                            </WhatsappShareButton>
                        </li>
                    </ul>
                </div>
            </section>:null
            }

        </>
    )
}

export default DewdropPopup

// export default withRouter(DewdropPopup);
