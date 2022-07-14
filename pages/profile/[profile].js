import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { auth } from '../../firebaseConfig'
import firebaseApp from '../../firebaseConfig'
import { signInWithPopup, OAuthProvider, getAuth, signOut } from 'firebase/auth';
import { collection, ref, push, addDoc, setDoc, doc, docs, getDocs, arrayUnion, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import Router from 'next/router';
import Link from 'next/link';
import Iframe from 'react-iframe'
const db = getFirestore();
const authlog = getAuth();

import Profile from '../../component/profile/Profile'
import Footer from '../../component/footer'
import Enquiry from '../../component/global/enquiry'
import Header from '../../component/header'
import Quantumleap from '../../component/home/quantumleap'
// import Gallary from '../../component/profile/Gallary';

function Profiledetails({profileid}) {
    const proid = profileid.profile;
    console.log("taskid:",proid);


    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState("Soni")
    const [servercoments, setServercoments] = useState([]);
    const [newcoments, setNewcoments] = useState([]);
    const [usercomments, setUsercomments] = useState("");
    const [contentLike, setcontentLike] = useState(false);
    const [TotalViews, setTotalViews] = useState(0);
    const usersCollectionRef = collection(db, "UsersData");
    const getSingleData = proid;

    


    return (
        <>
        <Header/>
        <Profile data={proid}/>
        {/* <Gallary/> */}
        <Quantumleap />
        <Enquiry/>
        <Footer/>
        </>
    )
}

export default Profiledetails


export async function getServerSideProps({ query }) {
    console.log("query", query);
    return {
      props: {
  
        profileid: query
      }
    }
  }
