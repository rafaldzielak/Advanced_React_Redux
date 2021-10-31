import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrdedShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: { orderId: order.id },
    onSuccess: (payment) => console.log(payment),
  });
  console.log(order);
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order?.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, []);

  if (timeLeft < 0) return <div>Order Expired</div>;

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={(token) => doRequest({ token: token.id })}
        stripeKey={
          "pk_test_51HxskkJe6gNNlKVJ5jshf7Hj0fX3nmmmiQzLz1fu4u7e6K6SorkOEXbzSaeeUCBGdf8QEAGbuSfT6vdQwVkqtj4500j6tBFuTm"
        }
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
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
