import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ProgressHeader from "./ProgressHeader";
import AboutStep from "./steps/AboutStep";
import AccountStep from "./steps/AccountStep";
import AddressStep from "./steps/AddressStep";
import {
  validateAbout,
  validateAccount,
  validateAddress,
} from "./validators";

export default function ProfileWizard() {
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
    zip: "",
    country: "",
    avatarFile: null,
    avatarUrl: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => {
      if (form.avatarUrl) URL.revokeObjectURL(form.avatarUrl);
    };
  }, [form.avatarUrl]);

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
    if (step === 1) errs = validateAbout(form);
    if (step === 2) errs = validateAccount(form);
    if (step === 3) errs = validateAddress(form);
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
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <ProgressHeader step={step} progress={progress} />
      <Form noValidate>
        {step === 1 && (
          <AboutStep
            values={form}
            errors={errors}
            onChange={handleChange}
            onAvatarChange={handleAvatarChange}
          />
        )}
        {step === 2 && (
          <AccountStep values={form} errors={errors} onChange={handleChange} />
        )}
        {step === 3 && (
          <AddressStep values={form} errors={errors} onChange={handleChange} />
        )}

        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={prev} disabled={step === 1}>
            Previous
          </Button>
          {step < 3 ? (
            <Button variant="primary" onClick={next}>
              Next
            </Button>
          ) : (
            <Button variant="success" onClick={finish}>
              Finish
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
