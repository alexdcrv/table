import Link from 'next/link'
import s from './auth.module.sass'

const Auth = () =>{
    return (
        <div className={s.auth}>
            <Link href='/auth/login' ><button>LOGIN</button></Link>
            <Link href='/auth/register' ><button>REGISTER</button></Link>
        </div>
    )
}
export default Auth