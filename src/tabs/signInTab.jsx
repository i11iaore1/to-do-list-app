import { Link, useNavigate } from "react-router-dom";
import { ChecboxSection } from "../blocks/secondary";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../App";

function SignInTabContent() {
  const navigate = useNavigate();
  const { setCurrentUser, setUserTasks, setUserGroups } =
    useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const rememberMeRef = useRef(null);
  const [error, setError] = useState(null);

  async function handleSignIn() {
    try {
      let response = await fetch(`http://localhost:8000/users?email=${email}`);
      const users = await response.json();
      const user = users[0];
      // console.log(user);

      if (user.password !== password) {
        throw Error("Invalid password");
      }

      if (rememberMeRef.current.checked) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      const tasksPromises = user.tasks.map((taskId) =>
        fetch(`http://localhost:8000/tasks/${taskId}`).then((response) =>
          response.json()
        )
      );
      const tasksData = await Promise.all(tasksPromises);

      fetch(`http://localhost:8000/groups?members_like=${user.id}`);
      response = await fetch("http://localhost:8000/groups");
      const groups = await response.json();
      // console.log(groups);
      const userGroups = groups.filter((group) =>
        group.members.includes(user.id)
      );
      // console.log(userGroups);

      setCurrentUser(user);
      setUserTasks(tasksData);
      setUserGroups(userGroups);

      navigate("/mytasks");
    } catch (error) {
      setError("" + error);
      console.log(error);
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full"
        />
        <ChecboxSection ref={rememberMeRef} />
        <button
          onClick={handleSignIn}
          className="flex w-full justify-center items-center h-[var(--diameter)] p-[var(--gap)] text-[length:var(--bigger-font-size)] font-bold text-first border-[length:var(--border-width)] rounded-[var(--gap)] border-solid border-first bg-third cursor:hover:bg-first cursor:hover:text-ta active:bg-fint active:border-fint active:text-ta select-none"
        >
          Sign in
        </button>
        <Link
          to={"/register"}
          className="mt-[var(--gap)] mx-auto underline text-[length:var(--normal-font-size)] text-fa w-fit cursor-pointer active:text-fai select-none"
        >
          I don't have an account yet
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

export default SignInTabContent;
