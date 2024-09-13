export interface Country {
  name: string,
  code: string,
}

export interface User {
  name: string,
  country: Country,
  image: string,
}

export interface Notification {
  title: string,
  message: string,
  time: string,
  status: Boolean
}
