import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { useState } from 'react';

const MAX_SCOOP_VALUE = 10;
export default function ScoopOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const [isValid, setIsValid] = useState(true);
  const handleChange = (e) => {
    const currentValue = e.target.value;
    const currentValueFloat = parseFloat(currentValue);

    const valueIsValid =
      currentValueFloat >= 0 &&
      Math.floor(currentValueFloat) === currentValueFloat &&
      currentValueFloat <= MAX_SCOOP_VALUE;

    setIsValid(valueIsValid);

    const newValue = valueIsValid ? parseInt(currentValue) : 0;
    updateItemCount(name, newValue, 'scoops');
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
