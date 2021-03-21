import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";
import loansData from "./dataService/current-loans.json";
import { formatNumber } from "./Utils";

describe("Investment Flow", () => {
  test("Loans are rendered succesfully", () => {
    render(<App />);
    const loans = loansData.loans;

    for (var loan of loans) {
      // Three Cards loaded successfully
      const item = screen.queryByTestId(loan.id);
      expect(item).toBeVisible();
      // Invest Call To Action is available and enabled
      const investCardButton = screen.queryByTestId(
        `${loan.id}-invest-card-button`
      );
      if (loan.available > 0) {
        expect(investCardButton).toBeEnabled();
        expect(investCardButton).toHaveTextContent("INVEST");
      }
    }

    // Total Available is calculated and displayed correctly
    const totalAvailable = screen.queryByTestId("total-available-value");
    let total = loans.reduce((a, b) => {
      return parseInt(a) + parseInt(formatNumber(b.available));
    }, 0);
    expect(totalAvailable).toHaveTextContent(`£${total}`);
  });

  test("Invest modal opens and closes successfully for all loans", () => {
    render(<App />);
    const loans = loansData.loans;

    let loan = loans[0];
    const investCardButton = screen.queryByTestId(
      `${loan.id}-invest-card-button`
    );

    // Modal opens and closes via cross button
    fireEvent.click(investCardButton);
    const investModal = screen.queryByTestId("invest-modal");
    expect(investModal).toBeVisible();
    const modalClose = screen.queryByTestId("modal-cross-icon");
    fireEvent.click(modalClose);
    expect(investModal).not.toBeVisible();

    // Modal opens and closes via outside click
    fireEvent.click(investCardButton); 
    expect(investModal).toBeVisible();
    fireEvent.click(investModal);
    
    expect(investModal).not.toBeVisible();
  });

  test("Invest modal loads correct loan", () => {
    render(<App />);
    const loans = loansData.loans;

    for (var loan of loans) {
      const investCardButton = screen.queryByTestId(
        `${loan.id}-invest-card-button`
      );
      fireEvent.click(investCardButton);
      const loanTitle = screen.queryAllByText(loan.title);
      expect(loanTitle).toHaveLength(2);
      const modalClose = screen.queryByTestId("modal-cross-icon");
      fireEvent.click(modalClose);
    }
  });

  test("Investing an amount updates total and particlar loan", async () => {
    render(<App />);
    const loans = loansData.loans;

    let loan = loans[0];
    const investCardButton = screen.queryByTestId(
      `${loan.id}-invest-card-button`
    );
    fireEvent.click(investCardButton);
    const investModal = screen.queryByTestId("invest-modal");
    const input = screen.getByPlaceholderText("Enter amount");
    const investButton = screen.queryByTestId("invest-modal-button");

    // Try a value grater than loan
    fireEvent.change(input, {
      target: { value: parseInt(formatNumber(loan.available)) + 2000 },
    });
    expect(input.value).toBe(formatNumber(loan.available));

    // Try a value in available range
    fireEvent.change(input, { target: { value: "200" } });
    expect(input.value).toBe("200");

    // Button should be enabled after value in input
    expect(investButton).toBeEnabled();
    fireEvent.click(investButton);

    // Modal is successfully closed after investment
    expect(investModal).not.toBeVisible();

    // Total available amount updated successfully
    const totalAvailable = screen.queryByTestId("total-available-value");
    let total = loans.reduce((a, b) => {
      return parseInt(a) + parseInt(formatNumber(b.available));
    }, 0);
    let remValue = parseInt(total) - 200;
    expect(totalAvailable).toHaveTextContent(`£${remValue}`);
  });

  test("Invest modal loads correct loan", () => {
    render(<App />);
    const loans = loansData.loans;

    for (var loan of loans) {
      const investCardButton = screen.queryByTestId(
        `${loan.id}-invest-card-button`
      );
      fireEvent.click(investCardButton);
      const loanTitle = screen.queryAllByText(loan.title);
      expect(loanTitle).toHaveLength(2);
      const modalClose = screen.queryByTestId("modal-cross-icon");
      fireEvent.click(modalClose);
    }
  });
});
