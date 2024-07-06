import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Modal from "./Modal";
import { AuthProvider } from "../../context";

const HeaderWithProvider = () => {
  return (
    <MemoryRouter>
      <AuthProvider>
        <Modal isOpen={true} />
      </AuthProvider>
    </MemoryRouter>
  );
};

test("renders the Modal component", () => {
  render(<HeaderWithProvider />);
  const modal = screen.getByTestId("modal");
  expect(modal).toBeInTheDocument();
});

test("renders modal with title and text", () => {
    const modalTitle = "Sample Modal Title";
    const modalText = "This is a sample modal text.";
  
    render(
      <Modal isOpen={true} title={modalTitle} text={modalText}>
       <p>test</p>
      </Modal>
    );
  
    const titleElement = screen.getByText(modalTitle);
    const textElement = screen.getByText(modalText);
  
    expect(titleElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  test("modal does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} title="Sample Modal Title" text="Sample Modal Text">
      <p>test</p>
      </Modal>
    );
  
    const modal = screen.queryByTestId("modal");
    expect(modal).toBeNull();
  });