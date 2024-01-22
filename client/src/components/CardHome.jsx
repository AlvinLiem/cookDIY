import { Link } from "react-router-dom";

export default function CardHome({ meal }) {
  return (
    <div>
      <div
        className="card m-1 p-1 border-0 shadow-lg p-3 mb-4 bg-body-tertiary rounded"
        style={{ width: "18rem" }}
      >
        <img
          src={meal.strMealThumb}
          className="card-img-top rounded"
          alt="Food Image"
        />
        <div className="card-body">
          <h5 className="card-title">{meal.strMeal}</h5>
          <Link
            to={`/meals/${meal.id}`}
            className="btn btn-light text-body-secondary"
          >
            The Recipes...
          </Link>
        </div>
      </div>
    </div>
  );
}
