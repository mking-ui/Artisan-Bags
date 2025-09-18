"use client"
import ContactUs from "@/components/ContactUs";
import Navbar from "@/components/Navbar";


const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32">
                <ContactUs />
            </div>
           
        </>
    );
};
export default Contact;