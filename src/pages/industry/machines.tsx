import Head from 'next/head'
import NavBarIndustry from '../../components/navbar'
import styles from '../../styles/pages/industry/connect.page.module.css'
import MachineComponents from '../../components/machines'

export default function IndustryConnect() {
    return (
        <div className={styles.connectPage}>
            <NavBarIndustry />
            <MachineComponents />
        </div>
    )
}
