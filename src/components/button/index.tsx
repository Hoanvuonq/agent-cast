"use client";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

export const SendEmailButton = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { success, error } = useToast(); // 👈 dùng custom hook

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || status === "loading") return;
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
      className="group relative flex items-center w-full xl:max-w-[30vw] max-w-[80vw] m-auto bg-white/10 backdrop-blur-md border border-[#00D084]/30 rounded-full shadow-lg overflow-hidden"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        placeholder={
          status === "loading"
            ? "Sending..."
            : status === "success"
            ? "✅ Submitted successfully!"
            : "ENTER YOUR EMAIL"
        }
        className={`flex-1 xl:p-[0.4vw] p-[3vw] xl:pl-[1.5vw] pl-[3vw] bg-transparent text-white xl:text-[1.4vw] text-[4vw] font-kode-mono placeholder:text-gray-100 placeholder:font-bold focus:outline-none w-full transition-all duration-300 ${
          status === "success" ? "placeholder:text-green-400" : ""
        } ${status === "error" ? "placeholder:text-red-400" : ""}`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="cursor-pointer hover-button relative flex items-center justify-center xl:w-[3vw] w-[9vw] xl:h-[3vw] h-[9vw] xl:m-[0.4vw] m-[1vw] bg-black/50 backdrop-blur-sm border border-[#00D084]/30 rounded-full transition-all disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
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
