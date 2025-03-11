import { Link } from "react-router-dom";
import { ChecboxSection } from "../blocks/secondary";

function SignInTabContent() {
  return (
    <div className="p-[var(--gap)] bg-[linear-gradient(0deg,rgba(var(--third)),rgba(var(--first)))] min-h-[calc(100vh-var(--diameter))]">
      <div className="m-auto flex flex-col gap-y-[var(--gap)] max-w-[25em] overflow-y-auto p-[var(--gap)] bg-second rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first">
        <input type="text" placeholder="Email" className="input w-full" />
        <input type="text" placeholder="Password" className="input w-full" />
        <ChecboxSection />
        <button className="flex w-full justify-center items-center h-[var(--diameter)] p-[var(--gap)] text-[length:var(--bigger-font-size)] font-bold text-first border-[length:var(--border-width)] rounded-[var(--gap)] border-solid border-first bg-third hover:bg-first hover:text-ta active:bg-fint active:border-fint active:text-ta select-none">
          Sign in
        </button>
        <div className="mt-[var(--gap)] mx-auto underline text-[length:var(--normal-font-size)] text-fa w-fit cursor-pointer active:text-fai select-none">
          <Link to={"/register"}>I don't have an account yet</Link>
        </div>
      </div>
    </div>
  );
}

export default SignInTabContent;
