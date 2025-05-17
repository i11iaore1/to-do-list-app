import { Link, useNavigate } from "react-router-dom";
import { RememberMeSection } from "../blocks/secondary";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../App";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_GROUPS,
  USER_INFO,
  USER_TASKS,
} from "../constants";
import { API_URL } from "../constants";

function SignInTabContent() {
  const navigate = useNavigate();
  const { setStoredAs, setCurrentUser, setUserTasks, setUserGroups } =
    useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const rememberMeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSignIn() {
    if (!(email && password)) {
      setError("Fill in all the required fields");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(API_URL + "/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status !== 200) {
        setError("An error occurred while signing in. Please try again.");
        setIsLoading(false);
        return;
      }

      const userData = await response.json();

      // console.log(userData);

      if (rememberMeRef.current.checked) {
        localStorage.setItem(REFRESH_TOKEN, userData.refresh);
        localStorage.setItem(ACCESS_TOKEN, userData.access);
        localStorage.setItem(USER_INFO, JSON.stringify(userData.user));
        localStorage.setItem(USER_TASKS, JSON.stringify(userData.tasks));
        localStorage.setItem(USER_GROUPS, JSON.stringify(userData.groups));
        setStoredAs(1);
      } else {
        sessionStorage.setItem(REFRESH_TOKEN, userData.refresh);
        sessionStorage.setItem(ACCESS_TOKEN, userData.access);
        sessionStorage.setItem(USER_INFO, JSON.stringify(userData.user));
        sessionStorage.setItem(USER_TASKS, JSON.stringify(userData.tasks));
        sessionStorage.setItem(USER_GROUPS, JSON.stringify(userData.groups));
        setStoredAs(2);
      }

      setCurrentUser(userData.user);
      setUserTasks(userData.tasks);
      setUserGroups(userData.groups);

      navigate("/mytasks");
    } catch (error) {
      setError("An error occurred while signing in. Please try again.");
      // console.error("Error during sign-in:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-[var(--gap)] bg-[linear-gradient(0deg,rgba(var(--third)),rgba(var(--first)))] min-h-[calc(100vh-var(--diameter))]">
      <div className="m-auto flex flex-col gap-y-[var(--gap)] max-w-[25em] overflow-y-auto p-[var(--gap)] bg-second rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first">
        <input
          data-testid="email-input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full"
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full"
        />
        <RememberMeSection ref={rememberMeRef} />
        <button
          data-testid="sign-in-button"
          disabled={isLoading}
          onClick={handleSignIn}
          className="flex w-full justify-center items-center h-[var(--diameter)] p-[var(--gap)] text-[length:var(--bigger-font-size)] font-bold text-first border-[length:var(--border-width)] rounded-[var(--gap)] border-solid border-first bg-third cursor:hover:bg-first cursor:hover:text-ta active:!bg-fint active:!border-fint active:!text-ta select-none disabled:!bg-fint disabled:!border-fint disabled:!text-ta"
        >
          Sign in
        </button>
        <Link
          to={"/register"}
          className="mt-[var(--gap)] mx-auto underline text-[length:var(--normal-font-size)] text-fa w-fit cursor-pointer active:!text-fai select-none"
        >
          I don't have an account yet
        </Link>
        {error && (
          <div data-testid="error-message" className="p-[var(--gap)] mx-auto text-[length:var(--normal-font-size)] text-error w-fit">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignInTabContent;
