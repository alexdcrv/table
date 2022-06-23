import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header, { links } from "../../components/header/header";
import Admin from "../../components/player/admin";
import Player from "../../components/player/player";
import { rightLegaues, UserStore } from "../../stores/UserStore";
import style from "./player.module.sass";
export interface EditableFields {
  mainhand: string;
  backhand: string;
}
export const leagues = ["Высшая СМ", "Первая Ж", "Первая М", "Начинающие СМ"];
const PlayerPage = observer(() => {
  const [id, setId] = useState<string>("");
  const history = useRouter();
      
  const [league, setLeague] = useState<string>("");
  const userStore = useInjection(UserStore);
  const [data, setData] = useState<EditableFields>({
      mainhand: "",
      backhand: "",
  });
  useEffect(() => {
    setId(window.location.pathname.split("/")[2]);
  }, [history.asPath]);

  useEffect(() => {
    return () => {
      userStore.clearUser();
    };
  }, []);
  useEffect(() => {
    if (id && id !== "") {
      userStore.getUsersById(id).then((res) => { 
          setData({
              mainhand: res?.mainhand ? res.mainhand : "",
              backhand: res?.backhand ? res.backhand : "",
          });
          
          for (let [key, value] of Object.entries(rightLegaues)) {
              if(value===res.seasons[res.seasons.length - 1]?.league) {
                setLeague(key);
              }
          }
          // console.log(res.seasons);
      });
    }
}, [id]);
  if (userStore.user?._id === id && !userStore.user.isAdmin) {
    return <Player data={data} setData={setData} league={league} setLeague={setLeague}></Player>
      
  }
  else if(userStore?.user?.isAdmin && userStore.me?.isAdmin){
    return <Admin/>
}

 else {
    return (
      <div className={style.container}>
        <Header active="player" />
        loading...
      </div>
    )}
});
export default PlayerPage;
