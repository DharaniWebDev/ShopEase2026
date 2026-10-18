import { Link } from "react-router-dom";

export default function MyOrders({ orders }) {
  return (
    <main className="page-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-card">
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="button button-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-heading">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>{order.date}</p>
                </div>
                <strong>₹{order.total.toLocaleString("en-IN")}</strong>
              </div>

              <p>Payment: {order.paymentMethod}</p>
              <p>Delivery address: {order.address}</p>

              {order.items.map((item) => (
                <p key={item.id}>
                  {item.name} × {item.quantity}
                </p>
              ))}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}