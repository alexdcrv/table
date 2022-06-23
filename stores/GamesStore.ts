import { injectable } from 'inversify'
import {  configure, makeObservable, observable } from 'mobx'
import 'reflect-metadata'
import { RootStore } from './RootStore'
import {IFetchProfileResponseData} from "../api/profile";
import axios from "axios";
import { backendUrl, withCookies } from '../components/utils';
import { EditableFields } from '../pages/players/[id]';
import { ISet } from '../components/player/createGame';
import { toast } from 'react-toastify';
configure({
    enforceActions: "never",
})
@injectable()
export class GamesStore {
    @observable currentSeason?: number | null = null

    public constructor(private readonly rootStore: RootStore) {
        makeObservable(this)
    }
    async createGame (season:number, league:string,winner:string, loser:string, firstSet:ISet, secondSet:ISet, thirdSet?:ISet) {
        let body:CreateReq = {
            league: league,
            winner: winner,
            loser: loser,
            firstSet: firstSet,
            secondSet: secondSet,
            season: season
        }
    
        if (thirdSet) body["thirdSet"] = thirdSet
        try {
            await axios.post(`${backendUrl}/games/create`, body);
            toast.success("Success")
        } catch(e) {
            console.log(e);
        }
    }
}
interface CreateReq {
    league: string
    winner:string
    loser:string
    firstSet:ISet
    secondSet:ISet
    thirdSet?:ISet
    season: number
}