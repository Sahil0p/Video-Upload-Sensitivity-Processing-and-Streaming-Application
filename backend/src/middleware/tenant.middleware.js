export const tenantMiddleware = (req, res, next) => {
    if (!req.user?.tenantId) {
      return res.status(400).json({
        message: "Tenant information missing",
      });
    }
  
    req.tenantId = req.user.tenantId;
    next();
  };
  