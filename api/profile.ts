import { ISet } from "../components/player/createGame";
import request, { IResponse } from "../service";
// import { IAccount } from 'types/account.types'
// import { IProfile } from 'types/profile.types'
export interface IGame {
  winner: string;
  loser: string;
  firstSet: ISet;
  secondSet: ISet;
  thirdSet?: ISet;
  season: number;
  league: string;
}
export interface ISeason {
  league: string;
  season: number;
  wins: number;
  loses: number;
  setsW: number;
  setsL: number;
  gamesW: number;
  gamesL: number;
  history: IGame[];
}
export interface IUser {
  email: string;
  fullname: any;
  wins?: Number;
  loses?: Number;
  league?: string
  _id: string;
  isAdmin?: boolean;
  seasons: ISeason[];
}

export function fetchProfile() {
  return request<IResponse<IUser>>({
    url: `user`,
  });
}

export function updateProfile(data: Partial<any>) {
  return request<IResponse<IUser>>({
    url: `user`,
    method: "PUT",
    data,
  });
}
