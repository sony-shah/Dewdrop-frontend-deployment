import React from 'react'
import DewdropPopup from '../component/dewdrop/DewdropPopup'

import Dewdroplist from '../component/dewdrop/Dewdroplist'
import Footer from '../component/footer'
import Enquiry from '../component/global/enquiry'
import Header from '../component/header'
import Dewdrop from '../component/home/dewdrop'
import Quantumleap from '../component/home/quantumleap'


function dewdrops() {
    return (
        <>
            <Header />          
            <Dewdroplist />
            {/* <DewdropPopup/> */}
            <Quantumleap/>
            <Enquiry/>
            <Footer />
        </>
    )
}

export default dewdrops
