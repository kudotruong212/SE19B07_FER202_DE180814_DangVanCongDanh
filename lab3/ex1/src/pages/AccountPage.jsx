import React, { useState } from "react";
import { Container, Button, Form, ProgressBar, Tabs, Tab } from "react-bootstrap";
import AboutForm from "../components/Account/AboutForm";
import AccountForm from "../components/Account/AccountForm";
import AddressForm from "../components/Account/AddressForm";

export default function AccountPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    username: "",
    password: "",
    confirmPassword: "",
    question: "",
    answer: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    avatarFile: null,
    avatarUrl: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setForm((f) => ({ ...f, avatarFile: null, avatarUrl: "" }));
      setErrors((er) => ({ ...er, avatar: undefined }));
      return;
    }
    const okType = ["image/png", "image/jpeg"].includes(file.type);
    const okSize = file.size <= 2 * 1024 * 1024;
    if (!okType || !okSize) {
      setForm((f) => ({ ...f, avatarFile: null, avatarUrl: "" }));
      setErrors((er) => ({
        ...er,
        avatar: !okType ? "Only PNG/JPG allowed" : "Max size is 2MB",
      }));
      return;
    }
    const url = URL.createObjectURL(file);
    setErrors((er) => ({ ...er, avatar: undefined }));
    setForm((f) => ({ ...f, avatarFile: file, avatarUrl: url }));
  };

  const validateStep = () => {
    let errs = {};
    if (step === 1) {
      if (!form.firstName) errs.firstName = "First name is required";
      if (!form.lastName) errs.lastName = "Last name is required";
      if (!form.email) errs.email = "Email is required";
      if (!form.phone) errs.phone = "Phone is required";
      if (!form.age) errs.age = "Age is required";
    }
    if (step === 2) {
      if (!form.username) errs.username = "Username is required";
      if (!form.password) errs.password = "Password is required";
      if (!form.confirmPassword) errs.confirmPassword = "Confirm password is required";
      if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
      if (!form.question) errs.question = "Secret question is required";
      if (!form.answer) errs.answer = "Answer is required";
    }
    if (step === 3) {
      if (!form.street) errs.street = "Street is required";
      if (!form.city) errs.city = "City is required";
      if (!form.state) errs.state = "State is required";
      if (!form.country) errs.country = "Country is required";
      if (!form.zip) errs.zip = "Zip code is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => s + 1);
  };
  const prev = () => setStep((s) => s - 1);

  const finish = () => {
    if (!validateStep()) return;
    alert("Profile built successfully!\n" + JSON.stringify(form, null, 2));
  };

  const progress = (step / 3) * 100;

  return (
    <Container className="mt-4" style={{ maxWidth: 700 }} data-bs-theme="dark">
      {/* Header with icon and title */}
      <div className="d-flex align-items-center mb-3">
        <div className="header-avatar">
          <i className="bi bi-person-fill"></i>
        </div>
        <h4 className="m-0 fw-semibold text-light">Build Your Profile</h4>
      </div>

      {/* Progress bar */}
      <ProgressBar
        now={progress}
        className="mb-3 thin-progress"
        variant="primary"
      />

      {/* Tabs */}
      <Tabs activeKey={step} className="mb-3" onSelect={() => {}}>
        <Tab eventKey={1} title="About" disabled />
        <Tab eventKey={2} title="Account" disabled />
        <Tab eventKey={3} title="Address" disabled />
      </Tabs>

      <Form noValidate>
        {step === 1 && (
          <AboutForm
            values={form}
            errors={errors}
            onChange={handleChange}
            onAvatarChange={handleAvatarChange}
          />
        )}
        {step === 2 && (
          <AccountForm values={form} errors={errors} onChange={handleChange} />
        )}
        {step === 3 && (
          <AddressForm 
            values={form} 
            errors={errors} 
            onChange={handleChange}
            onPrevious={prev}
            onFinish={finish}
          />
        )}

        {/* Navigation buttons only for steps 1 and 2 */}
        {step < 3 && (
          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={prev} disabled={step === 1}>
              Previous
            </Button>
            <Button variant="primary" onClick={next}>
              Next
            </Button>
          </div>
        )}
      </Form>
    </Container>
  );
}
