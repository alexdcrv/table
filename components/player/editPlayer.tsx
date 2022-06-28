import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useState } from "react";
import style from "../../pages/players/player.module.sass";
import { UserStore } from "../../stores/UserStore";
import EditOne from "./editOne";

const EditPlayer = observer(() => {
  const [create, setCreate] = useState<boolean>(false);
  const userStore = useInjection(UserStore);
  const startCreate = () => {
    setCreate(true);
    userStore.getAllUsers();
  };
  return (
    <div>
      <div className={style.admin_point}
        style={{ display: create ? "block" : "none" }}>
          {userStore?.allUsers && userStore?.allUsers.map((user,i)=>{
            return <EditOne key={i} user={user}/>
          })}
      </div>
      <div
        className={style.admin_point}
        style={{ display: !create ? "block" : "none" }}
        onClick={() => startCreate()}
      >
        <button>Создать игрока</button>
      </div>
    </div>
  );
});
export default EditPlayer;
