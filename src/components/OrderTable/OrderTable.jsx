import style from "./OrderTable.module.css";

function OrderTable({ orderedItems = [] }) {
  // Prevent rendering errors when data not yet loaded
  if (!orderedItems || orderedItems.length === 0) {
    return <p style={{ color: "red", fontSize: "25px" }}>No orders found.</p>;
  }

  // Safely access the date
  const orderDate = orderedItems[0]?.orderedAt
    ? orderedItems[0].orderedAt.substring(0, 10)
    : "Unknown Date";

  console.log(orderedItems);

  ///sorted orderItem by date
  orderedItems.sort((a, b) => {
    const dateA = new Date(a.orderedAt);
    const dateB = new Date(b.orderedAt);
    return dateB - dateA;
  });

  return (
    <>
      {orderedItems.map((order, index) => (
        <div key={order.id} className={style.orderContainer}>
          <div className={style.date}>
            Ordered On: {new Date(order.orderedAt).toLocaleString()}
          </div>

          <div className={style.tableContainer}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>

              <tbody>
                {order.products?.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.title}</td>
                    <td>₹{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>₹{product.price * product.quantity}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan="3">Total Price</td>
                  <td>₹{order.totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ))}
    </>
  );

  // return (
  //   <>
  //     {/* <div>
  //       {orderedItems.map((item, index, arr) => (
  //         <div className={style.date}>Ordered On: {item.orderedAt}</div>
  //       ))}
  //     </div> */}

  //   </>
  // );
}

export default OrderTable;
