import { Link } from "react-router-dom";
import { ChecboxSection } from "../blocks/secondary";
import { UserContext } from "../App";
import { useContext, useRef } from "react";

function RegisterTabContent() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const emailRef = useRef();
  const usernameRef = useRef();
  const sexRef = useRef();
  const birthDateRef = useRef();
  const passwordRef = useRef();
  const passwordRepeatRef = useRef();
  const rememberMeRef = useRef();

  function handleSubmit() {
    const email = emailRef.current.value;
    const userName = usernameRef.current.value;
    const sex = sexRef.current.value;
    const birthDate = birthDateRef.current.value;
    const password = passwordRef.current.value;
    const passwordRepeat = passwordRepeatRef.current.value;
    const rememberMe = rememberMeRef.current.value;

    if (
      email &&
      userName &&
      sex &&
      birthDate &&
      password &&
      password === passwordRepeat
    ) {
      setCurrentUser({});

      if (rememberMe) {
        // createCoockie
      }
    }
  }

  return (
    <div className="p-[var(--gap)] bg-[linear-gradient(0deg,rgba(var(--third)),rgba(var(--first)))] min-h-[calc(100vh-var(--diameter))]">
      <div className="m-auto flex flex-col gap-y-[var(--gap)] max-w-[25em] overflow-y-auto p-[var(--gap)] bg-second rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first">
        <input
          ref={emailRef}
          type="text"
          placeholder="Email"
          className="input w-full"
        />
        <input
          ref={usernameRef}
          type="text"
          placeholder="User name"
          className="input w-full"
        />
        <input
          ref={sexRef}
          type="text"
          placeholder="Sex"
          className="input w-full"
        />
        <input
          ref={birthDateRef}
          type="date"
          placeholder="Birth date"
          className="input w-full"
        />
        <input
          ref={passwordRef}
          type="text"
          placeholder="Password"
          className="input w-full"
        />
        <input
          ref={passwordRepeatRef}
          type="text"
          placeholder="Repeat password"
          className="input w-full"
        />
        <ChecboxSection ref={rememberMeRef} />
        <button className="flex w-full justify-center items-center h-[var(--diameter)] p-[var(--gap)] text-[length:var(--bigger-font-size)] font-bold text-first border-[length:var(--border-width)] rounded-[var(--gap)] border-solid border-first bg-third hover:bg-first hover:text-ta active:bg-fint active:border-fint active:text-ta select-none transition">
          Register
        </button>
        <div className="mt-[var(--gap)] mx-auto underline text-[length:var(--normal-font-size)] text-fa w-fit cursor-pointer active:text-fai select-none">
          <Link to={"/signin"}>I already have an account</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterTabContent;
