import { JwtPayload } from "jsonwebtoken";

declare module JWT {
  export interface Payload extends JwtPayload {
    email: string;
    role: string;
  }
}
