import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/app/redux/features/orders/ordersApi";
import { styles } from "@/app/utils/styles";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";

type CheckoutFormPropsType = {
  data: any;
};

const CheckoutForm: FC<CheckoutFormPropsType> = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadUser, setLoadUser] = useState(false);

  const router = useRouter();

  const [createOrder] = useCreateOrderMutation();
  const {} = useLoadUserQuery({}, { skip: loadUser ? false : true });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error?.message || "An unexpected error occured.");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data?._id, paymentInfo: paymentIntent }).then(
        (res: any) => {
          if (res?.error) {
            toast.error(res?.error?.data?.message || "Something went wrong!");
            return;
          }
          if (res?.data) {
            setLoadUser(true);
            router.push(`/course-access/${data?._id}`);
          }
        }
      );
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        // options={{defaultValues: {email: 'foo@bar.com'}}}
      />
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className={`${styles.button} mt-4`}
      >
        <span id="button-text">{isLoading ? "Paying..." : "Pay now"}</span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
