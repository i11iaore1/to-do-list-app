import { Link, useNavigate } from "react-router-dom";
import { RememberMeSection, SexInputSection } from "../blocks/secondary";
import { UserContext } from "../App";
import { useState, useContext, useRef } from "react";
import {
  ACCESS_TOKEN,
  API_URL,
  REFRESH_TOKEN,
  USER_INFO,
  USER_TASKS,
  USER_GROUPS,
} from "../constants";

function RegisterTabContent() {
  const navigate = useNavigate();
  const { setStoredAs, setCurrentUser, setUserTasks, setUserGroups } =
    useContext(UserContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [sex, setSex] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const rememberMeRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleRegister() {
    if (email && username && sex !== null && birthDate && password) {
      if (password !== passwordRepeat) {
        setError("Your passwords do not match");
        return;
      }
    } else {
      setError("Fill in all the required fields");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(API_URL + "/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          sex: sex,
          birth_date: birthDate,
        }),
      });

      if (response.status !== 201) {
        setError("An error occurred while registering. Please try again.");
        setIsLoading(false);
        return;
      }

      const userData = await response.json();

      // console.log(userData);

      if (rememberMeRef.current.checked) {
        localStorage.setItem(REFRESH_TOKEN, userData.refresh);
        localStorage.setItem(ACCESS_TOKEN, userData.access);
        localStorage.setItem(USER_INFO, JSON.stringify(userData.user));
        localStorage.setItem(USER_TASKS, JSON.stringify([]));
        localStorage.setItem(USER_GROUPS, JSON.stringify([]));
        setStoredAs(1);
      } else {
        sessionStorage.setItem(REFRESH_TOKEN, userData.refresh);
        sessionStorage.setItem(ACCESS_TOKEN, userData.access);
        sessionStorage.setItem(USER_INFO, JSON.stringify(userData.user));
        sessionStorage.setItem(USER_TASKS, JSON.stringify([]));
        sessionStorage.setItem(USER_GROUPS, JSON.stringify([]));
        setStoredAs(2);
      }

      setCurrentUser(userData.user);
      setUserTasks([]);
      setUserGroups([]);

      navigate("/mytasks");
    } catch (error) {
      setError("An error occurred while registering. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-[var(--gap)] bg-[linear-gradient(0deg,rgba(var(--third)),rgba(var(--first)))] min-h-[calc(100vh-var(--diameter))]">
      <div className="m-auto flex flex-col gap-y-[var(--gap)] max-w-[25em] overflow-y-auto p-[var(--gap)] bg-second rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first">
        <input
          type="text"
          placeholder="User name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input w-full"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full"
        />
        <SexInputSection sex={sex} setSex={setSex} />
        <input
          type="date"
          data-testid={"birth-date-input"}
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="input w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full"
        />
        <input
          type="password"
          placeholder="Repeat password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          className="input w-full"
        />
        <RememberMeSection ref={rememberMeRef} />
        <button
          data-testid="register-button"
          disabled={isLoading}
          onClick={handleRegister}
          className="flex w-full justify-center items-center h-[var(--diameter)] p-[var(--gap)] text-[length:var(--bigger-font-size)] font-bold text-first border-[length:var(--border-width)] rounded-[var(--gap)] border-solid border-first bg-third cursor:hover:bg-first cursor:hover:text-ta active:!bg-fint active:!border-fint active:!text-ta select-none disabled:!bg-fint disabled:!border-fint disabled:!text-ta"
        >
          Register
        </button>
        <Link
          to={"/signin"}
          className="mt-[var(--gap)] mx-auto underline text-[length:var(--normal-font-size)] text-fa w-fit cursor-pointer active:!text-fai select-none"
        >
          I already have an account
        </Link>
        {error && (
          <div className="p-[var(--gap)] mx-auto text-[length:var(--normal-font-size)] text-error w-fit">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterTabContent;
