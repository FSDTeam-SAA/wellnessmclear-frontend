"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, LogOut, Camera } from "lucide-react";
import ChangePassword from "./ChangePassword";
import PersonalInfo from "./PersonalInfo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserResponse } from "@/types/profiledatatype";
// import { toast } from "react-hot-toast";


export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState("personal");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZiNTQ3ZmI3Y2U0OWEzMDU0YTY3MTUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MTg2NDQ4NCwiZXhwIjoxNzUzMTYwNDg0fQ.uSwSL7Gq4oBkBR-VauhjvZtF06FbJwDv9y1gFqbjlc8"


  const { data } = useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${`686b547fb7ce49a3054a6715`}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    // enabled: !!session?.user?.id,
  });

  const user = data?.data;


  // Mutation for uploading avatar
  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("profileImage", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/upload-avatar/686b547fb7ce49a3054a6715`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result?.status) {
        throw new Error(result?.message || "Upload failed");
      }

      return result;
    },
    onSuccess: () => {
      toast.success("Avatar uploaded successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to upload avatar");
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }
    uploadAvatarMutation.mutate(selectedFile);
  };

  return (
    <div className="lg:py-[88px] md:py-[50px] py-[30px] bg-[#F8FAF9]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col  items-center text-center mb-10">
                  <div className="relative">
                    <Avatar className="w-[150px] h-[150px] mb-4">
                      <AvatarImage src={user?.profileImage || previewUrl || "/api/placeholder/96/96"} alt="Profile" />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                        {user?.firstName?.charAt(0) || "U"}
                        {user?.lastName?.charAt(0) || "N"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className="absolute bottom-7 right-4 bg-[#FFFFFF] rounded-full p-1.5 cursor-pointer hover:bg-blue-700 transition-colors"
                      onClick={handleAvatarClick}
                    >
                      <Camera className="w-4 h-4 text-black" />
                    </div>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{user?.firstName} {user?.lastName}</h2>
                  <p className="text-gray-500 text-sm">{user?.email}</p>

                  <Button
                    onClick={handleSubmit}
                    className="mt-4 bg-[#A8C2A3] text-white"
                    disabled={uploadAvatarMutation.isPending}
                  >
                    {uploadAvatarMutation.isPending ? "Uploading..." : "Upload Avatar"}
                  </Button>
                </div>

                <nav className="space-y-4">
                  <Button
                    onClick={() => setActiveTab("personal")}
                    className={`w-full justify-start h-[48px] text-sm font-medium rounded-md
                    ${activeTab === "personal"
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
                    ${activeTab === "password"
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
            <Card>
              <CardHeader>
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
