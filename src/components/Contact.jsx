import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    services: [],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    "Micro SaaS Development",
    "Application Development",
    "2D & 3D Website Development",
    "Custom AI Development",
    "Digital Marketing",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (formData.services.length === 0) {
      toast.error("Please select at least one service");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
      
      toast.success("Thank you! Your message has been sent successfully. We'll get back to you soon!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        services: [],
        message: "",
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="bg-gradient-to-br bg-card p-4 sm:p-6 lg:p-8 rounded-3xl max-w-2xl w-full shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 ">
          Let's work <span className="text-teal-500">together.</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name *"
            className="w-full p-2 sm:p-3 rounded-lg bg-gray-200 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email *"
            className="w-full p-2 sm:p-3 rounded-lg bg-gray-200 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
          />

          {/* Contact Number */}
          <div>
            <label className="block mb-2">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="Enter contact number"
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-200 text-black  placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
            />
          </div>

          {/* I Need */}
          <div>
            <label className="block mb-4">I Need *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
              {serviceOptions.map((service, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceChange(service)}
                    className="w-4 h-4 accent-teal-500"
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Your Message */}
          <div>
            <label className="block mb-2">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-200 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-2 sm:p-3 rounded-lg transition text-sm sm:text-base font-medium ${
              isSubmitting
                ? "bg-teal-400 text-gray-400 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600 "
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

