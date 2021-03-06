import styles from '../styles/components/navbar.module.css'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FiWind } from 'react-icons/fi'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react';
import { getCookie, removeCookie, setCookie } from '../Storage/Storage';
import { useRouter } from 'next/router';
import { IoIosWater } from "react-icons/io";
import { BiMapPin } from "react-icons/bi";
import apiMain from '../utils/apimain';
import { useDate } from './date';



export default function NavBarIndustry() {

  const [weather, setWeather] = useState(0)
  const [pressure, setPressure] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [windSpeed, setWindSpeed] = useState(0)
  const [weatherSituation, setWeatherSituation] = useState("")
  const [lat, setLat] = useState("")
  const [log, setLog] = useState("")
  const [city, setCity] = useState("")
  const router = useRouter()
  const { date, time, wish } = useDate();
  let weatherformat = 0;


  useEffect(() => {

    apiMain.get('/weather')
      .then(response => {
        weatherformat = response.data.main.temp;
        setWeather(weatherformat - 273.15)
        setPressure(response.data.main.pressure)
        setHumidity(response.data.main.humidity)
        setWindSpeed(response.data.wind.speed)
        setWeatherSituation(response.data.weather[0].description)
        setLog(response.data.coord.lon)
        setLat(response.data.coord.lat)
        setCity(response.data.name)
      })

    //Single url match

    var token = getCookie('Token')

    // if (token) {
    //   apiMain.post('/user/valided', {
    //     token
    //   }).then(response => {
    //     if (!response.data.verify)
    //       router.push('/')
    //   }).catch(e => {
    //     removeCookie('Token')
    //     router.push('/')
    //   })
    // }
    // else
    //  router.push('/')
  }, [])

  async function logout(e: FormEvent) {
    e.preventDefault();
    removeCookie('Token')
    router.push('/')
  }


  return (
    <>
      <div className={styles.menuTop}>
        <div className={styles.logo}>
          <img src="/vetors/industry.svg" alt="IConnect" />
          <p>IConnect</p>
        </div>
        <div className={styles.menuHorizontal}>
          <div><Link href="/industry/connect">Inicio </Link></div>
          <div><Link href="/industry/machines">Sensores </Link></div>
          <div><Link href="/industry/status">Status</Link></div>
          <div><Link href="/industry/security">Seguran??a</Link></div>
          <div><Link href="/industry/settings">Configura????es</Link></div>
        </div>
        <div className={styles.datetime}>
       {date} {time}
        <p>{wish}</p>
        </div>
      </div>

      <div className={styles.menuLeft}>
        <div>{city}, SP, BR </div>
        <div>Situa????o <div>{weatherSituation}</div></div>
        <div>Temperatura <div>{weather.toFixed(2)}??C <TiWeatherPartlySunny /></div></div>
        <div>Press??o Atmosferica <div>{pressure}hPa</div></div>
        <div>Vento <div>{windSpeed} km/h <FiWind /></div></div>
        <div>Umidade <div>{humidity}% <IoIosWater /></div></div>
        <div>Coordenadas <div>Lat: {lat} <BiMapPin /> Long: {log}  <BiMapPin /></div></div>
        <button onClick={logout}>
          SAIR
       </button>
      </div>
    </>
  )
}
