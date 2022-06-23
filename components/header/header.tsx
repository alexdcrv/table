import classNames from "classnames";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SeasonsStore } from "../../stores/SeasonsStore";
import { UserStore } from "../../stores/UserStore";
import style from "./header.module.sass";
export const links = [
  {
    title: "Высшая СМ",
    link: "/pro",
  },
  {
    title: "Первая Ж",
    link: "/firstF",
  },
  {
    title: "Первая М",
    link: "/firstM",
  },
  {
    title: "Начинающие СМ",
    link: "/begginers",
  },
];
const Header = observer(({ active }: { active: string }) => {
  const userStore = useInjection(UserStore);
  const seasontore = useInjection(SeasonsStore);
  const [visible, setVisible] = useState(false)
  useEffect(()=>{
    seasontore.getCurrentSeason()
  },[seasontore])
  return (
    <div className={style.container}>
      {links.map((el, i) => {
        return (
          <Link href={el.link} key={i}>
            <div
              style={{ cursor: "pointer" }}
              className={classNames(
                style.link,
                active === el.link && style.active
              )}
            >
              {el.title}
            </div>
          </Link>
        );
      })}
      {!userStore.isAuth ? (
        <Link href="/auth">
          <div style={{ cursor: "pointer" }} className={classNames(style.link)}>
            Войти
          </div>
        </Link>
      ) : (
        <div onMouseLeave={()=>{setVisible(false)}} onMouseEnter={()=>{setVisible(true)}}>
          <Link href={`/players/${userStore.me?._id}`}>
            <div
              style={{ cursor: "pointer" }}
              className={classNames(
                style.link,
                userStore.user?._id === userStore.me?._id && style.active
              )}
            >
              {userStore.me?.fullname}
            </div>
          </Link>
          <div
            onClick={()=>{userStore.logout()}}
              style={{ display: visible ? 'block' : 'none', cursor: "pointer", position:'absolute', marginTop:'0px' }}
              className={classNames(
                style.link,
                userStore.user?._id === userStore.me?._id && style.active
              )}
            >
            Выйти
            </div>
        </div>
      )}
    </div>
  );
});
export default Header;
