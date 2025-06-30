"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPinned } from "lucide-react";

export default function SendMessage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div
      className="min-h-[645px] flex items-center justify-center p-4"
      style={{ backgroundColor: "#A8C2A3" }}
    >
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="text-white space-y-6 max-w-xl w-full">
          <h1 className="text-3xl sm:text-4xl font-light tracking-wide">
            Start Your Wellness Journey
          </h1>

          <div className="space-y-4">
            <p className="text-base sm:text-lg opacity-90">Have questions?</p>
            <p className="text-base sm:text-lg opacity-90">
              Our wellness experts are here to help.
            </p>

            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 opacity-80 text-black" />
                <span className="opacity-90 text-sm sm:text-base">
                  info@wellnessmadeclear.com
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <MapPinned className="w-5 h-5 opacity-80 text-black" />
                <span className="opacity-90 text-sm sm:text-base">
                  14071 Peyton Drive, Suite #2831, Chino Hills, CA 91709
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="w-full max-w-xl bg-white shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="border-gray-300 focus:border-green-400 focus:ring-green-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="border-gray-300 focus:border-green-400 focus:ring-green-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                  rows={4}
                  className="border-gray-300 focus:border-green-400 focus:ring-green-400 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="py-3 text-white font-medium"
                  style={{ backgroundColor: "#A8B5A0" }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
