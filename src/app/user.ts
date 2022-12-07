export interface Body{
  team: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  srole: string | null;
  password: string | null;
  email: string;
  body: Body;

}
