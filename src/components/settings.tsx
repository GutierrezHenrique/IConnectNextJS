import { useState } from 'react'
import styles from '../styles/components/settings.module.css'
import { AiFillDelete } from 'react-icons/ai'

export default function SettingsComponents() {

    const [menu, setMenu] = useState(0)
    const [name, setName] = useState("Gutierrez")
    const [phone, setPhone] = useState("1299121881023")
    const [password, setPassword] = useState("12312")

    function submitNewInformation() {

    }

    return (
        <div className={styles.container}>
            <h2>Configurações</h2>
            <div className={styles.menu}>
                <div
                    onClick={() => { setMenu(0) }}
                >Configurações de conta</div>
                <div
                    onClick={() => { setMenu(1) }}
                >Configurações de outra conta</div>
            </div>

            { menu === 0 ?
                <div>
                    <form action="">
                        <input type="text" value={name} placeholder="Nome"
                            onChange={(e) => { setName(e.target.value) }} />
                        <input type="number" value={phone} placeholder="Telefone"
                            onChange={(e) => { setPhone(e.target.value) }} />
                        <input type="password" value={password} placeholder="Senha"
                            onChange={(e) => { setPassword(e.target.value) }} />
                        <button>
                            Salvar alterações
                </button>
                    </form>
                </div> :
                <div className={styles.people}>
                    <div>
                    <p>Gutierrez Henrique</p>
                    <div>
                    <AiFillDelete size={20} color="#f70000"/>
                    </div>
                    </div>
                </div>

            }
        </div>
    )
}