import Head from 'next/head'
import NavBarIndustry from '../../components/navbar'
import styles from '../../styles/pages/industry/connect.page.module.css'
import { useState } from 'react';
import React from 'react';
import CamComponents from '../../components/cam';




export default function SecurityConnect() {
    const [loading, setLoading] = useState(true)

    setTimeout(() => {
        setLoading(false)
    }, 1500)

    return (
        <div>
            <Head>
                <title>IConnect: Home</title>
            </Head>
            <div className={styles.connectPage}>
                {(!loading) ?
                    <>
                        <NavBarIndustry />

                    </> : null}
                    <CamComponents />
            </div>
        </div>
    )
}
