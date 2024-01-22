import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function () {
  const [orders, setOrders] = useState([]);
  const [del, setDel] = useState(false);

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://p2-iproject-server.avprojects.online/orders`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setOrders(data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }
  async function handleDelete(id) {
    try {
      await axios({
        method: "delete",
        url: `https://p2-iproject-server.avprojects.online/orders/${id}`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setDel(true);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }

  async function handlePay(id) {
    try {
      const { data } = await axios({
        method: "post",
        url: `https://p2-iproject-server.avprojects.online/payment/midtrans/token/${id}`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      window.snap.pay(data.token);
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

  useEffect(() => {
    if (del) {
      fetchData();
      setDel(false);
    }
  }, [del]);

  return (
    <>
      <div className="container m-1 p-5">
        <div className="row text-center">
          <h1>Your Orders</h1>
        </div>
        <div className="row">
          <div className="container d-flex flex-wrap flex-row justify-content-center">
            <div
              className="card m-1 p-1 border-0 shadow-lg p-3 mb-4 bg-body-tertiary rounded"
              style={{ width: "50rem" }}
            >
              <table className="table table-light table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order ID</th>
                    <th scope="col">Food</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order) => {
                      return (
                        <tr key={order.id}>
                          <th scope="row">{order.id}</th>
                          <td>{order.orderId}</td>
                          <td>{order.Meal.strMeal}</td>
                          <td>{order.status}</td>
                          <td>
                            <div className="d-grid gap-2 d-md-block m-0 p-0">
                              <button
                                onClick={() => {
                                  handlePay(order.id);
                                }}
                                className="btn btn-sm btn-dark mx-1"
                                type="button"
                              >
                                Pay
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(order.id);
                                }}
                                className="btn btn-sm btn-dark mx-1 "
                                type="button"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
