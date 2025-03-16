import { Link, useNavigate } from "react-router-dom";
import { ChecboxSection } from "../blocks/secondary";
import { UserContext } from "../App";
import { useState, useContext, useRef } from "react";

function RegisterTabContent() {
  const navigate = useNavigate();
  const { setCurrentUser, setUserTasks, setUserGroups } =
    useContext(UserContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [sex, setSex] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const rememberMeRef = useRef(null);
  const [error, setError] = useState(null);

  async function handleRegister() {
    if (
      email &&
      username &&
      sex &&
      birthDate &&
      password &&
      password === passwordRepeat
    ) {
      try {
        const existingUserResponse = await fetch(
          `http://localhost:8000/users?email=${email}`
        );
        const existingUsers = await existingUserResponse.json();

        if (existingUsers.length > 0) {
          throw Error("A user with this email already exists.");
        }

        const user = {
          name: username,
          email: email,
          password: password,
          sex: sex,
          birth_date: birthDate.split("-").reverse().join("."),

          tasks: [],
        };

        const response = await fetch("http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const createdUser = await response.json();
        setCurrentUser(createdUser);
        setUserTasks([]);
        setUserGroups([]);

        if (rememberMeRef.current.checked) {
          localStorage.setItem("user", JSON.stringify(createdUser));
        }

        navigate("/myprofile");
      } catch (error) {
        setError("An error occurred while registering. Please try again.");
        console.error(error);
      }
    } else {
      setError("Fill in all the required fields");
    }
  }

  return (
    <div className="p-[var(--gap)] bg-[linear-gradient(0deg,rgba(var(--third)),rgba(var(--first)))] min-h-[calc(100vh-var(--diameter))]">
      <div className="m-auto flex flex-col gap-y-[var(--gap)] max-w-[25em] overflow-y-auto p-[var(--gap)] bg-second rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full"
        />
        <input
          type="text"
          placeholder="User name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input w-full"
        />
        <input
          type="text"
          placeholder="Sex"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="input w-full"
        />
        <input
          type="date"
          placeholder="Birth date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="input w-full"
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full"
        />
        <input
          type="text"
          placeholder="Repeat password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          className="input w-full"
        />
        <ChecboxSection ref={rememberMeRef} />
        <button
          onClick={handleRegister}
          className="flex w-full justify-center items-center h-[var(--diameter)] p-[var(--gap)] text-[length:var(--bigger-font-size)] font-bold text-first border-[length:var(--border-width)] rounded-[var(--gap)] border-solid border-first bg-third cursor:hover:bg-first cursor:hover:text-ta active:bg-fint active:border-fint active:text-ta select-none "
        >
          Register
        </button>
        <Link
          to={"/signin"}
          className="mt-[var(--gap)] mx-auto underline text-[length:var(--normal-font-size)] text-fa w-fit cursor-pointer active:text-fai select-none"
        >
          I already have an account
        </Link>
        {error && (
          <div className="mt-[var(--gap)] mx-auto text-[length:var(--normal-font-size)] text-error w-fit">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterTabContent;
