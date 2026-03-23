import PaymentCallback from "@/components/PaymentCallback";
import React, { Suspense } from "react";

export default function PaymentPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
      <PaymentCallback/>
    </Suspense>
  );
}