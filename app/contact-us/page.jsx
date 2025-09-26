"use client"
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactUs = () => {
    const { getToken } = useAppContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await getToken();
            const response = await axios.post(
                "/api/contact",
                { name, email, phone, message },   // form data
                { headers: { Authorization: `Bearer ${token}` } } // headers
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
                console.log(response.data);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.message)

        }

    };
    return (

        <>
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-between w-full px-10 py-16 mt-5 bg-gray-50">
                {/* Left: Image */}
                <div className=" flex-col flex-1  justify-center mb-8 md:mb-0">
                    <Image
                        src={assets.header_macbook_image} // replace with your tote bag image from assets
                        alt="artisan tote bag"
                        className="rounded-2xl w-[90%] md:w-[70%] object-cover"
                    />
                    <Image
                        src={assets.logo} // replace with your tote bag image from assets
                        alt="artisan tote bag"
                        className="rounded-2x w-[20%] md:w-[20%] object-cover"
                    />

                </div>

                {/* Right: Text */}
                <div className="flex-1 text-center md:text-left px-4 border  py-4 rounded-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Contact Us
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:outline-none"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:outline-none"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:outline-none"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                required
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                placeholder="Write your message here..."
                                rows="4"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:outline-none"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                required
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-amber-600 text-white font-medium py-3 rounded-lg hover:bg-amber-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>


        </>

    );
};

export default ContactUs;
