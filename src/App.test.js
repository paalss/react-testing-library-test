import React from "react";
import axios from "axios";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

jest.mock("axios");

describe("App", () => {
  test("fetches stories from an api and displays them", async () => {
    const stories = [
      { objectID: "1", title: "Test forventer" },
      { objectID: "2", title: "å få disse to elementene" },
    ];

    const promise = Promise.resolve({ data: { hits: stories } });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await act(async () => {
      await userEvent.click(screen.getByRole("button"));
    });
    
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("fetch-stories fail results in error message", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

    render(<App />);

    await act(async () => {
      await userEvent.click(screen.getByRole("button"));
    });

    const message = await screen.findByText(/something is wrong/);

    expect(message).toBeInTheDocument();
  });
});
