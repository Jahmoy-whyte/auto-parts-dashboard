const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const emailTester = (email) => {
  const bool = emailRegex.test(email);
  return bool;
};

export default emailTester;
