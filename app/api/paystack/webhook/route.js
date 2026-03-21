import { NextResponse } from "next/server";
import crypto from "crypto";
import { inngest } from "@/config/inngest";
import connectDB from "@/config/db";
import User from "@/models/User";
import Product from "@/models/Product";

export async function POST(req) {
  const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
  const signature = req.headers.get("x-paystack-signature");
  const body = await req.text();

  // Verify signature
  const hash = crypto.createHmac("sha512", PAYSTACK_SECRET).update(body).digest("hex");
  if (hash !== signature) return NextResponse.json({ status: false });

  const payload = JSON.parse(body);

  if (payload.event === "charge.success") {
    const { email } = payload.data.customer;

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ status: false });

    const cartItemsArray = Object.keys(user.cartItems)
      .map((key) => ({ product: key, quantity: user.cartItems[key] }))
      .filter((item) => item.quantity > 0);

    let amount = 0;
    for (const item of cartItemsArray) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }
    amount += Math.floor(amount * 0.02); // tax

    // Trigger Inngest order event
    await inngest.send({
      name: "order/created",
      data: {
        userId: user._id,
        items: cartItemsArray,
        address: user.addresses[0]?._id || null,
        amount,
        date: Date.now(),
      },
    });

    // Clear user cart
    user.cartItems = {};
    await user.save();

    return NextResponse.json({ status: true });
  }

  return NextResponse.json({ status: false });
}