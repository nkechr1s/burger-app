import { ModalProps } from "../../types";
import "./Modal.css";
const Modal = ({ title, text, isOpen, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            {title && <h2 aria-label={title}>{title}</h2>}
            {text && <p aria-label={title}>{text}</p>}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
