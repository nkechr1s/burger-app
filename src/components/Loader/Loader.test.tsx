import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

test("renders the Loader component", () => {
  render(<Loader />);
  const loader = screen.getByTestId("loader");
  expect(loader).toBeInTheDocument();
});
