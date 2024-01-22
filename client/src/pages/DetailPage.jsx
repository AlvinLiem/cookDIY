import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [meal, setMeal] = useState({});

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://p2-iproject-server.avprojects.online/meals/${id}`,
      });
      setMeal(data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }

  async function handleOnClickBuy(e) {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: `https://p2-iproject-server.avprojects.online/orders/${id}`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      navigate(`/orders`);
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
    fetchData();
  }, []);
  return (
    <>
      <div className="container m-1 p-5">
        <div className="row text-center">
          <h1>{meal.strMeal}</h1>
        </div>
        <div className="row">
          <div className="container d-flex flex-wrap flex-row justify-content-center">
            <div
              className="card m-1 p-1 border-0 shadow-lg p-3 mb-4 bg-body-tertiary rounded"
              style={{ width: "50rem" }}
            >
              <img
                src={meal.strMealThumb}
                className="card-img-top rounded"
                alt="Food Image"
              />
            </div>
          </div>
          <div className="container d-flex flex-wrap flex-row justify-content-center">
            <div
              className="card m-1 p-1 border-0 shadow-lg p-3 mb-4 bg-body-tertiary rounded"
              style={{ width: "50rem" }}
            >
              <p>{meal.ingredient}</p>
            </div>
          </div>
          <div className="container d-flex flex-wrap flex-row justify-content-center">
            <div
              className="card m-1 p-1 border-0 shadow-lg p-3 mb-4 bg-body-tertiary rounded"
              style={{ width: "50rem" }}
            >
              {meal.strInstructions}
            </div>
          </div>
          <div className="container d-flex flex-wrap flex-row justify-content-center">
            <div
              className="card m-1 p-1 border-0 shadow-lg p-3 mb-4 bg-body-tertiary rounded"
              style={{ width: "50rem" }}
            >
              <div className="d-grid">
                <button
                  onClick={handleOnClickBuy}
                  className="btn btn-dark"
                  type="button"
                >
                  Buy Ingredients...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
