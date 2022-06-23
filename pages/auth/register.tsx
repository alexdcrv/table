import { useInjection } from "inversify-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { links } from "../../components/header/header";
import { UserStore } from "../../stores/UserStore";
import s from "./auth.module.sass";

const Register = () => {
  const router = useRouter();
  const userStore = useInjection(UserStore);
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    league: "pro",
  });
  const onFieldChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const changeLeague = (e: any) => {

    setForm({ ...form, league: e.target.value });
  };
  const registration = () => {
    userStore.register(form).then((res) => {
      if (res) {
        router.push(`../../players/${res}`);
      } else {
        console.log("object");
        toast.error("Invalid credentials");
      }
    });
  };
  return (
    <div className={s.auth}>
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
            <option value={el.link.replace("/", "")} key={i}>
              {el.title}
            </option>
          );
        })}
      </select>
      <div className={s.register}>
        <Link href="/">
          <button>CANCEL</button>
        </Link>
        <button onClick={registration}>REGISTER</button>
      </div>
    </div>
  );
};
export default Register;
