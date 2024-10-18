import { JwtPayload } from "jsonwebtoken";

export * from "../../common/interfaces";

declare module JWT {
  export interface Payload extends JwtPayload {
    email: string;
    role: string;
  }
}
