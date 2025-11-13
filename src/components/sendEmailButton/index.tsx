"use client";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

export const SendEmailButton = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  // Mặc dù ta bỏ toast lỗi, nhưng vẫn giữ toast 'success'
  const { success, error } = useToast(); 

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      const msg = "⚠️ Email cannot be empty.";
      setValidationError(msg);
      return;
    }

    if (!isValidEmail(email)) {
      const msg = "Invalid email format. Please check your syntax.";
      setValidationError(msg);
      return;
    }

    setValidationError(null);
    if (status === "loading") return;
    setStatus("loading");

    const formUrl =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLScdc5ZRewqWRLKTtEu9nrlsoGVkxWQpqMFHBDvXZHQ5ZQPxqQ/formResponse";
    const formData = new FormData();
    formData.append("entry.1048720444", email);

    try {
      await fetch(formUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setEmail("");
      setStatus("success");
      success("✅ Submitted successfully!"); 
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      error("❌ Something went wrong. Try again.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`group relative flex items-center w-full xl:max-w-[30vw] max-w-[80vw] m-auto bg-white/10 backdrop-blur-md border rounded-full shadow-lg overflow-hidden transition-all duration-300 ${
        validationError ? "border-red-500/80" : "border-[#00D084]/30"
      }`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (validationError) {
            setValidationError(null);
          }
        }}
        disabled={status === "loading"}
        placeholder={
          validationError
            ? validationError
            : status === "loading"
            ? "Sending..."
            : status === "success"
            ? "✅ Submitted successfully!"
            : "ENTER YOUR EMAIL"
        }
        className={`flex-1 xl:p-[0.4vw] p-[3vw] xl:pl-[1.5vw] pl-[3vw] bg-transparent text-white xl:text-[1vw] text-[4vw] font-kode-mono placeholder:text-gray-100 placeholder:font-bold focus:outline-none w-full transition-all duration-300 focus:bg-transparent active:bg-transparent${
          status === "success" ? "placeholder:text-green-400" : ""
        } ${
          status === "error" || validationError ? "placeholder:text-red-400" : ""
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="cursor-pointer hover-button relative flex items-center justify-center xl:w-[3vw] w-[9vw] xl:h-[3vw] h-[9vw] xl:m-[0.4vw] m-[1vw] bg-black/50 backdrop-blur-sm border border-[#00D084]/30 rounded-full transition-all disabled:cursor-not-allowed"
      >
        {validationError ? (
          <span className="text-red-500 font-bold xl:text-[1.2vw] text-[4vw]">
            X
          </span>
        ) : status === "loading" ? (
          <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
        ) : (
          <img
            src="/images/button/arrow-button.png"
            alt="arrow"
            className="xl:w-[1vw] w-[3vw] group-hover:translate-x-0.5 transition-transform"
          />
        )}
      </button>
    </form>
  );
};

export default SendEmailButton;