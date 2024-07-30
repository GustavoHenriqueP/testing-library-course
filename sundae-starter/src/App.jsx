import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');
  let Component;

  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'complete':
      Component = OrderConfirmation;
      break;
    default:
      Component = OrderEntry;
      break;
  }

  return (
    <Container>
      <OrderDetailsProvider>{<Component setOrderPhase={setOrderPhase} />}</OrderDetailsProvider>
    </Container>
  );
}

export default App;
