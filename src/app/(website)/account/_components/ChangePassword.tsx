import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

function ChangePassword() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = (
    field: keyof typeof passwords,
    value: string
  ) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match");
      return;
    }
    console.log("Password change requested");
    setPasswords({ current: "", new: "", confirm: "" });
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="lg:text-2xl md:text-xl text-base font-semibold leading-[120%] text-[#131313]">Change password</h3>
        <Button
          onClick={handlePasswordSubmit}
          className="bg-[#A8C2A3] hover:bg-green-600 text-white w-[130px]"
        >
          Save
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <Label
            htmlFor="currentPassword"
            className="text-base font-medium text-[#131313]"
          >
            Current Password
          </Label>
          <Input
            id="currentPassword"
            type="password"
            value={passwords.current}
            onChange={(e) => handlePasswordChange("current", e.target.value)}
            placeholder="Enter current password"
            className="mt-1 h-[52px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="newPassword"
              className="text-base font-medium text-[#131313]"
            >
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={passwords.new}
              onChange={(e) => handlePasswordChange("new", e.target.value)}
              placeholder="Enter new password"
              className="mt-1 h-[52px]"
            />
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="text-base font-medium text-[#131313]"
            >
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwords.confirm}
              onChange={(e) => handlePasswordChange("confirm", e.target.value)}
              placeholder="Confirm new password"
              className="mt-1 h-[52px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
