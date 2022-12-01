import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ContactForm from "../components/homeComponents/ContactForm";
import ContactInfo from "../components/homeComponents/ContactInfo";

function ContactScreen() {
    return (
        <>
            <div>
                <Header />
                <ContactForm />
                <ContactInfo />
                <Footer />
            </div>
        </>
    );
}

export default ContactScreen;