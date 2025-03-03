import { ChecboxSection } from "../blocks/secondary";

function RegisterTabContent({ logIn, signInRedirect }) {
  return (
    <div className="p-[var(--gap)]">
      <div className="m-auto flex flex-col gap-y-[var(--gap)] max-w-[25em] overflow-y-auto p-[var(--gap)] bg-ls rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-lf">
        <input type="text" placeholder="Email" className="input w-full" />
        <input type="text" placeholder="User name" className="input w-full" />
        <input type="text" placeholder="Sex" className="input w-full" />
        <input type="date" placeholder="Birth date" className="input w-full" />
        <input type="text" placeholder="Password" className="input w-full" />
        <input
          type="text"
          placeholder="Repeat password"
          className="input w-full"
        />
        <ChecboxSection />
        <button
          onClick={logIn}
          className="flex w-full justify-center items-center h-[var(--diameter)] p-[var(--gap)] text-[length:var(--bigger-font-size)] font-bold text-lf border-[length:var(--border-width)] rounded-[var(--gap)] border-solid border-lf bg-lt hover:bg-lf hover:text-lt active:bg-lfb active:border-lfb active:text-lt select-none transition"
        >
          Register
        </button>
        <div
          onClick={signInRedirect}
          className="mt-[var(--gap)] mx-auto underline text-[length:var(--normal-font-size)] text-lf w-fit cursor-pointer active:text-lfb select-none"
        >
          I already have an account
        </div>
      </div>
    </div>
  );
}

export default RegisterTabContent;
