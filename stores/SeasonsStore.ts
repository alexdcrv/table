import { injectable } from 'inversify'
import {  configure, makeObservable, observable } from 'mobx'
import 'reflect-metadata'
import { RootStore } from './RootStore'
import {IFetchProfileResponseData} from "../api/profile";
import axios from "axios";
import { backendUrl, withCookies } from '../components/utils';
import { EditableFields } from '../pages/players/[id]';
configure({
    enforceActions: "never",
})
@injectable()
export class SeasonsStore {
    @observable currentSeason: number = 0

    public constructor(private readonly rootStore: RootStore) {
        makeObservable(this)
    }
    async getCurrentSeason () {
        try {
            const res = await axios.get(`${backendUrl}/season/current`);
            this.currentSeason = res.data.currentSeason
        } catch(e) {
            console.log(e);
        }
    }
}
