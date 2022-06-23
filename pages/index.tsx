import classNames from 'classnames'
import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import { ToastContainer } from 'react-toastify'
import Header from '../components/header/header'
import { UserStore } from '../stores/UserStore'
import s from './home.module.sass'

const Home: NextPage = observer((props) => {
    const store = useInjection(UserStore)
    
    return (
        <div className={classNames(s.container, s.main)}>
            <Header active='/'></Header>
            
        </div>
    )
})

export default Home
