import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EditableFields, leagues } from "../../pages/players/[id]";
import { rightLegaues, UserStore } from "../../stores/UserStore";
import Header from "../header/header";
import style from "../../pages/players/player.module.sass";
export interface PlayerProps {
    data: {
        mainhand: string
        backhand: string
    }
    league: string
    setData: any
    setLeague: any
}
const Player = observer(({data, setData,league, setLeague}:PlayerProps) =>{


    const [edit, setEdit] = useState<boolean>(false);
    const userStore = useInjection(UserStore);


    useEffect(() => {
        return () => {
            userStore.clearUser();
        };
    }, []);

    const changeUser = () => {
        setEdit(!edit);
        if (edit && userStore?.me?._id) {
        const id = userStore?.me?._id;
        userStore.changeUser(data, id, league);
        }
    };

    const changeField = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const changeLeague = (e: any) => {
        setLeague(e.target.value);
    };
    
    console.log("%c[id].tsx line:42 data", "color: #007acc;", data, league);

    const editableField = (field: string, value: string, props: string[]) => {
        if (!edit) {
        return <p className={style.value}>{value}</p>;
        } else {
        return (
            <select
            defaultValue={value}
            onChange={field === "league" ? changeLeague : changeField}
            name={field}
            >
            {!props.includes(value) && <option>{value}</option>}
            {props.map((prop, i) => {
                return <option key={i}>{prop}</option>;
            })}
            </select>
            //  <input className={style.input} onChange={changeField} name={field} value={value}></input>
        );
        }
    };
    return (
        <div className={style.container}>
        <Header active="player" />
        <div className={style.player}>
            <div className={style.row}>
            <img className={style.player_img} src="/image 3.png" />

            <div className={style.info}>
                <div className={style.name}>
                <h1>{userStore.user?.fullname}</h1>
                <img
                    style={{
                    display: !edit ? "block" : "none",
                    cursor: "pointer",
                    }}
                    src="/edit.svg"
                    onClick={changeUser}
                />
                <button
                    style={{
                    display: edit ? "block" : "none",
                    cursor: "pointer",
                    }}
                    onClick={changeUser}
                >
                    Сохранить
                </button>
                </div>
                <div className={style.info_point}>
                <p>ЛИГА:</p>
                {editableField("league", league, leagues)}{" "}
                </div>
                <div className={style.info_point}>
                <p>ОСНОВНАЯ РУКА:</p>
                {editableField("mainhand", data.mainhand, [
                    "правая",
                    "левая",
                ])}{" "}
                </div>
                <div className={style.info_point}>
                <p>БЕКХЕНД:</p>
                {editableField("backhand", data.backhand, [
                    "двуручный",
                    "одноручный",
                ])}
                </div>
            </div>
            <div className={style.info}>
                <div className={style.info_point}>
                <h1>СТАТИСТИКА</h1>
                </div>
                <div className={style.info_point}>
                <p className={style.season}>ЭТОТ СЕЗОН </p>/
                <p className={style.season}> ВСЕ СЕЗОНЫ</p>{" "}
                </div>
                <div className={style.info_point}>
                <p>ГЕЙМЫ:</p> <p>22 : 10</p>
                </div>
                <div className={style.info_point}>
                <p>СЕТЫ:</p> <p>2 : 1</p>
                </div>
                <div className={style.info_point}>
                <p>ИГРЫ:</p> <p>4 : 2</p>
                </div>
                <div className={style.info_point}>
                <p>% ПОБЕД:</p> <p>66.6</p>
                </div>
                <div className={style.info_point}>
                <p>ОЧКИ:</p> <p>2.25</p>
                </div>
            </div>
            </div>
        </div>
        <div className={style.history}>
            <h1>HISTORY</h1>
            <div className={style.history_row}>
            <div>
                <img src="/win.svg"></img>ИВАНОВ БОРИС : ИВАН БОРИСОВ
            </div>
            <div>6:1 7:6</div>
            </div>
        </div>
        </div>
    );
    })
    export default Player