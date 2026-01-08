export const COOKIES = {
  getOptions: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  }),

  set: (res, name, value, options = {}) => {
    res.cookie(name, value, {
      ...COOKIES.getOptions(),
      ...options,
    });
  },

  clear: (res, name, options = {}) => {
    res.clearCookie(name, {
      ...COOKIES.getOptions(),
      ...options,
    });
  },

  get: (req, name) => {
    return req.cookies[name];
  },
};
