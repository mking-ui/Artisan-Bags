import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full px-10 py-16 mt-5 bg-gray-50">
            {/* Left: Image */}
            <div className="flex-1 flex  justify-center mb-8 md:mb-0">
                <Image
                    src={assets.header_headphone_image} // replace with your tote bag image from assets
                    alt="artisan tote bag"
                    className="rounded-2xl w-[90%] md:w-[70%] object-cover"
                />

            </div>


            {/* Right: Text */}
            <div className="flex-1 text-center md:text-left px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    About Us
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                    We are passionate about creating artisan tote bags that blend
                    tradition, sustainability, and modern style. Each piece is carefully
                    handcrafted using eco-friendly materials, making every bag unique.
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                    Our mission is simple: to empower artisans, celebrate craftsmanship,
                    and give you timeless accessories that reflect authenticity and care.
                </p>
                <Link  href="/all-products" className="px-6 py-3 bg-amber-600 text-white rounded-full text-sm md:text-base font-medium shadow hover:bg-amber-700 transition">
                    Explore Our Collection
                </Link>
            </div>
            
        </div>
    );
};

export default AboutUs;
