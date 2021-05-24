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


    useEffect(() => {
        axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCPHrINBLeoqcF0RxE0z2r4CwWcJqYk_2A', {
            requests: {
                image: {
                    source: {
                        imageUri: "https://images03.brasildefato.com.br/23bed61977684f73ef6bd2c0f0c92d4c.jpeg"
                    }
                },
                features: [{
                    type: "LABEL_DETECTION",
                    maxResults: 10
                }]
            },
        })
            .then(response => {
                useLabelAnotation(response.data.responses[0].labelAnnotations)
                console.log(response.data)
            })
    }, [])

    return (
        <div className={styles.container}>
            <img src="https://images03.brasildefato.com.br/23bed61977684f73ef6bd2c0f0c92d4c.jpeg" alt="" />

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
