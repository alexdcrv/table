import classNames from "classnames"
import { useInjection } from "inversify-react"
import { observer } from "mobx-react"
import Link from "next/link"
import { UserStore } from "../../stores/UserStore"
import style from "./table.module.sass"

const Table = observer(() =>{
    const userStore = useInjection(UserStore)
    console.log('%c[id].tsx line:24 res', 'color: #007acc;',userStore.users);
    return (
        <div className={style.container}>
            <div className={classNames(style.header)}>
                <div className={style.part}><b>NAME</b></div>
                <div className={style.part}><b>ГЕЙМЫ</b></div>
                <div className={style.part}><b>СЕТЫ</b></div>
                <div className={style.part}><b>ИГРЫ</b></div>
                <div className={style.part}><b>% ПОБЕД</b></div>
                <div className={style.part}><b>ПОСЛЕДНЯЯ ИГРА</b></div>
                <div className={style.part}><b>ОЧКИ</b></div>
            </div>
            {userStore.users && userStore.users.map((el, i)=>{
                return (
                    <Link href={`/players/${el._id}`}key={i}>
                        <div  className={classNames(style.row)}>
                            <div className={style.part}>{el.fullname}</div>
                            {/* <div className={style.part}>{el.matches}</div>
                            <div className={style.part}>{el.sets}</div> */}
                            <div className={style.part}>{el.wins}/{el.loses}</div>
                            {/* <div className={style.part}>{el.precentages}</div>
                            <div className={classNames(style.result,el.isWinner ? style.winner: style.loser)}>{el.lastGame}</div>
                            <div className={style.part}>{el.points}</div> */}
                        </div>
                    </Link>
                )
               
            })
              
            }
            
        </div>
    )
})
export default Table