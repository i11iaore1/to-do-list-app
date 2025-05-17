import {render, screen, fireEvent} from "@testing-library/react";
import {Panel} from "../secondary";

const setSearchQueryMock = vitest.fn();
const buttonAddFunctionMock = vitest.fn();

describe("Panel", () => {
	afterEach(() => {
		vitest.clearAllMocks();
	});

	test("Clear search query", () => {
		render(
			<Panel
				searchQuery={""}
				setSearchQuery={setSearchQueryMock}
				buttonAddFunction={buttonAddFunctionMock}
				buttonAddToolTip={"buttonAddToolTip"}
			/>
		);

		const clearButton = screen.getByTitle("Clear");
		fireEvent.click(clearButton);
		expect(setSearchQueryMock).toBeCalledTimes(1);
		expect(setSearchQueryMock).toBeCalledWith("");
	});

	test("Press add button", () => {
		render(
			<Panel
				searchQuery={""}
				setSearchQuery={setSearchQueryMock}
				buttonAddFunction={buttonAddFunctionMock}
				buttonAddToolTip={"buttonAddToolTip"}
			/>
		);

		const addButton = screen.getByTitle("buttonAddToolTip");
		fireEvent.click(addButton);
		expect(buttonAddFunctionMock).toBeCalledTimes(1);
	});
});