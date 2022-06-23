import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import { UserStore } from "../../stores/UserStore";
import Header, { links } from "../header/header";
import { PlayerProps } from "./player";
import style from "../../pages/players/player.module.sass";
import { observer } from "mobx-react";
import CrateGame from "./createGame";
import EditPlayer from "./editPlayer";
import CreatePlayer from "./createPlayer";

const Admin = observer(() =>{
    const userStore = useInjection(UserStore);

    return (
      <div className={style.container}>
        <Header active="player" />
        <div className={style.player}>
            <div className={style.row}>
  
              <div className={style.info}>
                <div className={style.name}>
                  <h1>{userStore.user?.fullname}</h1>
                </div>
                <CreatePlayer/>
                <EditPlayer/>
                <CrateGame/>
              </div>
              
            </div>
          </div>
      </div>
    )})
    export default Admin
  