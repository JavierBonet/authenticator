export * from "../../common/interfaces";

declare global {
  namespace JWT {
    export interface Payload extends JwtPayload {
      email: string;
      role: string;
    }
  }
}
