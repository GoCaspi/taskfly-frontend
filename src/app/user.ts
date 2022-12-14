export interface Body{
  team: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string | null;
  srole: string | null;
  email: string;
  body: Body;
  reseted : boolean;
}
