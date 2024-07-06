import { render, screen } from "@testing-library/react";
import Modal from "./Modal";



test("renders the Modal component", () => {
  render(<Modal isOpen={true} />);
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