import Alert from 'react-bootstrap/Alert';

const AlertBanner = ({
  message = 'An unexpected error occurred. Please try again later.',
  variant = 'danger',
}) => {
  return (
    <Alert variant={variant} style={{ backgroundColor: 'red' }}>
      {message}
    </Alert>
  );
};

export default AlertBanner;
