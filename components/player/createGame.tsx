import { useInjection } from "inversify-react";
import { useEffect, useRef, useState } from "react";
import { UserStore } from "../../stores/UserStore";
import Header, { links } from "../header/header";
import { PlayerProps } from "./player";
import style from "../../pages/players/player.module.sass";
import { observer } from "mobx-react";
import { IFetchProfileResponseData } from "../../api/profile";
import { GamesStore } from "../../stores/GamesStore";
import { SeasonsStore } from "../../stores/SeasonsStore";
export interface ISet {
  firstResult?: string;
  secondResult?: string;
}
interface IPlayers {
  winner: string;
  loser: string;
}
const CrateGame = observer(() => {
  const userStore = useInjection(UserStore);
  const gamesStore = useInjection(GamesStore);
  const seasonStore = useInjection(SeasonsStore);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [league, setLeague] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const one: any = useRef();
  const two: any = useRef();
  const three: any = useRef();
  const four: any = useRef();
  const five: any = useRef();
  const six: any = useRef();
  const [players, setPlayers] = useState<IPlayers>({
    winner: "",
    loser: "",
  });
  const [firstSet, setFirstSet] = useState<ISet>({
    firstResult: "",
    secondResult: "",
  });
  const [secondSet, setSecondSet] = useState<ISet>({
    firstResult: "",
    secondResult: "",
  });
  const [thirdSet, setThirdSet] = useState<ISet>({
    firstResult: "",
    secondResult: "",
  });
  const createGame = ()=>{
    gamesStore.createGame(seasonStore.currentSeason, league, players.winner, players.loser, firstSet, secondSet, visible ? thirdSet : undefined)
  }
  const onPaste = (e: any) => {
    const pastedText = Array.from(
      e.clipboardData.getData("Text").toUpperCase()
    );
    const pastedLength = Array.from(e.clipboardData.getData("Text")).length;
    one.current.value = pastedLength >= 1 ? pastedText[0] : "";
    two.current.value = pastedLength >= 2 ? pastedText[1] : "";
    three.current.value = pastedLength >= 3 ? pastedText[2] : "";
    four.current.value = pastedLength >= 4 ? pastedText[3] : "";
    five.current.value = pastedLength >= 5 ? pastedText[4] : "";
    six.current.value = pastedLength >= 6 ? pastedText[5] : "";
    setFirstSet({
      //@ts-ignore
      firstResult: pastedLength >= 1 ? pastedText[0] : "",
       //@ts-ignore
      secondResult: pastedLength >= 2 ? pastedText[1] : "",
    });
    setSecondSet({
       //@ts-ignore
      firstResult: pastedLength >= 3 ? pastedText[2] : "",
       //@ts-ignore
      secondResult: pastedLength >= 4 ? pastedText[3] : "",
    });
    setThirdSet({
       //@ts-ignore
      firstResult: pastedLength >= 5 ? pastedText[4] : "",
       //@ts-ignore
      secondResult: pastedLength >= 6 ? pastedText[5] : "",
    });
  };
  const [create, setCreate] = useState<boolean>(false);
  const getLeague = (e: any) => {
    setPlayers({
      winner: "",
      loser: "",
    });
    setLeague(e.target.value);
    userStore.getUsersByLeague(e.target.value.replace("/", ""));
  };
  const changeFirstSet = (e: any, nextRef: any) => {
    setFirstSet({ ...firstSet, [e.target.name]: e.target.value.toUpperCase() });
    if (e.target.value.length === 1 && nextRef) {
      nextRef.current?.focus();
    }
  };
  const changeSecondSet = (e: any, nextRef: any) => {
    setSecondSet({
      ...secondSet,
      [e.target.name]: e.target.value.toUpperCase(),
    });
    if (e.target.value.length === 1 && nextRef) {
      nextRef.current?.focus();
    }
  };
  const changeThirdSet = (e: any, nextRef: any, currentRef?: any) => {
    setThirdSet({ ...thirdSet, [e.target.name]: e.target.value.toUpperCase() });
    if (e.target.value.length === 1 && nextRef) {
      nextRef.current?.focus();
    }
    if (currentRef) {
      currentRef.current.blur();
    }
  };
  useEffect(() => {
    if (userStore.users?.length && userStore.users.length >= 2) {
      setPlayers({
        winner: userStore.users[0]._id,
        loser: userStore.users[1]._id,
      });
    }
  }, [userStore.users]);

  const choosePlayers = (e: any) => {
    setPlayers({ ...players, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (players.winner !== "" || players.loser !== "") {
      setShowScore(true);
    } else {
      setShowScore(false);
    }
  }, [players]);
  console.log(firstSet, secondSet, thirdSet);

  const startCreate = () => {
    setLeague("pro");
    userStore.getUsersByLeague("pro");
    setCreate(true);
  };

  return (
    <div className={style.admin_point}>
      <div
        className={style.admin_col}
        style={{ display: create ? "flex" : "none" }}
      >
        <select onChange={getLeague}>
          {links.map((el, i) => {
            return (
              <option value={el.link} key={i}>
                {el.title}
              </option>
            );
          })}
        </select>
        <div
          className={style.admin_row}
          style={{
            display:
              league !== "" && userStore.users?.length !== 0 ? "flex" : "none",
          }}
        >
          <div>
            <p>winner</p>
            <select name="winner" onChange={choosePlayers}>
              {userStore.users &&
                userStore.users?.map((el, i) => {
                  if (el._id !== players.loser) {
                    return (
                      <option key={i} value={el._id}>
                        {el.fullname}
                      </option>
                    );
                  }
                })}
            </select>
          </div>
          <div>
            <p>loser</p>
            <select name="loser" onChange={choosePlayers}>
              {userStore.users &&
                userStore.users?.map((el, i) => {
                  if (el._id !== players.winner) {
                    return (
                      <option key={i} value={el._id}>
                        {el.fullname}
                      </option>
                    );
                  }
                })}
            </select>
          </div>
        </div>
        <div style={{ display: showScore ? "flex" : "none" }}>
          <div className={style.pins}>
            <div className={style.pinsGroup}>
              <label>
                <input
                  type="number"
                   //@ts-ignore
                  value={parseInt(firstSet.firstResult)}
                  onChange={(e: any) =>
                    e.nativeEvent.inputType !== "insertFromPaste" &&
                    changeFirstSet(e, two)
                  }
                  min="0"
                  max={7}
                  name="firstResult"
                  ref={one}
                  placeholder=""
                  autoComplete="dsbl"
                  maxLength={1}
                  onPaste={onPaste}
                />
              </label>
              :
              <label>
                <input
                  type="number"
                   //@ts-ignore
                  value={parseInt(firstSet.secondResult)}
                  onChange={(e: any) =>
                    e.nativeEvent.inputType !== "insertFromPaste" &&
                    changeFirstSet(e, three)
                  }
                  min="0"
                  max={7}
                  name="secondResult"
                  ref={two}
                  placeholder=""
                  autoComplete="dsbl"
                  onPaste={onPaste}
                  maxLength={1}
                />
              </label>
            </div>
            <div className={style.pinsGroup}>
              <label>
                <input
                  type="number"
                   //@ts-ignore
                  value={parseInt(secondSet.firstResult)}
                  onChange={(e: any) =>
                    e.nativeEvent.inputType !== "insertFromPaste" &&
                    changeSecondSet(e, four)
                  }
                  min="0"
                  max={7}
                  name="firstResult"
                  ref={three}
                  placeholder=""
                  onPaste={onPaste}
                  autoComplete="dsbl"
                  maxLength={1}
                />
              </label>
              :{/* <div className="pins-delimiter">-</div> */}
              <label>
                <input
                  type="number"
                   //@ts-ignore
                  value={parseInt(secondSet.secondResult)}
                  onPaste={onPaste}
                  min="0"
                  max={7}
                  onChange={(e: any) =>
                    e.nativeEvent.inputType !== "insertFromPaste" &&
                    changeSecondSet(e, five)
                  }
                  name="secondResult"
                  ref={four}
                  placeholder=""
                  autoComplete="dsbl"
                  maxLength={1}
                />
              </label>
            </div>
            {visible ? (
              <div className={style.pinsGroup}>
                <label>
                  <input
                    type="number"
                    name="firstResult"
                    min="0"
                    max={7}
                    onPaste={onPaste}
                    ref={five}
                     //@ts-ignore
                    value={parseInt(thirdSet.firstResult)}
                    onChange={(e: any) =>
                      e.nativeEvent.inputType !== "insertFromPaste" &&
                      changeThirdSet(e, six)
                    }
                    placeholder=""
                    autoComplete="dsbl"
                    maxLength={1}
                  />
                </label>
                :
                <label>
                  <input
                    type="number"
                     //@ts-ignore
                    value={parseInt(thirdSet.secondResult)}
                    onPaste={onPaste}
                    min="0"
                    max={7}
                    onChange={(e: any) =>
                      e.nativeEvent.inputType !== "insertFromPaste" &&
                      changeThirdSet(e, null, six)
                    }
                    name="secondResult"
                    ref={six}
                    placeholder=""
                    autoComplete="dsbl"
                    maxLength={1}
                  />
                </label>
              </div>
            ) : (
              <button
                onClick={() => {
                  setVisible(true);
                }}
              >
                add
              </button>
            )}
          </div>
        </div>
        <button
          style={{ display: "block" }}
          disabled={
            secondSet.secondResult === "" ||
            secondSet.secondResult === "" ||
            (visible && thirdSet.secondResult === "")
          }
          onClick={createGame}
        >
          Создать игру
        </button>
      </div>
      <button
        style={{ display: !create ? "block" : "none" }}
        onClick={() => startCreate()}
      >
        Создать игру
      </button>
    </div>
  );
});
export default CrateGame;
