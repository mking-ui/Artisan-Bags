
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Contact from "@/models/Contact";



export async function POST(request) {
    try {
        await connectDB()

        const { name, email, phone, message } = await request.json();

        const newContact = await Contact.create({
            name,
            email,
            phone,
            message,
        });

        return NextResponse.json({ success: true, message: "Message sent successfully", newContact });

    } catch (error) {
        console.error("Error in /api/contact:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request){

    try {
        await connectDB()
        const getContact = await Contact.find();
        return NextResponse.json({success: true, getContact})
    } catch (error) {
        return NextResponse.json({success: false, message: error.messsage})
    }
}