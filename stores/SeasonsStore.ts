import { injectable } from "inversify";
import { configure, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IUser } from "../api/profile";
import axios from "axios";
import { backendUrl, withCookies } from "../components/utils";
import { EditableFields } from "../pages/players/[id]";
configure({
  enforceActions: "never",
});
@injectable()
export class SeasonsStore {
  @observable currentSeason: number = 0;
  @observable showSeason: number = 0;
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  async getCurrentSeason() {
    try {
      const res = await axios.get(`${backendUrl}/season/current`);
      this.currentSeason = res.data.currentSeason;
      this.showSeason = res.data.currentSeason;
    } catch (e) {
      console.log(e);
    }
  }
  changeSeason(value: number) {
    this.showSeason = value;
  }
}
