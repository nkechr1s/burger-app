import { useAuth } from "../../context";
import "./Header.css";
import { useState } from "react";
import { Modal } from "../../components";
import { FaHamburger } from "react-icons/fa";

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
    <>
      <header className="header">
        <div className="header-title">
          <FaHamburger />
          <h1 aria-label="A cool burger app">Burger Now!</h1>
        </div>
        {auth.isAuthenticated && (
          <>
            <img
              src="logout.svg"
              alt="logout"
              onClick={toggleModal}
              className="logout-button"
              title="Logout"
            />
          </>
        )}
      </header>
      {auth.isAuthenticated && (
        <Modal
          isOpen={isModalOpen}
          title="Logout Confirmation"
          text="Are you sure you want to logout?"
        >
          {/* TODO: Create a reusable button component */}
          <div className="modal-buttons">
            <button
              title="logout"
              onClick={handleLogout}
              className="primary-button"
            >
              logout
            </button>
            <button
              title="cancel"
              onClick={toggleModal}
              className="secondary-button"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
