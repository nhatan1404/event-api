const adminMiddleware = function (req, res, next) {
  if (!req.user.isAdmin) return res.forbidden();
  next();
};

export default adminMiddleware;
