import React, { useEffect, useState } from "react";

const OrdedShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order?.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, []);
  return timeLeft < 0 ? <div>Order Expired</div> : <div>Time left to pay: {timeLeft} seconds</div>;
};

OrdedShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  console.log(`/api/orders/${orderId}`);
  try {
    const { data: order } = await client.get(`/api/orders/${orderId}`);
    console.log(order);
    return { order };
  } catch (error) {
    console.log(error.message);
  }
};

export default OrdedShow;
