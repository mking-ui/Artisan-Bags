"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function PaymentCallback() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const reference = params.get("reference");
    if (!reference) return;

    const verifyPayment = async () => {
      try {
        const { data } = await axios.get(`/api/paystack/verify?reference=${reference}`);

        if (data.success) {
          toast.success("Payment successful");
          router.push("/order-placed"); // redirect after success
        } else {
          toast.error(data.message || "Payment failed");
          router.push("/cart");
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
        router.push("/cart");
      }
    };

    verifyPayment();
  }, [params, router]);

  return <p className="text-center mt-20">Verifying payment...</p>;
}