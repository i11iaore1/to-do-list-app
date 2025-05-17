import {render, screen, fireEvent} from "@testing-library/react";
import HomeTabContent from "../homeTab.jsx";
import {BrowserRouter} from "react-router-dom";
import {ThemeContext, UserContext} from "../../App.jsx";

describe("Home tab", () => {
	test("Dark theme, authorized user", () => {
		const theme = true;
		const currentUser = true;

		render(
			<BrowserRouter>
				<ThemeContext.Provider value={{theme}}>
					<UserContext.Provider value={{currentUser}}>
						<HomeTabContent/>
					</UserContext.Provider>
				</ThemeContext.Provider>
			</BrowserRouter>
		);

		// screen.debug();

		const invitationText = screen.queryByText(/Join us/i);
		const dateDashColorText = screen.getByTestId("date-dash-color");
		const timeDashColorText = screen.getByTestId("time-dash-color");

		expect(invitationText).not.toBeInTheDocument();
		expect(dateDashColorText).toHaveTextContent(/white/i);
		expect(timeDashColorText).toBeInTheDocument(/light blue/i);
	});

	test("Light theme, unauthorized user", () => {
		const theme = false;
		const currentUser = false;

		render(
			<BrowserRouter>
				<ThemeContext.Provider value={{theme}}>
					<UserContext.Provider value={{currentUser}}>
						<HomeTabContent/>
					</UserContext.Provider>
				</ThemeContext.Provider>
			</BrowserRouter>
		);

		// screen.debug();

		const invitationText = screen.queryByText(/Join us/i);
		const dateDashColorText = screen.getByTestId("date-dash-color");
		const timeDashColorText = screen.getByTestId("time-dash-color");

		expect(invitationText).toBeInTheDocument();
		expect(dateDashColorText).toHaveTextContent(/black/i);
		expect(timeDashColorText).toBeInTheDocument(/dark blue/i);
	});
});
