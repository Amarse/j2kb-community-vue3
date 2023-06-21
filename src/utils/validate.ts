const validate = {
  inputCheck(value: string): boolean {
    return value !== "" ? true : false;
  },
  emailValidCheck(email: string): boolean {
    const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  },
  passwordValidCheck(password: string): boolean {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-]).{8,25}$/;
    return passwordRegex.test(password);
  },
};

export default validate;
