import { useInjection } from "inversify-react"
import { observer } from "mobx-react"
import { useEffect } from "react"
import { UserStore } from "../stores/UserStore"

const AuthContext = observer(({children}: any) => {
    const userStore = useInjection(UserStore)
    // try reconnect to web3
    useEffect(() => {
       if(localStorage.getItem('token')){
        userStore.checkAuth()
       }
    }, [])
    return children
})
export default AuthContext