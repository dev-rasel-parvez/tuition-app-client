import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const DirectHirePaymentModal = ({ tutorId, close, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const handlePay = async () => {
    if (!stripe || !elements) return;

    try {
      const { data } = await axiosSecure.post(
        "/payments/direct-hire/create-intent",
        { tutorId } // ✅ REQUIRED
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        Swal.fire("Payment Failed", result.error.message, "error");
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await axiosSecure.post("/payments/direct-hire/confirm", {
          paymentIntentId: result.paymentIntent.id,
          tutorId,
        });

        Swal.fire("Success", "All tutor contacts unlocked!", "success");
        onSuccess();
        close();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Unlock All Tutor Contacts (1000 BDT)
        </h2>

        <CardElement className="p-3 border rounded-md" />

        <div className="flex gap-3 mt-6">
          <button onClick={close} className="btn btn-outline w-1/2">
            Cancel
          </button>
          <button onClick={handlePay} className="btn btn-success w-1/2">
            Pay 1000 Taka
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectHirePaymentModal;
