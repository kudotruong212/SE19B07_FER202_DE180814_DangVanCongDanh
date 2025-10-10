export const validateAbout = (f) => {
  const e = {};
  if (!f.firstName) e.firstName = "First name is required";
  if (!f.lastName) e.lastName = "Last name is required";
  if (!f.email) e.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Email is invalid";
  if (!f.phone) e.phone = "Phone is required";
  if (!f.age) e.age = "Age is required";
  else if (+f.age <= 0) e.age = "Age must be > 0";

  if (f.avatarFile) {
    const okType = ["image/png", "image/jpeg"].includes(f.avatarFile.type);
    const okSize = f.avatarFile.size <= 2 * 1024 * 1024;
    if (!okType) e.avatar = "Only PNG/JPG allowed";
    else if (!okSize) e.avatar = "Max size is 2MB";
  }
  return e;
};

export const validateAccount = (f) => {
  const e = {};
  const pwd = (f.password ?? "").trim();
  const cpw = (f.confirmPassword ?? "").trim();

  if (!pwd) e.password = "Password is required";
  else if (pwd.length < 5) e.password = "Password must be at least 5 characters";

  if (!cpw) e.confirmPassword = "Confirm password is required";
  else if (pwd !== cpw) e.confirmPassword = "Passwords do not match";

  if (!f.username) e.username = "Username is required";
  if (!f.question) e.question = "Select a secret question";
  if (!f.answer) e.answer = "Answer is required";
  return e;
};

export const validateAddress = (f) => {
  const e = {};
  if (!f.street) e.street = "Street is required";
  if (!f.city) e.city = "City is required";
  if (!f.state) e.state = "State is required";
  if (!f.zip) e.zip = "Zip code is required";
  if (!f.country) e.country = "Country is required";
  return e;
};
