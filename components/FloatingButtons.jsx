'use client'
import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const FloatingButtons = () => {
    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
            {/* WhatsApp */}
            <a
                href="https://wa.me/2349076761102" // replace with your WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
            >
                <FaWhatsapp size={24} />
            </a>

            {/* Gmail */}
            <a
                href="mailto:micahenoch3@gmail.com"
                className="w-12 h-12 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition"
            >
                <SiGmail size={22} />
            </a>

            {/* Phone */}
            <a
                href="tel:+2349076761102" // replace with your phone number
                className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
            >
                <FaPhoneAlt size={20} />
            </a>
        </div>
    );
};

export default FloatingButtons;
