import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <section className='m-footer con-row'>
            <div className='container'>
                <ul className='footerRow'>
                    <li>
                        <h6>Our Initiatives</h6>
                        <span>
                            <Link href="http://umeet-ujustbe.vercel.app" ><a>Umeet</a></Link>
                            <Link href="https://ujustcelebrate.vercel.app/" ><a>Ujust Celebrate</a></Link>
                            <Link href="https://www.ujustbe.com/quantumleap.pdf" ><a>Quantum Leap</a></Link>
                            {/* <Link href="#" ><a>Umeet</a></Link> */}
                        </span>
                    </li>
                    <li>
                        <h6>And More</h6>
                        <span>
                            <Link href="/aboutus"><a>About Us</a></Link>
                            <Link href="https://www.ujustbe.com/contact.html"  ><a>Connect with us</a></Link>
                            <Link href="https://www.ujustbe.com/privacy-policy.html" ><a>Privacy Policy</a></Link>
                            {/* <Link href="#" ><a>Umeet</a></Link> */}
                        </span>
                    </li>
                </ul>
                <p></p>
            </div>
        </section>
    )
}

export default Footer
