import React, { Component } from 'react';
import LeaderboardList from '../component/leaderboard/LeaderboardList';
import Footer from '../component/footer'
import Enquiry from '../component/global/enquiry'
import Header from '../component/header'
import Dewdrop from '../component/home/dewdrop'
import Quantumleap from '../component/home/quantumleap'
import Head from 'next/head';

function leaderboards() {
    return (
        <>
            <Head>
                <title>UJustBe Universe || Leaderboards</title>
                {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
                <meta name="description" content="UJustBe is a space in which U come to Be, Connect & Grow live in a World of Happy Faces" />
                {/* <meta property="og:url" content={baseURL + users.id} /> */}
                {/* <meta property="og:image" content={users.Thumbnail} /> */}
            </Head>
            <Header />
            <LeaderboardList />
            <Quantumleap />
            <Enquiry />
            <Footer />
        </>
    )
}

export default leaderboards
