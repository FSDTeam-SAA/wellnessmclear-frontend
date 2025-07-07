"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";
import { UserResponse } from "@/types/profiledatatype";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z.string().nullable().optional(),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const date = new Date(val);
      if (Number.isNaN(date.getTime())) return false;
      return /^\d{4}-\d{2}-\d{2}$/.test(val);
    }, { message: "Invalid date of birth" }),
  address: z.string().min(5, "Address must be at least 5 characters"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  road: z.string().min(2, "Road is required"),
  postalCode: z.string().min(4, "Postal Code is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

function PersonalInfo() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dob: "",
      address: "",
      country: "",
      city: "",
      road: "",
      postalCode: "",
    },
  });
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZiNTQ3ZmI3Y2U0OWEzMDU0YTY3MTUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MTg3ODAyNywiZXhwIjoxNzUzMTc0MDI3fQ.Z449lo4bDLRBjgrptViqO9Acuwves2LAp7uI-De_8J0"
  const userId = "686b547fb7ce49a3054a6715";

  const { data } = useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
  });

  const user = data?.data;

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        dob: user.dob ? new Date(user.dob).toISOString().substring(0, 10) : "",
        address: user.address || "",
        country: user.country || "",
        city: user.city || "",
        road: user.road || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user, reset]);

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: ProfileFormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok || !result?.status) {
        throw new Error(result?.message || "Update failed");
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  const onSubmit = (values: ProfileFormData) => {
    updateProfileMutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="lg:text-2xl md:text-xl text-base font-semibold leading-[120%] text-[#131313]">
          Personal Information
        </h3>
        <Button type="submit" className="bg-[#A8C2A3] hover:bg-green-600 text-white">
          <SquarePen className="mr-2 h-4 w-4" />
          Update
        </Button>
      </div>

      <div className="space-y-6">
        {/* First and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register("firstName")} className="mt-1 h-[52px]" />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register("lastName")} className="mt-1 h-[52px]" />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email (readonly) */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user?.email || ""} disabled className="mt-1 h-[52px]" />
        </div>

        {/* Phone and DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="phoneNumber">Phone</Label>
            <Input id="phoneNumber" {...register("phoneNumber")} className="mt-1 h-[52px]" />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" {...register("dob")} className="mt-1 h-[52px]" />
            {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}
          </div>
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address">Full Address</Label>
          <Input id="address" {...register("address")} className="mt-1 h-[52px]" />
          {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
        </div>

        {/* Country, City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" {...register("country")} className="mt-1 h-[52px]" />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city")} className="mt-1 h-[52px]" />
          </div>
        </div>

        {/* Road, Postal Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="road">Road</Label>
            <Input id="road" {...register("road")} className="mt-1 h-[52px]" />
          </div>
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input id="postalCode" {...register("postalCode")} className="mt-1 h-[52px]" />
          </div>
        </div>
      </div>
    </form>
  );
}

export default PersonalInfo;
