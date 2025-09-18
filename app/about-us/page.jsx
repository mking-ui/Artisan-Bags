"use client"
import AboutUs from "@/components/AboutUs";
import Navbar from "@/components/Navbar";


const About = () => {
    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32">
                <AboutUs />
            </div>
           
        </>
    );
};
export default About;