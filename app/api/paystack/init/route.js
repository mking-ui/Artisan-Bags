import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, amount, userId } = await request.json(); // ✅ include userId

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // amount in kobo
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
        metadata: { userId }, // ✅ attach userId for later verification
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}