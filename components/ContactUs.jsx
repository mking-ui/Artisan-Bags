import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const ContactUs = () => {
    return (

        <>  <div className="flex flex-col md:flex-row items-center justify-between w-full px-10 py-16 mt-5 bg-gray-50">
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
            <div className="flex-1 text-center md:text-left px-4 shadow-lg ">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Contact Us
                </h2>
                <form className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:outline-none"
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
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:outline-none"
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
