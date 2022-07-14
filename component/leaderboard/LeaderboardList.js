

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { auth } from '../../firebaseConfig'
import firebaseApp from '../../firebaseConfig'
import { signInWithPopup, OAuthProvider, getAuth, signOut } from 'firebase/auth';
import { collection, ref, push, addDoc, setDoc, doc, query, docs, getDocs, arrayUnion, getDoc, updateDoc, Timestamp, orderBy } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import propic from '../../public/propic.png'
import Link from 'next/link';
// import propic from '../../public/propic.png'
import sonali from '../../public/sonali-pic.png'
import minal from '../../public/minal-pic.png'
import abhishek from '../../public/abhishek-pic.png'
import sameer from '../../public/sameer-pic.png'
import jayesh from '../../public/jayesh-pic.png'
// import Link from 'next/link';

const db = getFirestore();
const authlog = getAuth();





function LeaderboardList() {
    const [ContentData, setContentData] = useState([]);

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

    return (
        <section className='c-leaderboard con-row'>
            <div className='container'>
                <div className='sectionHeading'>
                    <h2>Leader Board</h2>
                </div>

                <ul>

                    {ContentData && ContentData.sort((a, b) => b.totalCp - a.totalCp).map(cardData => {
                        // console.log(ContentData);


                        return (
                            <li>
                                <div className='partnerDetails'>
                                    <div className='partnerPic'>
                                        <img src={cardData.lpProfile} layout='responsive' />
                                    </div>
                                    <div className='nameDetails'>
                                        <h4><Link href={"profile/[profile]"} as={"profile/" + cardData.parternameId}><a>{cardData.partnerNamelp}</a></Link></h4>
                                        <p>{cardData.partnerDesig}</p>
                                    </div>
                                </div>
                                <div className='contentDetails'>
                                    <h3><Link href={"dewdrops?vid=" + cardData.id + "&view=" + cardData.totalViews} as={"dewdrops?vid=" + cardData.id + "&view=" + cardData.totalViews}><a>{cardData.contentName}</a></Link></h3>
                                </div>
                                <div className='points'>
                                    <h2>{cardData.totalCp}</h2>
                                </div>
                                 
                            </li>

                        )
                    })}

                    

                    {/* addmore list */}
                 
                </ul>
            </div>
        </section>
    )
}

export default LeaderboardList
