import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ applicationId, close, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

const handlePayment = async () => {
  if (!stripe || !elements) return;

  try {
    const { data } = await axiosSecure.post("/payments/create-intent");

    const { paymentIntent, error } =
      await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

    if (error) {
      Swal.fire("Payment Failed", error.message, "error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      await axiosSecure.post("/payments/confirm", {
        applicationId,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
      });

      onSuccess();

      Swal.fire({
        icon: "success",
        title: "Tutor Hired Successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        close();
        navigate("/dashboard/payment-history");
      }, 2000);
    }
  } catch (err) {
    Swal.fire("Error", "Payment processing failed", "error");
  }
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Pay 1000 TK</h2>

        <CardElement className="p-3 border rounded" />

        <button
          onClick={handlePayment}
          className="btn btn-success w-full mt-4"
        >
          Pay Now
        </button>

        <button onClick={close} className="btn btn-outline w-full mt-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
