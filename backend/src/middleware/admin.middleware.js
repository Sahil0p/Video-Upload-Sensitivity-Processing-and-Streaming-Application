const isAdmin = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    // Adjust this based on how you store role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }
  
    next();
  };
  
  export default isAdmin;
  