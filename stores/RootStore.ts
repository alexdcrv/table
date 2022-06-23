import { Container } from 'inversify'
import { UserStore } from './UserStore'
import { ModalStore } from './ModalStore'
import { useMemo } from 'react'
import { GamesStore } from './GamesStore'
import { SeasonsStore } from './SeasonsStore'


export class RootStore {
    public userStore: UserStore
    public container: Container
    public modalStore: ModalStore
    public gamesStore: GamesStore
    public seasonsStore: SeasonsStore
    public constructor() {
        this.userStore = new UserStore(this)
        this.modalStore = new ModalStore(this)
        this.gamesStore = new GamesStore(this)
        this.seasonsStore = new SeasonsStore(this)
        this.container = new Container()
        this.container.bind(UserStore).toConstantValue(this.userStore)
        this.container.bind(GamesStore).toConstantValue(this.gamesStore)
        this.container.bind(SeasonsStore).toConstantValue(this.seasonsStore)
        this.container.bind(ModalStore).toConstantValue(this.modalStore)
        this.container.bind(Container).toConstantValue(this.container)
    }
}

function initializeStore(initialData: unknown = null) {
    let store
    const _store = store ?? new RootStore()
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store
    return _store
}

export function useStore(initialState?: unknown) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
