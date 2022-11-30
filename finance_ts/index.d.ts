export type UserType = {
  id?: string;
  email: string;
  age: number;
  names: string;
  photo?: PhotoType;
};

export type PhotoType = {
  id?: string;
  title: string;
  user: UserType;
};
