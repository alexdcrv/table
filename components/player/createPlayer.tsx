import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import style from "../../pages/players/player.module.sass";
import { UserStore } from "../../stores/UserStore";
import { links } from "../header/header";

const CreatePlayer = observer(() => {
  const router = useRouter();
  const userStore = useInjection(UserStore);
  const [create, setCreate] = useState<boolean>(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    league: "pro",
  });
  const onFieldChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const startCreate = () => {

    setCreate(true);
  };
  const changeLeague = (e: any) => {

    setForm({ ...form, league: e.target.value });
  };
  const registration = () => {
    userStore.register(form, true).then((res) => {
      if (res) {
        toast.success("Succesfully created");
        setCreate(false)
      } else {
        console.log("object");
        toast.error("Invalid credentials");
      }
    });
  };
  return (
    <div>
      <div className={style.auth} style={{ display: create ? "flex" : "none" }}>
        <input
          placeholder="Fullname"
          value={form.fullname}
          name="fullname"
          onChange={onFieldChange}
        />
        <input
          placeholder="Email"
          value={form.email}
          name="email"
          onChange={onFieldChange}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          name="password"
          onChange={onFieldChange}
        />
         <select onChange={changeLeague}>
          {links.map((el, i) => {
            return (
              <option value={el.link.replace('/','')} key={i}>
                {el.title}
              </option>
            );
          })}
        </select>
          <button onClick={registration} disabled={form.email===''||form.fullname===''||form.password===''}>Создать игрока</button>
        
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
export default CreatePlayer;
