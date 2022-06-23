import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { UserStore } from '../../stores/UserStore'
import s from './auth.module.sass'

const Login = observer(() =>{
    const router = useRouter()
    const userStore = useInjection(UserStore)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const onFieldChange = (e:any) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    console.log('%clogin.tsx line:17 form', 'color: #007acc;', form);
    const login = () =>{
        userStore.login(form).then((res)=>{
            if(res) {
                router.push(`../../players/${res}`)
            } else {
                console.log('object');
                toast.error('Invalid credentials')
            }
        })
    }
    return (
        <div className={s.auth}>
            <input placeholder='Email' name="email" value={form.email} onChange={onFieldChange}/>
            <input placeholder='Password' name="password" value={form.password} type="password" onChange={onFieldChange}/>
            <div className={s.register}>
                <Link href='/' ><button>CANCEL</button></Link>
                <button onClick={login}>LOGIN</button> 
            </div>    
        </div>
    )
})
export default Login 