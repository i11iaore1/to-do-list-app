import {render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInTabContent from "../signInTab.jsx";
import {BrowserRouter} from "react-router-dom";
import {UserContext} from "../../App.jsx";
import {REFRESH_TOKEN, ACCESS_TOKEN, USER_INFO, USER_TASKS, USER_GROUPS} from "../../constants.js";

const setStoredAs = vitest.fn();
const setCurrentUser = vitest.fn();
const setUserTasks = vitest.fn();
const setUserGroups = vitest.fn();

const userInfo = {
	id: 0,
	username: "username 1",
	email: "email@gmail.com",
	password: "password",
	sex: true,
	birth_date: "2000-08-24"
}

const {password, ...successfulResponseUserInfo} = userInfo;

const userGroups = [
		{
			"id": 0,
			"name": "group 1"
		}
	];

const userTasks = [
	{
		"id": 0,
		"name": "task 1",
		"description": "description 1",
		"deadline": "2019-08-24T14:15:22Z",
		"state": 0,
		"user": 0
	}
];

function fillInputsAndSubmit(email, password, rememberMe) {
	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Password");
	const signInButton = screen.getByText("Sign in");

	if (rememberMe) {
		const rememberMeInput = screen.getByRole("checkbox");
		fireEvent.click(rememberMeInput);
	}

	fireEvent.change(emailInput, { target: { value: email } });
	fireEvent.change(passwordInput, { target: { value: password } });
	fireEvent.click(signInButton);
}

describe("Sign in tab", () => {
	beforeEach(() => {
		global.fetch = vitest.fn(() =>
			Promise.resolve({
				status: 200,
				json: () => Promise.resolve({
					refresh: "refresh_token",
					access: "access_token",
					user: successfulResponseUserInfo,
					groups: userGroups,
					tasks: userTasks
				})
			})
		);
	});

	beforeEach(() => {
		vi.spyOn(window.localStorage.__proto__, "setItem").mockImplementation(() => {});
		vi.spyOn(window.sessionStorage.__proto__, "setItem").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vitest.resetAllMocks();
	});

	test("Correct input values, remember me active", async () => {
		render(
			<BrowserRouter>
				<UserContext.Provider value={{setStoredAs, setCurrentUser, setUserTasks, setUserGroups}}>
					<SignInTabContent />
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit(userInfo.email, userInfo.password, true);

		const body = {
			email : userInfo.email,
			password: userInfo.password,
		};

		await waitFor(() => {
			expect(fetch).toHaveBeenCalledWith(
				expect.stringContaining("/api/login/"),
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body)
				}
			);
			expect(setStoredAs).toHaveBeenCalledWith(1);
			expect(localStorage.setItem).toHaveBeenCalledWith(REFRESH_TOKEN, "refresh_token");
			expect(localStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN, "access_token");
			expect(localStorage.setItem).toHaveBeenCalledWith(USER_INFO, JSON.stringify(successfulResponseUserInfo));
			expect(localStorage.setItem).toHaveBeenCalledWith(USER_TASKS, JSON.stringify(userTasks));
			expect(localStorage.setItem).toHaveBeenCalledWith(USER_GROUPS, JSON.stringify(userGroups));
			expect(setCurrentUser).toHaveBeenCalledWith(successfulResponseUserInfo);
			expect(setUserTasks).toHaveBeenCalledWith(userTasks);
			expect(setUserGroups).toHaveBeenCalledWith(userGroups);
		});
	});

	test("Correct input values, remember me inactive", async () => {
		render(
			<BrowserRouter>
				<UserContext.Provider value={{setStoredAs, setCurrentUser, setUserTasks, setUserGroups}}>
					<SignInTabContent />
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit(userInfo.email, userInfo.password, false);

		const body = {
			email : userInfo.email,
			password: userInfo.password,
		};

		await waitFor(() => {
			expect(fetch).toHaveBeenCalledWith(
				expect.stringContaining("/api/login/"),
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body)
				}
			);
			expect(setStoredAs).toHaveBeenCalledWith(2);
			expect(sessionStorage.setItem).toHaveBeenCalledWith(REFRESH_TOKEN, "refresh_token");
			expect(sessionStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN, "access_token");
			expect(sessionStorage.setItem).toHaveBeenCalledWith(USER_INFO, JSON.stringify(successfulResponseUserInfo));
			expect(sessionStorage.setItem).toHaveBeenCalledWith(USER_TASKS, JSON.stringify(userTasks));
			expect(sessionStorage.setItem).toHaveBeenCalledWith(USER_GROUPS, JSON.stringify(userGroups));
			expect(setCurrentUser).toHaveBeenCalledWith(successfulResponseUserInfo);
			expect(setUserTasks).toHaveBeenCalledWith(userTasks);
			expect(setUserGroups).toHaveBeenCalledWith(userGroups);
		});
	});

	test("Incorrect input values, no email", async () => {
		render(
			<BrowserRouter>
				<UserContext.Provider value={{setStoredAs, setCurrentUser, setUserTasks, setUserGroups}}>
					<SignInTabContent />
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit("", userInfo.password, true);
		await waitFor(() => {
			expect(fetch).not.toHaveBeenCalled();
			expect(setStoredAs).not.toHaveBeenCalled();
			expect(sessionStorage.setItem).not.toHaveBeenCalled();
			expect(setCurrentUser).not.toHaveBeenCalled();
			expect(setUserTasks).not.toHaveBeenCalled();
			expect(setUserGroups).not.toHaveBeenCalled();
		});
	});

	test("Incorrect input values, incorrect email", async () => {
		render(
			<BrowserRouter>
				<UserContext.Provider value={{setStoredAs, setCurrentUser, setUserTasks, setUserGroups}}>
					<SignInTabContent />
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit("incorrect_email", userInfo.password, true);

		const body = {
			email : "incorrect_email",
			password: userInfo.password,
		};

		await waitFor(() => {
			expect(fetch).toHaveBeenCalledWith(
				expect.stringContaining("/api/login/"),
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body)
				}
			);
			expect(setStoredAs).not.toHaveBeenCalled();
			expect(sessionStorage.setItem).not.toHaveBeenCalled();
			expect(setCurrentUser).not.toHaveBeenCalled();
			expect(setUserTasks).not.toHaveBeenCalled();
			expect(setUserGroups).not.toHaveBeenCalled();
		});
	});
});
