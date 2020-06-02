import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
function VisaButton(props) {
  const [sdkReady, setSdkReady] = useState(false);

  const addVisaSdk = async () => {
    const result = await axios.get("/api/config/visa");
    const clientID = result.data;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '' + clientID;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    }
    document.body.appendChild(script);
  }

  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: props.amount
        }
      }
    ]
  });

  const onApprove = (data, actions) => actions.order
    .capture()
    .then(details => props.onSuccess(data, details))
    .catch(err => console.log(err));

  useEffect(() => {
    if (!window.visa) {
      addVisaSdk();
    }
    return () => {
      //
    };
  }, []);

  if (!sdkReady) {
    return <div>Loading...</div>
  }

  const Button = window.visa.Buttons.driver('react', { React, ReactDOM });

  return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
    onApprove={(data, actions) => onApprove(data, actions)} />
}

export default VisaButton;