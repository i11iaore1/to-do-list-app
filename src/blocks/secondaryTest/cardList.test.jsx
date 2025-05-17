import { render, screen } from "@testing-library/react";
import { CardList } from "../secondary";

function fakeFunction() {
  return null;
}

describe("CardList", () => {
  describe("Default", ()=> {
    test("Empty list", () => {
      render(
          <CardList
              cardObjectList={[]}
              handleComplete={fakeFunction}
              handleDelete={fakeFunction}
              handleEdit={fakeFunction}
          />
      );

      const CardElement = screen.queryAllByTestId("card");
      expect(CardElement).toHaveLength(0);
      const DateDashElement = screen.queryAllByTestId("date");
      expect(DateDashElement).toHaveLength(0);
      const TimeDashElement = screen.queryAllByText(":");
      expect(TimeDashElement).toHaveLength(0);

      // screen.debug();
    });

    test("One card", () => {
      const testCardObjectList = [
        {
          id: 0,
          name: "task 0",
          description: "description 0",
          deadline: "2019-08-24T14:15:22Z",
          state: 0,
          user: 0,
        },
      ];

      render(
          <CardList
              cardObjectList={testCardObjectList}
              handleComplete={fakeFunction}
              handleDelete={fakeFunction}
              handleEdit={fakeFunction}
          />
      );

      // screen.debug();
      const CardElement = screen.getByTestId("card");
      expect(CardElement).toBeInTheDocument();
      const DateDashElement = screen.getByTestId("date");
      expect(DateDashElement.textContent).toBe("24.08.2019");
      const TimeDashElement = screen.getByText(/:/i);
      expect(TimeDashElement.textContent).toBe("14:15");
    });
  });

  describe("Date and time dashes", () => {
    test("Two cards, same date and time", () => {
      const testCardObjectList = [
        {
          id: 0,
          name: "task 0",
          description: "description 0",
          deadline: "2019-08-24T14:15:22Z",
          state: 0,
          user: 0,
        },
        {
          id: 1,
          name: "task 1",
          description: "description 0",
          deadline: "2019-08-24T14:15:22Z",
          state: 0,
          user: 0,
        },
      ];

      render(
          <CardList
              cardObjectList={testCardObjectList}
              handleComplete={fakeFunction}
              handleDelete={fakeFunction}
              handleEdit={fakeFunction}
          />
      );

      // screen.debug();
      const CardElementList = screen.getAllByTestId("card");
      const DateDashElement = screen.getByTestId("date");
      const TimeDashElement = screen.getByText(/:/i);
      expect(CardElementList).toHaveLength(2);
      expect(DateDashElement.textContent).toBe("24.08.2019");
      expect(TimeDashElement.textContent).toBe("14:15");
    });

    test("Two cards, same date, different time", () => {
      const testCardObjectList = [
        {
          id: 0,
          name: "task 0",
          description: "description 0",
          deadline: "2019-08-24T14:15:22Z",
          state: 0,
          user: 0,
        },
        {
          id: 1,
          name: "task 1",
          description: "description 0",
          deadline: "2019-08-24T14:20:22Z",
          state: 0,
          user: 0,
        },
      ];

      render(
          <CardList
              cardObjectList={testCardObjectList}
              handleComplete={fakeFunction}
              handleDelete={fakeFunction}
              handleEdit={fakeFunction}
          />
      );

      // screen.debug();
      const CardElementList = screen.getAllByTestId("card");
      const DateDashElement = screen.getByTestId("date");
      const TimeDashElementList = screen.getAllByText(/:/i);
      expect(CardElementList).toHaveLength(2);
      expect(TimeDashElementList).toHaveLength(2);
      expect(DateDashElement.textContent).toBe("24.08.2019");
      expect(TimeDashElementList[0].textContent).toBe("14:15");
      expect(TimeDashElementList[1].textContent).toBe("14:20");
    });

    test("Two cards, different date, same time", () => {
      const testCardObjectList = [
        {
          id: 0,
          name: "task 0",
          description: "description 0",
          deadline: "2019-08-24T14:15:22Z",
          state: 0,
          user: 0,
        },
        {
          id: 1,
          name: "task 1",
          description: "description 0",
          deadline: "2020-08-24T14:15:22Z",
          state: 0,
          user: 0,
        },
      ];

      render(
          <CardList
              cardObjectList={testCardObjectList}
              handleComplete={fakeFunction}
              handleDelete={fakeFunction}
              handleEdit={fakeFunction}
          />
      );

      // screen.debug();
      const CardElementList = screen.getAllByTestId("card");
      const DateDashElementList = screen.getAllByTestId("date");
      const TimeDashElementList = screen.getAllByText(/:/i);
      expect(CardElementList).toHaveLength(2);
      expect(DateDashElementList).toHaveLength(2);
      expect(TimeDashElementList).toHaveLength(2);
      expect(DateDashElementList[0].textContent).toBe("24.08.2019");
      expect(DateDashElementList[1].textContent).toBe("24.08.2020");
      expect(TimeDashElementList[0].textContent).toBe("14:15");
      expect(TimeDashElementList[1].textContent).toBe("14:15");
    });

    test("One card, deadline is today", () => {

      const testCardObjectList = [
        {
          id: 0,
          name: "task 0",
          description: "description 0",
          deadline: new Date().toISOString(),
          state: 0,
          user: 0,
        },
      ];

      render(
          <CardList
              cardObjectList={testCardObjectList}
              handleComplete={fakeFunction}
              handleDelete={fakeFunction}
              handleEdit={fakeFunction}
          />
      );

      // screen.debug();
      const DateDashElement = screen.getByTestId("date");
      expect(DateDashElement.textContent).toBe("Today");
    });

    test("One card, deadline is tomorrow", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const testCardObjectList = [
        {
          id: 0,
          name: "task 0",
          description: "description 0",
          deadline: tomorrow.toISOString(),
          state: 0,
          user: 0,
        },
      ];

      render(
          <CardList
              cardObjectList={testCardObjectList}
              handleComplete={fakeFunction}
              handleDelete={fakeFunction}
              handleEdit={fakeFunction}
          />
      );

      // screen.debug();
      const DateDashElement = screen.getByTestId("date");
      expect(DateDashElement.textContent).toBe("Tomorrow");
    });
  });
});
