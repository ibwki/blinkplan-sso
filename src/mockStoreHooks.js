export const getUserDataFromStore = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export const getJWTTokenFromStore = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return token;
  }
  return null;
};
