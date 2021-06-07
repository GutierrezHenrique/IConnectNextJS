import styles from '../styles/components/status.module.css'
import { useEffect, useState } from 'react';
import apiMain from '../utils/apimain';

export default function StatusComponents() {


    return (
        <>
            <div className={styles.listMenu}>

                <div className={styles.off}>Esteira 1</div>
                <div className={styles.ok}>Esteira secagem</div>
                <div className={styles.ok}>Forno</div>
                <div className={styles.ok}>Esteira</div>
                <div className={styles.ok}>Reservatório I1</div>
                <div className={styles.ok}>Reservatório StockHouse</div>
                <div className={styles.ok}>Misturador</div>

            </div>
        </>
    )
}
