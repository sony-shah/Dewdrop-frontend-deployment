import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { auth } from '../../firebaseConfig';
import { signInWithPopup, OAuthProvider, getAuth, signOut } from 'firebase/auth';
import { collection, ref, push, addDoc, setDoc, doc, docs, getDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { getFirestore, onSnapshot } from "firebase/firestore"
import Router from 'next/router';


const Authlog = getAuth();
const db = getFirestore();

const Enquiry = () => {
    const [email, setemail] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [name, setName] = useState("")
    const [merror, setError] = useState(false)
    const [ssend, setSendform] = useState(false)
    const usersCollectionRef = collection(db, "EnquiryDatails");

    const handleSubmitEnquiry = async (e) => {
        e.prevent

        if (email === "" && PhoneNumber === "" && name === "") {
            setError(true)
        } else {
            setError(false)
            const data = {
                email: email,
                name: name,
                PhoneNumber: PhoneNumber,
            }
            await addDoc(usersCollectionRef, data);
            console.log("enquiry data:", data);
            setSendform(true)
            setName("");
            setemail("");
            setPhoneNumber("");
            setInterval(() => {
                setSendform(false)
            }, 2000);
        }
    }
    return (
        <section className='c-enquiry con-row'>
         
                <div className='container'>
                    <div className='sectionHeading'>
                        <h2>Enquiry</h2>
                    </div>
                    <form onSubmit={handleSubmitEnquiry}>
                        <ul>
                            <li>
                                <input type="text"
                                    placeholder='Name'
                                    value={name}
                                    onChange={(event) => { setName(event.target.value) }}
                                />
                            </li>
                            <li>
                                <input type="email"
                                    placeholder='Email'
                                    value={email}
                                    required
                                    onChange={(event) => { setemail(event.target.value) }} />
                            </li>
                            <li>
                                <input type="text"
                                    placeholder='Phone'
                                    value={PhoneNumber}
                                    onChange={(event) => { setPhoneNumber(event.target.value) }} />
                            </li>
                            <li>
                                <button className='' type='submit' >Submit</button>
                            </li>
                        </ul>
                    </form>
                    {merror ? <p className='error'>All Fields are require</p> : null}
                    {ssend ? <h2 className='success'>Thank you for submit</h2> : null}
                </div>
            
        </section>
    )
}

export default Enquiry
