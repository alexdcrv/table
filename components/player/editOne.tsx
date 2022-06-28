import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserStore } from "../../stores/UserStore";
import style from "../../pages/players/player.module.sass";
import { IUser } from "../../api/profile";
import { links } from "../header/header";
export interface UserProps {
    user:IUser
}
export interface IEditForm {
    email:string
    fullname:string
    league?:string
}
const EditOne = observer(({user}:UserProps) => {
    const router = useRouter();
    const userStore = useInjection(UserStore);
    const [create, setCreate] = useState<boolean>(false);
    const [form, setForm] = useState<IUser>(user);
    const onFieldChange = (e: any) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    const startCreate = () => {
  
      setCreate(true);
    };
    const changeLeague = (e: any) => {
  
      setForm({ ...form, league: e.target.value });
    };
    const edit = () => {

    };
    useEffect(()=>{
        setForm(user)
    },[])
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

           <select onChange={changeLeague}defaultValue={form.league}>
            {links.map((el, i) => {
              return (
                <option value={el.link.replace('/','')} key={i}>
                  {el.title}
                </option>
              );
            })}
          </select>
            <button onClick={edit} >Сохранить</button>
          
        </div>
        <div
          className={style.admin_point}
          style={{ display: !create ? "block" : "none" }}
          onClick={() => startCreate()}
        >
          <button>{user.fullname}</button>
        </div>
      </div>
    );
  });
  export default EditOne;
  