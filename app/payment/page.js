"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PaymentCallback() {

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {

    const reference = params.get("reference");

    if (!reference) return;

    const verifyPayment = async () => {

      try {

        const { data } = await axios.get(
          `/api/paystack/verify?reference=${reference}`
        );

        if (data.success) {

          toast.success("Payment successful");

          router.push("/order-placed");

        } else {

          toast.error(data.message);

          router.push("/cart");

        }

      } catch (error) {

        toast.error(error.message);

        router.push("/cart");

      }

    };

    verifyPayment();

  }, []);

  return <p className="text-center mt-20">Verifying payment...</p>;
}