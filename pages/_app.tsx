import '../styles/app.sass'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { RootStore } from '../stores/RootStore'
import { Provider } from 'inversify-react'
import { ModalsContainer, ModalsEnum } from '../modals'
import { ToastContainer } from 'react-toastify'
import AuthContext from '../components/isAuth'
import "react-toastify/dist/ReactToastify.css";
const rootStore = new RootStore()
const container = rootStore.container

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Provider container={container}>
            <AuthContext>
                <Component {...pageProps} />
                <ModalsContainer />
                <ToastContainer/>
            </AuthContext>
        </Provider>
    )
}

export default MyApp
