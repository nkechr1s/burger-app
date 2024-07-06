import { useAuth } from "../../context";
const Header = () => {
  const auth = useAuth();
  return (
    <div className="">
      <h1 aria-label="A cool burger app">A cool burger app</h1>
      {auth.token && (
        <>
          <button onClick={() => auth.logout()} className="btn-submit">
            logout
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
