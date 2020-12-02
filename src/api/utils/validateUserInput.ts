export function validateEmail(email: string): boolean {
  // https://www.w3resource.com/javascript/form/email-validation.php
  const emailRegex = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );

  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  const hasMinLength = password.length >= 4;

  return hasMinLength;
}
