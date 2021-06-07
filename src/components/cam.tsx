import styles from '../styles/components/cam.module.css'
import { useEffect, useState } from 'react';
import apiMain from '../utils/apimain';
import axios from 'axios';
import { AiOutlineFire } from 'react-icons/ai'
import {FaHardHat} from 'react-icons/fa'
import {GiUnderwearShorts} from 'react-icons/gi'
import {BiSmile} from 'react-icons/bi'

export default function CamComponents() {
    
    const [labelAnnotations, useLabelAnotation] = useState([])
    const [img, setImg] = useState("https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif")
    const [speedUpdate, setSpeedUpdate] = useState(10000)

    useEffect(() => {
        apiMain.get('/viewimg')
        .then(response => {

            if (speedUpdate === 1000000000) {

            } else {
                setTimeout(() => {
                    setImg(response.data.imgFormat)
                    useLabelAnotation(response.data.imgList.responses[0].labelAnnotations)
                }, speedUpdate)
            }

        })
    }, [labelAnnotations])

    return (
        <div className={styles.container}>
            <img src={img} alt=""  height="400" />

            <div className={styles.list}>

                <img src="/vetors/gcp.png" alt="" />
            {labelAnnotations.map(({description, score}) => {
                
                return (<div>
                    {description} 
                    {description === "Smile" ? <BiSmile color="#db0d0d" /> : null}
                    {description === "Workwear" ? <GiUnderwearShorts color="#db0d0d" /> : null}
                    {description === "Hard hat" ? <FaHardHat color="#db0d0d" /> : null}
                    {description === "Fire" ? <AiOutlineFire color="#db0d0d" /> : null}
                    {description === "Flame" ? <AiOutlineFire color="#db0d0d" /> : null}
                    {description === "Red" ? <AiOutlineFire color="#db0d0d" /> : null}
                    {description === "Gas" ? <AiOutlineFire color="#db0d0d" /> : null}
                    <div>{(Number(score) * 100).toFixed(2)}%</div>
                    </div>)
            })}
            </div>
        </div>
    )
}
