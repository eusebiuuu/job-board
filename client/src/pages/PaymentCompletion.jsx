import queryString from "query-string";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import customFetch from "../lib/customFetch";

export default function PaymentCompletion() {
  const [isLoading, setIsLoading] = useState(true);
  const { success, cancelled, token, monthly } = queryString.parse(window.location.search);
  const navigate = useNavigate();

  if (cancelled) {
    toast.error('Payment cancelled. Please do the payment again');
    navigate('/company/checkout');
  } else if (!success) {
    toast.error('Payment error. Please do the payment again');
    navigate('/company/checkout');
  }

  useEffect(() => {
    (async () => {
      try {
        const resp = await customFetch.post('/companies/paymentCompletion', { monthly: monthly === 'true', token });
        toast.success(resp.data.msg);
        navigate('/company/profile');
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.msg);
        navigate('/company/profile');
      }
    })();
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);
  return <div>{isLoading ? <Loader /> : null}</div>;
}