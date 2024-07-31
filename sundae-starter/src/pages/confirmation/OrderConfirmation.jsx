import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AlertBanner from '../common/AlertBanner';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ setOrderPhase }) => {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .post(`http://localhost:3030/order`, { signal: controller.signal })
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        if (error.name !== 'CanceledError') setError(true);
      });

    return () => controller.abort();
  }, []);

  function handleClick() {
    resetOrder();
    setOrderPhase('inProgress');
  }

  const newOrderButton = <Button onClick={handleClick}>Create new order</Button>;

  if (error) {
    // @ts-ignore
    return (
      <>
        <AlertBanner />
        {newOrderButton}
      </>
    );
  }

  if (orderNumber)
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>as per terms and conditions, nothing will happen now</p>
        {newOrderButton}
      </div>
    );

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default OrderConfirmation;
