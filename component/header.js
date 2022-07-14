import Image from 'next/image';
import ujblogo from '../public/logo.png'
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from "next/router";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const router = useRouter();
    const toggleChecked = () => setIsOpen(isOpen => !isOpen);
    // const [searchName, setsearchName] = useState('');
    // const data = router.query.vid;




    const handleChange = e => {
        setsearchName(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        // alert("you have searched for - " + searchName);
        setSearchOpen(false)
        router.push(`/search?search=${searchName}`, undefined, { shallow: true })
        // or you can send data to backend
    };

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmit();
            
        }
    };


    return (
        <>
            <header className='m-header'>
                <div className='logo'>
                    <Image src={ujblogo} layout='responsive' />
                </div>
                <nav className={`navbar ${isOpen ? "openmenu" : ""}`}>
                    <ul>
                        <li ><Link href="/"><a className={router.pathname == "/" ? "active" : ""}>Home</a></Link></li>
                        <li><Link href="/aboutus"><a className={router.pathname == "/aboutus" ? "active" : ""}>About</a></Link></li>
                        <li><Link href="/dewdrops"><a className={router.pathname == "/dewdrops" ? "active" : ""}>DewDrops</a></Link></li>
                        <li><Link href="/orbiter"><a className={router.pathname == "/orbiter" ? "active" : ""}>Orbiters</a></Link></li>
                        <li><Link href="/leaderboards"><a className={router.pathname == "/leaderboards" ? "active" : ""}>Leaderboards</a></Link></li>
                        <li><Link href="https://www.ujustbe.com/quantumleap.pdf"><a target="_blank">Quantum Leap</a></Link></li>
                        <li><Link href="https://www.ujustbe.com/contact.html" ><a target="_blank">Contact</a></Link></li>
                    </ul>
                </nav>
                <div className={`hamburgerMenu ${isOpen ? "active" : ""}`} onClick={toggleChecked}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header>


        </>
    )

}

export default Header
