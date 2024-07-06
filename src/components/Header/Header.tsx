import { useAuth } from "../../context";
import "./Header.css";
import { useState } from "react";
import { Modal } from "../../components";

const Header = () => {
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleLogout = () => {
    auth.logout();
    toggleModal();
  };
  return (
    <div className="container">
      <header className="header">
        <h1 aria-label="A cool burger app">A cool burger app</h1>
        {auth.token && (
          <>
            <button onClick={toggleModal} className="btn-submit">
              Logout
            </button>
          </>
        )}
        <Modal
          isOpen={isModalOpen}
          title="Logout Confirmation"
          text="Are you sure you want to logout?"
        >
          <button title="logout" onClick={handleLogout} className="btn-submit">
            logout
          </button>
          <button title="cancel" onClick={toggleModal} className="btn-cancel">
            Cancel
          </button>
        </Modal>
      </header>
    </div>
  );
};

export default Header;
