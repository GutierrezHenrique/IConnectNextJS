import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import styles from '../styles/pages/index.module.css'
import apiMain from '../utils/apimain'
import { WindMillLoading } from 'react-loadingg';
import { getCookie, removeCookie, setCookie } from '../Storage/Storage';
import { useRouter } from 'next/router'

export default function Home() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function Login(e: FormEvent) {
    e.preventDefault();
    setMessage("")
    setLoading(true)
    await apiMain.post('/user/login', {
      email,
      password
    }).then(response => {
      setCookie('Token', response.data.token)
      setTimeout(() => {
        router.push('/industry/connect')
        setLoading(false)
      }, 500)
    }).catch(e => {
      setTimeout(() => {
        setMessage("Senha inválida")
        setLoading(false)
      }, 500)
    })
  }

  useEffect(() => {
    var token = getCookie('Token')

    if (token) {
       apiMain.post('/user/valided', {
        token
      }).then(response => {
        if(response.data.verify)
           router.push('/industry/connect')
        else
           removeCookie('Token')
      }).catch(e => {
        removeCookie('Token')
        })
    }
  }, [])

  return (
    <div>
      <Head>
        <title>IConnect: Auth</title>
      </Head>
      <div className={styles.IndexPage}>
        <div className={styles.body}>
          <img src="/vetors/industry.svg" alt="Autenticação Imagem" />
          <div>
            Industry Connect
          <div className={styles.linebreak}></div>
            {message}
            {!loading ?
              <form onSubmit={Login}>
                <div>
                  <input type="email" placeholder="E-MAIL"
                    onChange={(e) => { setEmail(e.target.value) }} value={email}
                  />
                </div>
                <div>
                  <input type="password" placeholder="SENHA"
                    onChange={(e) => { setPassword(e.target.value) }} value={password}
                  />
                </div>
                <div>
                  <button type="submit">CONECTAR</button>
                </div>
              </form>
              : <WindMillLoading size="large" speed={0.4} />}
          </div>
          <div className={styles.bottom}>
            <div className={styles.linebreak}></div>
            <img src="/vetors/image 1.svg" alt="" />
            <img src="/vetors/Apple-logo.png" alt="" />
            <img src="/vetors/kisspng-web-development-web-design-logo-website-5abbea0acaa518.0043648215222645868301.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
