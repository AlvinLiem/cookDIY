import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    name: "",
    address: "",
    phoneNumber: "",
  });

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://p2-iproject-server.avprojects.online/users",
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setInput({
        email: data.email,
        name: data.name ? data.name : "",
        address: data.address ? data.address : "",
        phoneNumber: data.phoneNumber ? data.phoneNumber : "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }

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
      await axios({
        method: "put",
        url: `https://p2-iproject-server.avprojects.online/users`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
        data: input,
      });
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

  useState(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container m-1 p-5">
        <div className="row text-center">
          <h1>Your Profile</h1>
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
                    value={input.email}
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
                    value={input.name}
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
                    value={input.address}
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
                    value={input.phoneNumber}
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-dark" type="submit">
                    Modify...
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
