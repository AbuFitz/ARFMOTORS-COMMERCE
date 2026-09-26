"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    carModel: "",
    postcode: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email service or backend
    console.log("Form submitted:", formData);
    alert("Thank you for your enquiry. We'll get back to you shortly!");
    onClose();
    setFormData({ name: "", email: "", carModel: "", postcode: "", message: "" });
  };

  const whatsappNumber = "447930991598";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-neutral-900 text-white px-6 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Get in Touch</h2>
                  <p className="text-sm text-neutral-300 mt-1">
                    We're here to help with your BMW upgrade
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quick contact options */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <a
                    href="tel:+447930991598"
                    className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary-500" />
                    <span className="text-sm font-medium">Call Us</span>
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">WhatsApp</span>
                  </a>
                </div>

                {/* Contact form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="carModel" className="block text-sm font-medium text-neutral-700 mb-1">
                        BMW Model
                      </label>
                      <input
                        type="text"
                        id="carModel"
                        placeholder="e.g., F30"
                        value={formData.carModel}
                        onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="postcode" className="block text-sm font-medium text-neutral-700 mb-1">
                        Postcode
                      </label>
                      <input
                        type="text"
                        id="postcode"
                        placeholder="SW1A 1AA"
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-primary-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Send Enquiry
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
