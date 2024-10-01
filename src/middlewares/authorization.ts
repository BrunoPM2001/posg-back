import { createMiddleware } from "hono/factory";

const authorizationMiddleware = (modulo: string) => {
  return createMiddleware(async (c, next) => {
    const payload = c.get("jwtPayload");

    return payload.modulo !== modulo ? c.text("Unauthorized", 401) : next();
  });
};

export default authorizationMiddleware;
