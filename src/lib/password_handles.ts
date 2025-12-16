import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// Generate random password
export function generatePassword(name: string, length = 4) {
  const namePrefix = name.replace(/\s/g, "").slice(0, length).toUpperCase();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const specialChars = "!@#$%^&*";
  const randomSpecial =
    specialChars[Math.floor(Math.random() * specialChars.length)];
  const pswd = `${namePrefix}${randomDigits}${randomSpecial}`;
  return pswd;
}

export const CLG_CODE = (name: string) => {
  return name
    .replace(/[^A-Z]/gi, "")
    .substring(0, 4)
    .toUpperCase();
};

// Generate college code
export const collageCode = (name: string) => {
  return "COLL-" + CLG_CODE(name) + "-" + Date.now().toString().slice(-4);
};
