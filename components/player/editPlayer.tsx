import { observer } from "mobx-react";
import style from "../../pages/players/player.module.sass";

const EditPlayer = observer(() => {
  return (
    <div className={style.admin_point}>
      <button>Редактировать игрока</button>
    </div>
  );
})
export default EditPlayer