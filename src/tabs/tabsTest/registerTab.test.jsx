import {render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterTabContent from "../registerTab.jsx";
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

function fillInputsAndSubmit(username, email, password, passwordRepeat, sex, birthDate, rememberMe) {
	const usernameInput = screen.getByPlaceholderText("User name");
	const emailInput = screen.getByPlaceholderText("Email");
	const birthDateInput = screen.getByTestId("birth-date-input");
	const passwordInput = screen.getByPlaceholderText("Password");
	const repeatPasswordInput = screen.getByPlaceholderText("Repeat password");
	const registerButton = screen.getByText("Register");

	if (sex === true) {
		const maleInput = screen.getByText("male");
		fireEvent.click(maleInput);
	} else if (sex === false) {
		const femaleInput = screen.getByText("female");
		fireEvent.click(femaleInput);
	}

	if (rememberMe) {
		const rememberMeInput = screen.getByRole("checkbox");
		fireEvent.click(rememberMeInput);
	}

	fireEvent.change(usernameInput, { target: { value: username } });
	fireEvent.change(emailInput, { target: { value: email } });
	fireEvent.change(birthDateInput, { target: { value: birthDate } });
	fireEvent.change(passwordInput, { target: { value: password } });
	fireEvent.change(repeatPasswordInput, { target: { value: passwordRepeat } });
	fireEvent.click(registerButton);
}

describe("Register tab", () => {
	beforeEach(() => {
		global.fetch = vitest.fn(() =>
			Promise.resolve({
				status: 201,
				json: () => Promise.resolve({
					refresh: "refresh_token",
					access: "access_token",
					user: successfulResponseUserInfo
				})
			})
		);
		vi.spyOn(window.localStorage.__proto__, "setItem").mockImplementation(() => {});
		vi.spyOn(window.sessionStorage.__proto__, "setItem").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vitest.resetAllMocks();
	});

	test("Correct input values, male, remember me active", async () => {
		const {password, ...returnedUserInfo} = userInfo;

		render(
			<BrowserRouter>
				<UserContext.Provider value={{setStoredAs, setCurrentUser, setUserTasks, setUserGroups}}>
					<RegisterTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit(userInfo.username, userInfo.email, userInfo.password, userInfo.password, true, userInfo.birth_date, true);

		const {id, ...body} = userInfo;

		await waitFor(() => {
				expect(fetch).toHaveBeenCalledWith(
				expect.stringContaining("/api/register/"),
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body)
				}
			);
			expect(setStoredAs).toHaveBeenCalledWith(1);
			expect(localStorage.setItem).toHaveBeenCalledWith(REFRESH_TOKEN, "refresh_token");
			expect(localStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN, "access_token");
			expect(localStorage.setItem).toHaveBeenCalledWith(USER_INFO, JSON.stringify(returnedUserInfo));
			expect(localStorage.setItem).toHaveBeenCalledWith(USER_TASKS, JSON.stringify([]));
			expect(localStorage.setItem).toHaveBeenCalledWith(USER_GROUPS, JSON.stringify([]));
			expect(setCurrentUser).toHaveBeenCalledWith(returnedUserInfo);
			expect(setUserTasks).toHaveBeenCalledWith([]);
			expect(setUserGroups).toHaveBeenCalledWith([]);
		});
	});

	test("Correct input values, female, remember me inactive", async () => {
		const {password, ...returnedUserInfo} = userInfo;

		render(
			<BrowserRouter>
				<UserContext.Provider value={{setStoredAs, setCurrentUser, setUserTasks, setUserGroups}}>
					<RegisterTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit(userInfo.username, userInfo.email, userInfo.password, userInfo.password, false, userInfo.birth_date, false);

		let {id, ...body} = userInfo;
		body = {...body, sex: false};

		await waitFor(() => {
			expect(fetch).toHaveBeenCalledWith(
				expect.stringContaining("/api/register/"),
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body)
				}
			);
			expect(setStoredAs).toHaveBeenCalledWith(2);
			expect(sessionStorage.setItem).toHaveBeenCalledWith(REFRESH_TOKEN, "refresh_token");
			expect(sessionStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN, "access_token");
			expect(sessionStorage.setItem).toHaveBeenCalledWith(USER_INFO, JSON.stringify(returnedUserInfo));
			expect(sessionStorage.setItem).toHaveBeenCalledWith(USER_TASKS, JSON.stringify([]));
			expect(sessionStorage.setItem).toHaveBeenCalledWith(USER_GROUPS, JSON.stringify([]));
			expect(setCurrentUser).toHaveBeenCalledWith(returnedUserInfo);
			expect(setUserTasks).toHaveBeenCalledWith([]);
			expect(setUserGroups).toHaveBeenCalledWith([]);
		});
	});

	test("Incorrect input values, no username", async () => {
		render(
			<BrowserRouter>
				<UserContext.Provider value={{setStoredAs, setCurrentUser, setUserTasks, setUserGroups}}>
					<RegisterTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit("", userInfo.email, userInfo.password, userInfo.password, true, userInfo.birth_date, false);

		await waitFor(() => {
			expect(fetch).not.toHaveBeenCalled();
			expect(setStoredAs).not.toHaveBeenCalled();
			expect(sessionStorage.setItem).not.toHaveBeenCalled();
		});
	});

	test("Incorrect input values, no email", async () => {
		render(
			<BrowserRouter>
				<UserContext.Provider value={{setStoredAs, setCurrentUser, setUserTasks, setUserGroups}}>
					<RegisterTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit(userInfo.username, "", userInfo.password, userInfo.password, true, userInfo.birth_date, false);

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
					<RegisterTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit(userInfo.username, "incorrect_email", userInfo.password, userInfo.password, true, userInfo.birth_date, false);

		let {id, ...body} = userInfo;
		body = {...body, sex: true, email: "incorrect_email"};

		await waitFor(() => {
			expect(fetch).toHaveBeenCalledWith(
				expect.stringContaining("/api/register/"),
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

	test("Incorrect input values, empty password and password repeat", async () => {
		render(
			<BrowserRouter>
				<UserContext.Provider value={{setStoredAs, setCurrentUser, setUserTasks, setUserGroups}}>
					<RegisterTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit(userInfo.username, userInfo.email, "", "", true, userInfo.birth_date, false);

		await waitFor(() => {
			expect(fetch).not.toHaveBeenCalled();
			expect(setStoredAs).not.toHaveBeenCalled();
			expect(sessionStorage.setItem).not.toHaveBeenCalled();
			expect(setCurrentUser).not.toHaveBeenCalled();
			expect(setUserTasks).not.toHaveBeenCalled();
			expect(setUserGroups).not.toHaveBeenCalled();
		});
	});

	test("Incorrect input values, sex not chosen", async () => {
		render(
			<BrowserRouter>
				<UserContext.Provider value={{setStoredAs, setCurrentUser, setUserTasks, setUserGroups}}>
					<RegisterTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		fillInputsAndSubmit(userInfo.username, userInfo.email, userInfo.password, userInfo.password, null, userInfo.birth_date, false);

		await waitFor(() => {
			expect(fetch).not.toHaveBeenCalled();
			expect(setStoredAs).not.toHaveBeenCalled();
			expect(sessionStorage.setItem).not.toHaveBeenCalled();
			expect(setCurrentUser).not.toHaveBeenCalled();
			expect(setUserTasks).not.toHaveBeenCalled();
			expect(setUserGroups).not.toHaveBeenCalled();
		});
	});
});
