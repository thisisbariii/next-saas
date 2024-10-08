"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getStripe } from "@/lib/stripe-client";
import { Loader } from "lucide-react";

type Props = {
  price: string;
};

const SubscribeBtn = ({ price }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckout = async (price: string) => {
    setLoading(true);
    try {
      const { sessionId } = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      }).then((res) => res.json());

      const stripe = await getStripe();
      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Button
      onClick={() => handleCheckout(price)}
      className="bg-indigo-700"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Subscribe"
      )}
    </Button>
  );
};

export default SubscribeBtn;
