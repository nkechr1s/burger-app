import { useAuth } from "../../context";
import "./Header.css";

const Header = () => {
  const auth = useAuth();
  return (
    <div className="container">
      <header className="header">
        <h1 aria-label="A cool burger app">A cool burger app</h1>
        {auth.token && (
          <>
            <button onClick={() => auth.logout()} className="btn-submit">
              logout
            </button>
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
