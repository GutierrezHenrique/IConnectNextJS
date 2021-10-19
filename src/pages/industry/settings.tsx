import Head from 'next/head'
import NavBarIndustry from '../../components/navbar'
import styles from '../../styles/pages/industry/connect.page.module.css'
import { useState } from 'react';
import React from 'react';
import CamComponents from '../../components/cam';
import SettingsComponents from '../../components/settings';




export default function IndustryConnect() {
    const [loading, setLoading] = useState(true)

    setTimeout(() => {
        setLoading(false)
    }, 1000)

    return (
        <div>
            <Head>
                <title>IConnect: Home</title>
            </Head>
            <div className={styles.connectPage}>
                {(!loading) ?
                    <>
                        <NavBarIndustry />
                        <SettingsComponents />

                    </> : null}
            </div>
        </div>
    )
}
