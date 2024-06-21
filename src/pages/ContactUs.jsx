import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
    toast.success("Recieved Your Email! Will contact you soon.");
  };
  return (
    <div className="min-h-screen bg-base-200 py-10 px-5 md:px-20">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="card shadow-lg bg-white p-8">
          <h2 className="text-2xl font-bold mb-5">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control flex flex-row gap-5">
              <label className="label font-bold w-24" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="border rounded w-full p-2"
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-control flex flex-row gap-5">
              <label className="label font-bold w-24" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="border rounded w-full p-2"
                placeholder="youremail@gmail.com"
                required
              />
            </div>
            <div className="form-control flex flex-row gap-5">
              <label className="label font-bold w-24" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="border rounded w-full p-2"
                placeholder="Your message..."
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>

        <div className="flex flex-col">
          <div className="card shadow-lg  p-8 bg-white  max-h-fit">
            <h2 className="text-2xl font-bold mb-5">Contact Information</h2>
            <p className="text-lg mb-3">
              Feel free to reach out to us through any of the following methods:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26c.14.09.3.14.46.14s.32-.05.46-.14L21 8M5 19h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-lg">Email: contact@dailyhut.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10l1.663 2.536C5.09 13.748 6.578 14 8 14c1.422 0 2.91-.252 3.337-.464L13 10m5-2v10c0 2-2 2-2 2H8c-2 0-2-2-2-2V8a2 2 0 012-2h6c2 0 2 2 2 2z"
                  />
                </svg>
                <span className="text-lg">Phone: (123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v10m4-14l-4-4-4 4M4 12h16M3 20h18"
                  />
                </svg>
                <span className="text-lg">
                  Address: 123 Main Street, Hometown, CA 12345
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
