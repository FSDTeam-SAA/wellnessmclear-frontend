"use client";
import React from 'react';
import { User, Lock, LogOut } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';

// Validation schema
const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number'),
  country: z.string().min(2, 'Country is required'),
  cityState: z.string().min(2, 'City/State is required'),
  roadArea: z.string().min(5, 'Road/Area must be at least 5 characters'),
  postalCode: z.string().min(4, 'Postal code must be at least 4 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function AccountPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: 'Bessie',
      lastName: 'Edwards',
      email: 'alma.lawson@example.com',
      phone: '(307) 555-0133',
      country: 'USA',
      cityState: 'California',
      roadArea: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      postalCode: '15289959',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Handle form submission here
  };

  return (
    <div className="container mx-auto lg:p-[88px] bg-white">
      {/* Header */}
      <div className="text-center mb-[40px]">
        <h1 className="lg:text-[40px] md:text-[30px] text-[24px] text-[#131313] font-bold leading-[120%]">Accounts</h1>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          {/* Profile Section */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                width={200}
                height={200}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-gray-800">Bessie Edwards</h2>
            <p className="text-sm text-gray-500">UI/UX Designer</p>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <Button 
              variant="default" 
              className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white"
            >
              <User className="w-5 h-5 mr-3" />
              Personal Information
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-600 hover:bg-gray-50"
            >
              <Lock className="w-5 h-5 mr-3" />
              Change Password
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Log out
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white">
            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              <Button 
                type="submit" 
                form="personal-info-form"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
              >
                ✓ Update
              </Button>
            </div>

            {/* Form */}
            <Form {...form}>
              <form 
                id="personal-info-form" 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6"
              >
                {/* First Row */}
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-[#131313]">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-[#131313]">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-[#131313]">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            {...field} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-[#131313]">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            {...field} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-[#131313]">
                          Country
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cityState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-[#131313]">
                          City/State
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Road/Area */}
                <FormField
                  control={form.control}
                  name="roadArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-[#131313]">
                        Road/Area
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Postal Code */}
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-[#131313]">
                        Postal Code
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        
      </div>
    </div>
  );
}