import styles from '../styles/components/machine.module.css'
import { useEffect, useState } from 'react';
import apiMain from '../utils/apimain';
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts';
import { MenuItem, Select } from '@material-ui/core';


export default function MachineComponents() {

    const [listMachine, setListMachine] = useState([])
    const [hiddenCreate, setHiddenCreate] = useState(false)
    const [openMachine, setOpenMachine] = useState("")
    const [speedUpdate, setSpeedUpdate] = useState(1000)
    const [imageItem, setImageItem] = useState("https://upload.wikimedia.org/wikipedia/commons/1/1a/Rotary_Dryer_-_Allgaier.jpg")


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSpeedUpdate(event.target.value as number);
    };

    const handleImage = (event: React.ChangeEvent<{ value: unknown }>) => {
        setImageItem(event.target.value as string);
    };


    useEffect(() => {
        apiMain.post('/machine/list')
            .then(response => {
                if (speedUpdate === 1000000000) {

                } else {
                    setTimeout(() => {
                        setListMachine(response.data)
                    }, speedUpdate)
                }
            })
    }, [listMachine, speedUpdate])
    return (
        <>


            {!hiddenCreate ? <div className={styles.selectUpdate}>
                <p>TAXA DE ATUALIZAÇÃO: </p>
                <Select
                    value={speedUpdate}
                    style={{ color: "#fff" }}
                    onChange={handleChange}
                >
                    <MenuItem value={1000}>1 Segundo</MenuItem>
                    <MenuItem value={5000}>5 Segundo</MenuItem>
                    <MenuItem value={10000}>10 Segundo</MenuItem>
                    <MenuItem value={1000000000}>Desativar</MenuItem>
                </Select>
            </div> : null}



            {!openMachine ? <button onClick={() => { setHiddenCreate(!hiddenCreate) }} className={styles.buttonCenter}>{!hiddenCreate ? "ADICIONAR NOVA MAQUINA" : "MAQUINAS"}</button> : null}
            { !hiddenCreate ?
                <div className={`${(openMachine) ? styles.listMenuBig : styles.listMenu}`}>


                    {
                        listMachine.map(({ _id, name, tempNow, speedNow, mediumRPM, speed, temp, reservoirlevelNow, resorvoirMedium, img,
                        mixer, mixerNow
                        }) => {
                            if (!openMachine || openMachine === _id) {

                                return (
                                    <>
                                        <div key={_id}>
                                            <img src={img} width="100%" height="300" />
                                            <div className={styles.title} style={openMachine ? {width: '80%'} : {}}>{name}</div>
                                            <div key={_id} className={styles.columnCenterAlign}>
                                                {openMachine ? <div className={styles.rpm}>{openMachine ? `ID: ${_id}` : ""}</div> : null}
                                                {speedNow ? <div className={styles.rpm}>{speedNow}RPM</div> : null}
                                                {tempNow ? <div className={styles.rpm}>{tempNow}ºC</div> : null}
                                                {mediumRPM ? <div className={styles.rpm}>MÉDIA: {mediumRPM ? `${mediumRPM.toFixed(2)}` : null}RPM</div> : null}
                                                {reservoirlevelNow ? <div className={styles.rpm}>{reservoirlevelNow}%</div> : null}
                                                {mixerNow ? <div className={styles.rpm}>{mixerNow}Hz</div> : null}
                                            </div>
                                                {!openMachine ? <button onClick={() => setOpenMachine(_id)}>DETALHES</button> : null}
                                                {openMachine ? <button onClick={() => setOpenMachine("")}>SAIR</button> : null}

                                        </div>
                                        {openMachine && speed.length > 0 ?
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                VELOCIDADE RPM
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart
                                                        width={500}
                                                        height={300}
                                                        data={speed}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <ReferenceLine y={1380} label="NIVEL MAX" stroke="red" />
                                                        <XAxis dataKey="date" tick={false} />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="rpm" stroke="#8884d8" />
                                                        <ReferenceLine y={mediumRPM} label="MEDIA" stroke="blue" />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div> : null}
                                        {openMachine && speed.length > 0?
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                Velocidade
                                            <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart
                                                        width={500}
                                                        height={400}
                                                        data={speed}
                                                        margin={{
                                                            top: 10,
                                                            right: 30,
                                                            left: 0,
                                                            bottom: 0,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <ReferenceLine y={mediumRPM} label="MEDIA" stroke="blue" />
                                                        <XAxis dataKey="date" tick={false} />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Area type="monotone" dataKey="rpm" stroke="#0c5f82" fill="#18b3f5" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div> : null}

                                        {openMachine && temp.length > 0 ?
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                TEMPERATURA
                                     <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart
                                                        width={500}
                                                        height={300}
                                                        data={temp}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <ReferenceLine y={1380} label="NIVEL MAX" stroke="red" />
                                                        <XAxis dataKey="date" tick={false} />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="celsius" stroke="#fa0505" />
                                                        <ReferenceLine y={mediumRPM} label="MEDIA" stroke="blue" />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div> : null}


                                            {openMachine && resorvoirMedium.length > 0 ?
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                NIVEL DO RESERVÁTORIO
                                     <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart
                                                        width={500}
                                                        height={300}
                                                        data={resorvoirMedium}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <ReferenceLine y={1380} label="NIVEL MAX" stroke="red" />
                                                        <XAxis dataKey="date" tick={false} />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="level" stroke="#fa0505" />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div> : null}


                                            
                                            {openMachine && mixer.length > 0 ?
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                              FREQUENCIA
                                     <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart
                                                        width={500}
                                                        height={300}
                                                        data={mixer}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <ReferenceLine y={1380} label="NIVEL MAX" stroke="red" />
                                                        <XAxis dataKey="date" tick={false} />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="hz" stroke="#fa0505" />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div> : null}
                                    </>
                                )
                            }
                        })
                    }

                </div> :
                <div className={styles.create}>
                    <form action="">
                        <input type="text" placeholder="Nome da maquina/sensor" /><br /><br />
                        <input type="number" placeholder="Temperatura de alerta" />
                        <input type="number" placeholder="Velocidade de alerta" />
                        <Select
                            value={imageItem}
                            style={{ color: "#000" }}
                            onChange={handleImage}
                        >
                            <MenuItem value="https://upload.wikimedia.org/wikipedia/commons/1/1a/Rotary_Dryer_-_Allgaier.jpg">Secador</MenuItem>
                            <MenuItem value="https://www.rescuecursos.com/wp-content/uploads/2020/09/carga-abrasiva-e-sal-e1609330503374.jpg">Esteira</MenuItem>
                            <MenuItem value="https://7brd83qn9we1178e338tvik7-wpengine.netdna-ssl.com/wp-content/uploads/2012/05/BatchOven2-520x416.jpg">Forno</MenuItem>
                        </Select>
                        <button>Criar nova maquina</button>
                    </form>
                    <img src={imageItem} alt="" width="30%" />
                </div>

            }
        </>
    )
}
