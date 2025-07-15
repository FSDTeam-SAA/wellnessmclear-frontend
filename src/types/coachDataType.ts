export type CoachResponse = {
  status: boolean;
  message: string;
  data: {
    coaches: Coach[];
    pagination: {
      totalCount: number;
      page: number;
      totalPages: number;
    };
  };
};

export type Coach = {
  _id: string;
  averageRating:number
  reviewCount:number
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  gender: string;
  dateOfBirth: string; // ISO date string
  address: string;
  specialization: string;
  description: string;
  qualification: string;
  fieldOfExperiences: string;
  yearsOfExperience: number;
  certifications: string[];
  skills: {
    [key: string]: number; // e.g., "Medical Skills": 98
  };
  servicesOffered: {
    _id: string;
    icon: string;
    title: string;
    description: string;
    price: number;
    overview: string;
    overviewImage: string;
    receive: string;
    receiveImage: string;
    whom: string;
    whomImage: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  accepted: boolean;
  availability: {
    days: string[]; // e.g., ["Wednesday", "Thursday"]
    timeSlots: string[]; // e.g., ["10:00-13:00"]
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  serviceArea: string;
  stripeAccountId: string;
  status: string;
};
