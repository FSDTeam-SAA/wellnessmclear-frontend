export type ReviewsResponse = {
  status: boolean;
  message: string;
  data: {
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
    ratingBreakdown: RatingBreakdown;
  };
};

export type Review = {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
  };
  rating: number;
  review: string;
  createdAt: string; // ISO date string
};

export type RatingBreakdown = {
  [rating: number]: number; // e.g. 1, 2, 3, 4, 5
};
