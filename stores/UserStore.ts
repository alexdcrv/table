import { injectable } from "inversify";
import { configure, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IUser } from "../api/profile";
import axios from "axios";
import { addUser, backendUrl, withCookies } from "../components/utils";
import { EditableFields } from "../pages/players/[id]";
import { toast } from "react-toastify";
configure({
  enforceActions: "never",
});
export const rightLegaues = {
  "Высшая СМ": "pro",
  "Первая Ж": "firstF",
  "Первая М": "firstM",
  "Начинающие СМ": "begginers",
};
@injectable()
export class UserStore {
  @observable user?: IUser | null = null;
  @observable me?: IUser | null = null;
  @observable users?: IUser[] | null = null;
  @observable allUsers?: IUser[] | null = null;
  @observable isAuth?: boolean = false;
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  Auth() {
    this.isAuth = true;
  }
  async login(body: { email: string; password: string }) {
    try {
      const res = await withCookies.post(`${backendUrl}/auth/login`, body);
      console.log(res);
      this.me = res.data.user;
      this.Auth();
      localStorage.setItem("token", res.data.accessToken);
      return res.data.user._id;
    } catch (e) {
    //   console.log(e.response);
      return false;
    }
  }
  async logout() {
    try {
      const { data } = await axios.post(`${backendUrl}/auth/logout`);
      localStorage.removeItem("token");
      console.log(data);
      this.isAuth = false;
      // window.location.reload()
    } catch (e) {
      console.log(e);
    }
  }
  async register(
    body: { email: string; password: string; fullname: string; league: string },
    isAdmin?: boolean
  ) {
    try {
      
      if (!isAdmin) {
        const { data } = await withCookies.post(
        `${backendUrl}/auth/register`,
        body
      );
        localStorage.setItem("token", data.accessToken);
        this.Auth();
        console.log(data);
        this.me = data.user;
        return data.user._id;
      } else {
        const { data } = await addUser.post(
          `${backendUrl}/auth/register`,
          body
        );
        return data.user._id;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  //get users data
  async getUsersByLeague(league: string) {
    try {
      const { data } = await axios.get(
        `${backendUrl}/users/getUsers?league=${league}`
      );
      console.log(data);
      this.users = data.users;
      return data.users;
    } catch (e) {
      console.log(e);
    }
  }
  async getAllUsers () {
    try {
      const { data } = await axios.get(
        `${backendUrl}/users/getUsers/all`
      );
      console.log(data);
      this.allUsers = data.users;
      return data.users;
    } catch (e) {
      console.log(e);
    }
  }
  async changeUser(body: EditableFields, id: string, league: string) {
    try {
      //@ts-ignore
      const { data } = await axios.put(`${backendUrl}/users/edit?id=${id}${league !== "" ? "&league=" + rightLegaues[league] : ""}`, body);
      console.log(data);
      // this.user = data.user
      // return data.user
    } catch (e) {
      console.log(e);
    }
  }
  async getUsersById(id: string) {
    try {
      const { data } = await axios.get(
        `${backendUrl}/users/getUserById?id=${id}`
      );
      console.log(data);
      this.user = data.user;
      return data.user;
    } catch (e) {
      console.log(e);
    }
  }
  clearUser() {
    this.user = null;
  }
  clearUsers() {
    this.users = null;
  }
  async checkAuth() {
    try {
      const { data } = await axios.get(`${backendUrl}/auth/refresh`, {
        withCredentials: true,
      });
      console.log(data);
      localStorage.setItem("token", data.accessToken);
      this.Auth();
      console.log(data);
      this.me = data.user;
      return data.user._id;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
