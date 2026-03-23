import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import { inngest } from "@/config/inngest";
import User from "@/models/User";
import Product from "@/models/Product";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference)
    return NextResponse.json({ success: false, message: "No reference provided" });

  try {
    // 1️⃣ Verify payment with Paystack
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const data = await res.json();

    if (!data.status) {
      return NextResponse.json({ success: false, message: "Payment failed" });
    }

    // 2️⃣ Connect to DB
    await connectDB();

    // 3️⃣ Find user
    const email = data.data.customer.email;
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ success: false, message: "User not found" });

    // 4️⃣ Build order items from cart
    const cartItemsArray = Object.keys(user.cartItems)
      .map((key) => ({ product: key, quantity: user.cartItems[key] }))
      .filter((item) => item.quantity > 0);

    let amount = 0;
    for (const item of cartItemsArray) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }
    amount += Math.floor(amount * 0.02); // tax

    // 5️⃣ Trigger Inngest event
    await inngest.send({
      name: "order/created",
      data: {
        userId: user._id,
        items: cartItemsArray,
        address: data.data.metadata.address ?? user.addresses[0] ?? {},
        amount,
        date: Date.now(),
      },
    });

    // 6️⃣ Clear user cart
    user.cartItems = {};
    await user.save();

    return NextResponse.json({ success: true, message: "Payment verified and order created" });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}