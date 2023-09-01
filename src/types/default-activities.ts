export interface IPredefinedActivityCard {
  name: string;
  type: string;
  participants: number;
  price: number;
  accessibility: number;
  _id: string;
  imageId: string;
  blur_hash: string;
  urls: Urls;
  user: User;
  averageRating: number;
  reviews: number;
}

export interface Urls {
  full: string;
  thumb: string;
  regular: string;
}

export interface User {
  name: string;
  username: string;
  links: Links;
  profile_image: ProfileImage;
}

export interface Links {
  html: string;
}

export interface ProfileImage {
  medium: string;
}

export type IPredefinedActivityIDArray = {
  rating: number;
  id: string;
};

export type BoredAPIActivityType = "education" | "recreational" | "social" | "diy" | "charity" | "cooking" | "relaxation" | "music" | "busywork" | "all";


export interface IPredefinedActivity extends IPredefinedActivityCard {
  description: string;
  listOfLinks: ActivityLink;
}

interface ActivityLink {
  url: string;
}
