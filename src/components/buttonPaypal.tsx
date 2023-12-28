import { PayPalButtons } from "@paypal/react-paypal-js";

type Props = {
  amount: number;
};

const PaypalComponent = (props: Props) => {
  const { amount } = props;

  const handlePaymentSuccess = async () => {
    console.log('okk');

  };
  return (
    <PayPalButtons
      style={{
        layout: "horizontal",
        height: 48,
        color:'silver'
      }}
      createOrder={(_data, actions) => {
        {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: String(amount), 
                },
                description: `Purchase at ${new Date().toLocaleString()}`,
              },
            ],
          });
        }
      }}
      onApprove={(_, actions): any => {
        return actions.order?.capture().then(() => handlePaymentSuccess());
      }}
    />
  );
};

export default PaypalComponent;