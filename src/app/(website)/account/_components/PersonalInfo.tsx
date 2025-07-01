"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";

function PersonalInfo() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Bessie",
    lastName: "Edwards",
    email: "alma.lawson@example.com",
    phone: "(307) 555-0133",
    country: "USA",
    cityState: "California",
    roadArea: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    postalCode: "15269969",
  });
  const handlePersonalInfoChange = (
    field: keyof typeof personalInfo,
    value: string
  ) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Personal info updated:", personalInfo);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="lg:text-2xl md:text-xl text-base font-semibold leading-[120%] text-[#131313]">
          Personal Informationasdf
        </h3>
        <Button
          onClick={handlePersonalInfoSubmit}
          className="bg-[#A8C2A3] hover:bg-green-600 text-white"
        >
          <span>
            <SquarePen />
          </span>
          Update
        </Button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="firstName"
              className="text-base font-medium text-[#131313]"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              value={personalInfo.firstName}
              onChange={(e) =>
                handlePersonalInfoChange("firstName", e.target.value)
              }
              className="mt-1 h-[52px]"
            />
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-base font-medium text-[#131313]"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              value={personalInfo.lastName}
              onChange={(e) =>
                handlePersonalInfoChange("lastName", e.target.value)
              }
              className="mt-1 h-[52px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="email"
              className="text-base font-medium text-[#131313]"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) =>
                handlePersonalInfoChange("email", e.target.value)
              }
              className="mt-1 h-[52px]"
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="text-base font-medium text-[#131313]"
            >
              Phone
            </Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) =>
                handlePersonalInfoChange("phone", e.target.value)
              }
              className="mt-1 h-[52px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="country"
              className="text-base font-medium text-[#131313]"
            >
              Country
            </Label>
            <Input
              id="country"
              value={personalInfo.country}
              onChange={(e) =>
                handlePersonalInfoChange("country", e.target.value)
              }
              className="mt-1 h-[52px]"
            />
          </div>
          <div>
            <Label
              htmlFor="cityState"
              className="text-base font-medium text-[#131313]"
            >
              City/State
            </Label>
            <Input
              id="cityState"
              value={personalInfo.cityState}
              onChange={(e) =>
                handlePersonalInfoChange("cityState", e.target.value)
              }
              className="mt-1 h-[52px]"
            />
          </div>
        </div>

        <div>
          <Label
            htmlFor="roadArea"
            className="text-base font-medium text-[#131313]"
          >
            Road/Area
          </Label>
          <Input
            id="roadArea"
            value={personalInfo.roadArea}
            onChange={(e) =>
              handlePersonalInfoChange("roadArea", e.target.value)
            }
            className="mt-1 h-[52px]"
          />
        </div>

        <div>
          <Label
            htmlFor="postalCode"
            className="text-base font-medium text-[#131313]"
          >
            Postal Code
          </Label>
          <Input
            id="postalCode"
            value={personalInfo.postalCode}
            onChange={(e) =>
              handlePersonalInfoChange("postalCode", e.target.value)
            }
            className="mt-1 h-[52px]"
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
