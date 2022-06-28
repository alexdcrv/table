import classNames from "classnames";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import Link from "next/link";
import { useState } from "react";
import { IUser } from "../../api/profile";
import { SeasonsStore } from "../../stores/SeasonsStore";
import { UserStore } from "../../stores/UserStore";
import style from "./table.module.sass";

const Table = observer(() => {
  const userStore = useInjection(UserStore);
  const seasonsStore = useInjection(SeasonsStore);
  const [sort, setSort] = useState('')
  const [reverse, setReverse] = useState(false)
  const changeSeason = (e: any) => {
    seasonsStore.changeSeason(e.target.value);
  };
  const fromSeason = (el: IUser, field: string) => {
    //@ts-ignore
    let res = el.seasons[seasonsStore.showSeason - 1][`${field}`];
    return res;
  };
  const getPrecentage = (wins: number, loses: number) => {
    let res = (wins / (wins + loses)) * 100;
    if(!isNaN(res)) return res.toFixed(0) + "%";
    else return '0%'
  };
  const isWinner = (el: IUser) => {
    let history = el.seasons[seasonsStore.showSeason - 1].history;
    if(history[history.length - 1]) return history[history.length - 1]?.winner === el._id;
  };
  const getHistory = (el: IUser, set: string) => {
    let history = el.seasons[seasonsStore.showSeason - 1].history;
    //@ts-ignore
    if(history[history.length - 1]) return history[history.length - 1][`${set}`];
  };
  console.log("%c[id].tsx line:24 res", "color: #007acc;", userStore.users);
  return (
    <div className={style.container}>
      <div className={style.part1}>
        <span>Cезон{' '}</span>
        <select
          onChange={changeSeason}
         value={seasonsStore.showSeason}
        >
          {Array.from({ length: seasonsStore.currentSeason }).map((el, i) => {
            return <option key={i}>{i + 1}</option>;
          })}
        </select>
      </div>
      <div className={classNames(style.header)}>
        <div className={style.part} style={{display:'flex',alignItems:'center'}}>
          <img src="arrow.png" style={{width:'25px', marginRight:'10px', transform:`rotate(${reverse?"180deg":'0deg'})`}} onClick={()=>{setReverse(!reverse)}}/>
          <b onClick={()=>{setSort("name")}}>NAME</b>
        </div>
        <div className={style.part} onClick={()=>{setSort("gamesW")}}>
          <b>ГЕЙМЫ</b>
        </div>
        <div className={style.part} onClick={()=>{setSort('setsW')}}>
          <b>СЕТЫ</b>
        </div>
        <div className={style.part} onClick={()=>{setSort("wins")}}>
          <b>ИГРЫ</b>
        </div>
        <div className={style.part} >
          <b>% ПОБЕД</b>
        </div>
        <div className={style.part}>
          <b>ПОСЛЕДНЯЯ ИГРА</b>
        </div>
        <div className={style.part} onClick={()=>{setSort("points")}}>
          <b>ОЧКИ</b>
        </div>
      </div>
      {userStore.users &&
        userStore.users
        .slice()
        .sort((a: any, b: any) => 
            fromSeason(!reverse? b : a, sort) - fromSeason(!reverse ? a : b, sort)
        )
        .filter((el)=> fromSeason(el, "points")!==0)
        .map((el, i) => {
          return (
            <Link href={`/players/${el._id}`} key={i}>
              <div className={classNames(style.row)}>
                <div className={style.part}>{el.fullname}</div>
                <div className={style.part}>
                  {fromSeason(el, "gamesW") + "/" + fromSeason(el, "gamesL")}
                </div>
                <div className={style.part}>
                  {fromSeason(el, "setsW") + "/" + fromSeason(el, "setsL")}
                </div>
                <div className={style.part}>
                  {fromSeason(el, "wins")}/{fromSeason(el, "loses")}
                </div>
                <div className={style.part}>
                  {getPrecentage(
                    fromSeason(el, "wins"),
                    fromSeason(el, "loses")
                  )}
                </div>
                <div
                  className={classNames(
                    style.result,
                    isWinner(el) ? style.winner : style.loser
                  )}
                >
                  {isWinner(el) ? (
                    <>
                      {getHistory(el, "firstSet")?.firstResult}:
                      {getHistory(el, "firstSet")?.secondResult}
                      {"  "}
                      {getHistory(el, "secondSet")?.firstResult}:
                      {getHistory(el, "secondSet")?.secondResult}
                      {"  "}
                      {getHistory(el, "thirdSet")?.firstResult}
                      {getHistory(el, "thirdSet") ? ":" : ""}
                      {getHistory(el, "thirdSet")?.secondResult}
                      {"  W"}
                    </>
                  ) : (
                    <>
                      {getHistory(el, "firstSet")?.secondResult}:
                      {getHistory(el, "firstSet")?.firstResult}
                      {"  "}
                      {getHistory(el, "secondSet")?.secondResult}:
                      {getHistory(el, "secondSet")?.firstResult}
                      {"  "}
                      {getHistory(el, "thirdSet")?.secondResult}
                      {getHistory(el, "thirdSet") ? ":" : ""}
                      {getHistory(el, "thirdSet")?.firstResult}
                      {"  L"}
                    </>
                  )}
                </div>
                <div className={style.part}>{fromSeason(el, "points")}</div>
              </div>
            </Link>
          );
        })}
    </div>
  );
});
export default Table;
