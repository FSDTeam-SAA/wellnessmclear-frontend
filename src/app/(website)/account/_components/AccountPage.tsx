"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, LogOut, Camera } from "lucide-react";
import ChangePassword from "./ChangePassword";
import PersonalInfo from "./PersonalInfo";

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="lg:py-[88px] md:py-[50px] py-[30px] bg-[#F8FAF9]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card className="">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative">
                    <Avatar className="w-[150px] h-[150px] mb-4">
                      <AvatarImage src="/api/placeholder/96/96" alt="Profile" />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                        BE
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute  bottom-7 right-4 bg-[#FFFFFF] rounded-full p-1.5 cursor-pointer hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4 text-black" />
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Bessie Edwards
                  </h2>
                  <p className="text-gray-500 text-sm">
                    darrellesteward@gmail.com
                  </p>
                </div>

                <nav className="space-y-4">
                  <Button
                    onClick={() => setActiveTab("personal")}
                    className={`w-full justify-start h-[48px] text-sm font-medium rounded-md
      ${
        activeTab === "personal"
          ? "bg-[#424242] text-white hover:bg-gray-700"
          : "bg-transparent text-gray-600 hover:bg-gray-100"
      }
    `}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Personal Information
                  </Button>

                  <Button
                    onClick={() => setActiveTab("password")}
                    className={`w-full justify-start h-[48px] text-sm font-medium rounded-md
      ${
        activeTab === "password"
          ? "bg-[#424242] text-white hover:bg-gray-700"
          : "bg-transparent text-gray-600 hover:bg-gray-100"
      }
    `}
                  >
                    <Lock className="w-5 h-5 mr-3" />
                    Change Password
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Log out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card className="">
              <CardHeader className="">
                <CardTitle className="lg:text-[40px] md:text-[30px] text-[20px] text-center font-semibold text-gray-900">
                  Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {activeTab === "personal" && <PersonalInfo />}

                {activeTab === "password" && <ChangePassword />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
