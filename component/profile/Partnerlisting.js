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

function Partnerlisting() {

    const [isOpen, setIsOpen] = useState(false);
    const [ContentData, setContentData] = useState([]);
    const [Userdata, setUserdata] = useState([]);
    const [singledata, setsingleData] = useState([]);
    const [conloading, setconloading] = useState(true);
    const [directvid, setdirectvid] = useState("");
    const [LoadingData, setLoadingData] = useState(true);
    const router = useRouter();


    useEffect(() => {

        // get all content 
        const getContent = async () => {

            const q = query(collection(db, "UsersData"), orderBy('userCreatedby', 'desc'))

            onSnapshot(q, (snapshot) => {
                console.log("Task List", snapshot);
                setContentData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setLoadingData(false);
            })

        };


        getContent();
    }, []);

    return (
        <section className='c-contentList con-row'>
            <div className='container'>

                <div className='sectionHeading'>
                    <h2>Orbiters</h2>
                </div>

                {LoadingData ? <div className='loader'> <span className="loader2"></span> </div> :

                    <ul>
                        {ContentData && ContentData.map(cardData => {
                            console.log(ContentData);


                            return (
                                <li>
                                    <div className='c-cardBox profilelist'>
                                        {/* <Image className='cardImg' src={contentImg} layout='responsive' /> */}
                                        <div className='cardImg'> {cardData.lpProfileimg === "" ? null : <Link href={"profile/[profile]"} as={"profile/" + cardData.id}><a><img src={cardData.lpProfileimg} /></a></Link>
                                        }</div>
                                        {/* <div className='cardImg'> <img src={cardData.Thumbnail} /></div> */}


                                        <div className='cardContent'>

                                            <div className='contentDetails'>
                                                <h4><Link href={"profile/[profile]"} as={"profile/" + cardData.id}><a>{cardData.partnerName}</a></Link></h4>
                                                <p>{cardData.PartnerType}</p>
                                            </div>
                                        </div>

                                    </div>
                                </li>

                            )
                        })}



                    </ul>
                }
                {/* {ContentData?null:} */}

                {/* <Link href="#"><a  className="ctaLink">View all</a></Link> */}

            </div>
            {/* {conloading === true ? <span class="loader2"></span> : null} */}
        </section>
    )
}

export default Partnerlisting