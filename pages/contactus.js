import React from 'react'
import AboutUs from '../component/about/AboutUs'
import Footer from '../component/footer'
import Enquiry from '../component/global/enquiry'
import Header from '../component/header'


function aboutus() {
    return (
        <>
        <Header />
        <AboutUs/>
        <Enquiry/>
        <Footer />
        </>
    )
}

export default aboutus