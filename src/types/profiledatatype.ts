export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  profileImage: string;
  role: string | null; 
  otp: string | null;
  otpExpires: string | null;
  refreshToken: string;
  hasActiveSubscription: boolean;
  subscriptionExpireDate: string | null;
  dob: string | null; // Backend uses 'dob'
  gender: "male" | "female" | "other";
  address: string;
  country: string;
  city: string;
  road: string;
  postalCode: string;
};

export type UserResponse = {
  status: boolean;
  message: string;
  data: User;
};
