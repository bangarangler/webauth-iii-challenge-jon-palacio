module.exports = {
  jwtSecret:
    process.env.JWT_SECRET || "The thing I do not want unless env not around!"
};
