import React from 'react'
import AboutUs from '../component/about/AboutUs'
import Footer from '../component/footer'
import Enquiry from '../component/global/enquiry'
import Header from '../component/header'
import Quantumleap from '../component/home/quantumleap'
import Head from 'next/head'

function aboutus() {
    return (
        <>
            <Head>
                <title>UJustBe Universe</title>
                {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
                <meta name="description" content="UJustBe is a space in which U come to Be, Connect & Grow live in a World of Happy Faces" />
                {/* <meta property="og:url" content={baseURL + users.id} /> */}
                {/* <meta property="og:image" content={users.Thumbnail} /> */}
            </Head>
            <Header />
            <AboutUs />
            <Quantumleap />
            <Enquiry />
            <Footer />
        </>
    )
}

export default aboutus
