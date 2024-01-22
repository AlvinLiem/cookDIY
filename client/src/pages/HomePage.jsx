import { useEffect, useState } from "react";
import axios from "axios";
import CardHome from "../components/CardHome";
import Swal from "sweetalert2";

export default function HomePage() {
  const [meals, setMeals] = useState([]);

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://p2-iproject-server.avprojects.online/meals",
      });
      setMeals(data);
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
          <h1>Our Menus</h1>
        </div>
        <div className="rows">
          <div className="container d-flex flex-wrap flex-row justify-content-center">
            {meals &&
              meals.map((meal) => {
                return <CardHome meal={meal} key={meal.id} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
