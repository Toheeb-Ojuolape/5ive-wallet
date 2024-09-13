export interface Country {
  name: string;
  code: string;
}

export interface User {
  name: string;
  country: Country;
  image: string;
}

export interface Notification {
  title: string;
  message: string;
  time: string;
  status: Boolean;
}

export interface Rating {
  pfi: string;
  did: string;
  rating: number;
}

export interface AvgRating {
  pfi: string;
  did: string;
  totalRating: number;
  count: number;
}
