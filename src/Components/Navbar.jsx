import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = Cookies.get("user");

  function logout() {
    Cookies.remove("token");
    Cookies.remove("user");
    navigate("/login");
  }

  return (
    <div className="navbar rounded-lg">
      <div className="navbar-start">
        <Link to={"/"} className="navbar-item font-semibold text-xl text-[#6c9d98]">
          Whispersphere
        </Link>
      </div>
      <div className="navbar-end">
        <div className="avatar avatar-ring avatar-md">
          <div className="dropdown-container">
            <div className="dropdown">
              <label
                className="btn btn-ghost flex cursor-pointer px-0"
                tabIndex="0"
              >
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  alt="avatar"
                />
              </label>
              <div className="dropdown-menu dropdown-menu-bottom-left">
                {userId ? (
                  <>
                    <Link
                      to={`/profile/${userId}`}
                      className="dropdown-item text-sm"
                    >
                      Profile
                    </Link>
                    <Link
                      onClick={logout}
                      tabIndex="-1"
                      className="dropdown-item text-sm"
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link
                    to={"/login"}
                    tabIndex="-1"
                    className="dropdown-item text-sm"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
