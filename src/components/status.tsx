import styles from '../styles/components/status.module.css'
import { useEffect, useState } from 'react';
import apiMain from '../utils/apimain';

export default function StatusComponents() {


    return (
        <>
            <div className={styles.listMenu}>

                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.off}>Maquina 1</div>
                <div className={styles.off}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>
                <div className={styles.ok}>Maquina 1</div>

            </div>
        </>
    )
}
