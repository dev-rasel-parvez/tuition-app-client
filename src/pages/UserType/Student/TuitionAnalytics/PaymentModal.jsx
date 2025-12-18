import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentModal = ({ tuitionId, close }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handlePay = async () => {
    const { data } = await axiosSecure.post("/payments/create-intent");

    const result = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (result.paymentIntent?.status === "succeeded") {
      Swal.fire("Payment Successful", "", "success");

      setTimeout(() => {
        navigate(`/dashboard/payment-history`);
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">

        <h2 className="text-xl font-bold text-center mb-2">
          Unlock Contact Details
        </h2>

        <p className="text-center text-gray-500 mb-4">
          Pay <b>1000 TK</b> to view full contact info
        </p>

        <CardElement className="p-3 border rounded" />

        <button
          className="btn btn-success w-full mt-4"
          onClick={handlePay}
        >
          Pay 1000 TK
        </button>

        <button
          className="btn btn-outline w-full mt-2"
          onClick={close}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
