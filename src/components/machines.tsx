import styles from '../styles/components/machine.module.css'
import { useEffect, useState } from 'react';
import apiMain from '../utils/apimain';

export default function MachineComponents() {

    const [listMachine, setListMachine] = useState([])
    const [hiddenCreate, setHiddenCreate] = useState(false)
    const [openMachine, setOpenMachine] = useState("")

    useEffect(() => {
        apiMain.post('/machine/list')
            .then(response => {
                setTimeout(() => {
                    setListMachine(response.data)
                }, 1000)
            })
    }, [listMachine])
    return (
        <>
            {!openMachine ? <button onClick={() => {setHiddenCreate(!hiddenCreate)}} className={styles.buttonCenter}>{!hiddenCreate ? "ADICIONAR NOVA MAQUINA" : "MAQUINAS"}</button> :null}
          { !hiddenCreate ?
            <div className={styles.listMenu}>
                {
                    listMachine.map(({ _id, name, tempNow, speedNow, mediumRPM }) => {

                        if(!openMachine || openMachine === _id){
                        return (
                            <div key={_id}>
                                <img src="/vetors/dryer.png" />
                                <p>{name}</p>
                                <div className={styles.rpm}>{speedNow}RPM</div>
                                <div className={styles.rpm}>{tempNow}ºC</div>
                                <div className={styles.rpm}>MÉDIA: {mediumRPM ? `${mediumRPM.toFixed(2)}` : null}RPM</div>
                                <div className={styles.rpm}>RP: 1100RPM</div>
                                {!openMachine ? <button onClick={() => setOpenMachine(_id)}>DETALHES</button> : null}
                            </div>)} else {
                                return (<></>)
                            }
                    })
                }

            </div> : 
             <div className={styles.create}>
                 <form action="">
                     <input type="text" placeholder="Nome da maquina/sensor" />
                     <button>Criar nova maquina</button>
                 </form>
             </div>
            
            } 
        </>
    )
}
