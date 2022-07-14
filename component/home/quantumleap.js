import React from 'react';
import quantumleap from '../../public/quantumLeap.jpg';
import Image from 'next/image';
import Link from 'next/link';
function Quantumleap() {
    return (
        <section className='c-quamtuleap'>
            <Link href="https://www.ujustbe.com/quantumleap.pdf"><a target="_blank"><Image src={quantumleap} layout='responsive'  /></a></Link>
        </section>
    )
}
export default Quantumleap
