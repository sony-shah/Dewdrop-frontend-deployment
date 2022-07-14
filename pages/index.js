import Head from 'next/head'
import Image from 'next/image'
import Footer from '../component/footer'
import Enquiry from '../component/global/enquiry'
import Header from '../component/header'
// import Head from 'next/head'
import Contentlist from '../component/home/contentlist'
import Dewdrop from '../component/home/dewdrop'
import Leaderboard from '../component/home/leaderboard'
import Quantumleap from '../component/home/quantumleap'
import Topbanner from '../component/home/topbanner'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
                <title>UJustBe Universe || Dew Drops</title>
                {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
                <meta name="description" content="UJustBe is a space in which U come to Be, Connect & Grow live in a World of Happy Faces" />
                {/* <meta property="og:url" content={baseURL + users.id} /> */}
                {/* <meta property="og:image" content={users.Thumbnail} /> */}
            </Head>
      <Header />
      <Topbanner />
      <Leaderboard />
      <Dewdrop />
      <Contentlist />
      <Quantumleap />
      <Enquiry/>
      <Footer/>
    </>
  )
}
