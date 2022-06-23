import classNames from 'classnames'
import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../components/header/header'
import Table from '../components/table/table'
import { UserStore } from '../stores/UserStore'
import s from './home.module.sass'

const Info: NextPage = observer((props) => {
    const userStore = useInjection(UserStore)
    const [link, setLink] = useState<string>("")
    const history = useRouter()
    useEffect(()=>{
        console.log('%c[id].tsx line:14 window.location.href', 'color: #007acc;', window.location.pathname);
        setLink(window.location.pathname)
    },[history.asPath])
    useEffect(()=>{
        if(link!=='') {
            userStore.getUsersByLeague(link.replace('/', ''))
            // .then ((res)=>{
            //     console.log('%c[id].tsx line:24 res', 'color: #007acc;', res);
            // })
        }
    },[link])
    return (
        <div className={classNames(s.container, s.main)}>
            <Header active={link}></Header>
            <Table />
        </div>
    )
})

export default Info
