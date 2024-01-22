import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: `https://p2-iproject-server.avprojects.online/login`,
        data: input,
      });
      localStorage.access_token = data.access_token;
      navigate(`/`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }

  async function handleCredentialResponse({ credential }) {
    try {
      const { data } = await axios({
        method: "post",
        url: `https://p2-iproject-server.avprojects.online/google-login`,
        headers: { ["google-token"]: credential },
      });
      localStorage.access_token = data.access_token;
      navigate(`/`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }
  useEffect(() => {
    google.accounts.id.initialize({
      //nnti ganti menggunakan .env
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("google-login"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <div className="container m-1 p-5">
        <div className="row text-center">
          <h1>Login</h1>
        </div>
        <div className="row">
          <div className="container d-flex flex-wrap flex-row justify-content-center">
            <div
              className="card m-1 p-1 border-0 shadow-lg p-3 mb-4 bg-body-tertiary rounded"
              style={{ width: "50rem" }}
            >
              <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    onChange={handleOnChange}
                    name="email"
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={handleOnChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-dark" type="submit">
                    Login...
                  </button>
                </div>
              </form>
              <div className="row my-2 py-2">
                <p>
                  Don't have any account?{" "}
                  <Link to={`/register`}>Register here..</Link>
                </p>
              </div>
              <div className="row my-2 py-2 justify-content-center">
                <div id="google-login"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
