import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const access_token = localStorage.access_token;

  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    navigate(`/login`);
  }
  return (
    <>
      <nav className="navbar fixed-top bg-body-tertiary">
        <div className="container-fluid">
          <div>
            <Link to={`/`} className="navbar-brand fw-bold fs-3">
              cook DIY
            </Link>
          </div>
          {access_token ? (
            <div className="d-flex justify-content-end">
              <div>
                <Link to={`/profile`} className="navbar-brand">
                  Profile
                </Link>
              </div>
              <div>
                <Link to={`/orders`} className="navbar-brand">
                  Orders
                </Link>
              </div>
              <div>
                <Link onClick={handleLogout} className="navbar-brand">
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-end">
              <div>
                <Link to={`/login`} className="navbar-brand">
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
