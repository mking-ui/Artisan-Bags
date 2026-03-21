"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const PaymentCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reference, setReference] = useState(null);

  useEffect(() => {
    const ref = searchParams.get("reference");
    if (ref) setReference(ref);
  }, [searchParams]);

  useEffect(() => {
    if (!reference) return;

    const verifyPayment = async () => {
      try {
        const { data } = await axios.get(`/api/paystack/verify?reference=${reference}`);
        if (data.success) {
          toast.success("Payment successful!");
          router.push("/order-placed"); // redirect after success
        } else {
          toast.error(data.message || "Payment verification failed");
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    verifyPayment();
  }, [reference, router]);

 return <div className="text-center py-20">Verifying payment, please wait...</div>;
};

export default PaymentCallback;