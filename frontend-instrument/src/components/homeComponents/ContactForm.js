import React from "react";

function ContactForm() {
    return (
        <>
            <div className="contact-form container d-flex flex-column justify-content-center align-items-center">
                <div class='signup-container'>
                    <div class='left-container'>
                        <h1>
                            <i class="fas fa-music"></i>
                            Contact Form
                        </h1>
                        <div class='instrument-img'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/GuitareClassique5.png" />
                        </div>
                    </div>
                    <div class='right-container'>
                        <header>
                            <h1>Yay, puppies! Ensure your pup gets the best care!</h1>
                            <div class='set'>
                                <div class='users-name'>
                                    <label for='users-name'>Name</label>
                                    <input id='users-name' placeholder="Enter Name" type='text' />
                                </div>
                                <div class='users-photo'>
                                    <button id='users-upload'>
                                        <i class='fas fa-camera-retro'></i>
                                    </button>
                                    <label for='users-upload'>Upload a photo</label>
                                </div>
                            </div>
                            <div class='set'>
                                <div class='users-email'>
                                    <label for='users-email'>Email</label>
                                    <input id='users-email' placeholder="Enter Email" type='text' />
                                </div>
                                <div class='users-phone'>
                                    <label for='users-phone'>Phone</label>
                                    <input id='users-phone' placeholder='Enter Number Phone' type='text' />
                                </div>
                            </div>
                            <div class='users-address'>
                                <label for='users-address'>Address</label>
                                <input id='users-address' className="w-100per" placeholder="Enter Addres" type='text' />
                            </div>
                            <div class='users-message mt-2'>
                                <label for='users-message'>Message</label>
                                <textarea
                                    row="5"
                                    className="col-12 bg-light p-2 border-0 rounded"
                                    placeholder="Enter Message"
                                ></textarea>
                            </div>
                        </header>
                        <footer>
                            <div class='btn-contact-submit'>
                                <button id='submit'>Submit</button>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactForm;