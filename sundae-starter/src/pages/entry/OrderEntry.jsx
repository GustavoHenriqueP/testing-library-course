import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import Options from './Options';
import Button from 'react-bootstrap/Button';

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();
  const grandTotal = Object.values(totals).reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(grandTotal)}</h2>
      <Button disabled={totals.scoops === 0} onClick={() => setOrderPhase('review')}>
        Order Sundae!
      </Button>
    </div>
  );
}
