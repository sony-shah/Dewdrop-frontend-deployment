import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { auth } from '../firebaseConfig'
import firebaseApp from '../firebaseConfig'
import { signInWithPopup, OAuthProvider, getAuth, signOut } from 'firebase/auth';
import { collection, ref, push, addDoc, setDoc, doc, docs, getDocs, arrayUnion, getDoc, updateDoc, Timestamp, query, orderBy } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import Router from 'next/router';
import { useRouter } from "next/router";

import Link from 'next/link';
import Header from '../component/header';
import Head from 'next/head'
import Partnerlisting from '../component/profile/Partnerlisting';
import Quantumleap from '../component/home/quantumleap';
import Enquiry from '../component/global/enquiry';
import Footer from '../component/footer';

const db = getFirestore();
const authlog = getAuth();

function orbiter() {

    return (
        <>
            <Head>
                <title>Orbiter</title>
                {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
                {/* <meta name="description" content={users.businessName} /> */}
                {/* <meta property="og:url" content={baseURL + users.id} /> */}
                {/* <meta property="og:image" content={users.Thumbnail} /> */}
            </Head>
            <Header />
            <Partnerlisting />
            <Quantumleap />
            <Enquiry />
            <Footer />
        </>
    )
}

export default orbiter