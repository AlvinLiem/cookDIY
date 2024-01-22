import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phoneNumber: "",
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
      const data = await axios({
        method: "post",
        url: `https://p2-iproject-server.avprojects.online/register`,
        data: input,
      });
      navigate(`/login`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }

  return (
    <>
      <div className="container m-1 p-5">
        <div className="row text-center">
          <h1>Register</h1>
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
                <div className="mb-3">
                  <label htmlFor="exampleInputName" className="form-label">
                    Name
                  </label>
                  <input
                    onChange={handleOnChange}
                    name="name"
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    onChange={handleOnChange}
                    name="address"
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPhoneNumber"
                    className="form-label"
                  >
                    Phone Number
                  </label>
                  <input
                    onChange={handleOnChange}
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    id="exampleInputPhoneNumber"
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-dark" type="submit">
                    Register...
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
