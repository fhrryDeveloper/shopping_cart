import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App"
import Home from "./Home"
import Products from "./Products"
import { BrowserRouter } from "react-router-dom"
import TestRenderer from "react-test-renderer"
import { MemoryRouter, Routes, Route } from "react-router-dom"

test("renders heading", () => {
  const { getByRole } = render(<App />, { wrapper: BrowserRouter })
  expect(getByRole("heading").textContent).toMatch("Fake Shop")
})

describe("App component", () => {
  it("renders App base page layout", () => {
    const { container } = render(<App />, { wrapper: BrowserRouter })
    expect(container).toMatchSnapshot()
  })
})

describe("Products component", () => {
  it("renders Products inside App", () => {
    let renderer = TestRenderer.create(
      <MemoryRouter initialEntries={["/products"]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(renderer.toJSON()).toMatchSnapshot()
  })
})
