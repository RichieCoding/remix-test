import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  cartId: string;
};

type SessionFlashData = {
  error: string;
};

const SECOND = 1;
const HOUR = 3600 * SECOND;
const DAY = 24 * HOUR;

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "cartId",
      maxAge: 7 * DAY,
    },
  });

export { getSession, commitSession, destroySession };
