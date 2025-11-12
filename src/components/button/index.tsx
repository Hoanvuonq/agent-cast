"use client";
import React, { useState } from "react";

const PixelArrowIcon = () => (
  <img
    src="/images/button/arrow-button.png"
    alt="arrow"
    className="w-[1Vw] group-hover:translate-x-0.5 transition-transform"
  />
);

export const SendEmailButton = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error // !!! SỬ DỤNG URL APPS SCRIPT MÀ BẠN ĐÃ TRIỂN KHAI !!!

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwGJrvwj8la3ICZYG1MvorRhMAN3u9FYd3P68SOC4-vowCzjNkRVq-DDYoCs7LDhPTKsw/exec"; // !!! THAY THẾ TOÀN BỘ HÀM HANDLESUBMIT NÀY !!!

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading" || !email) return;

    setStatus("loading");
    console.log("Submitting with fetch to Apps Script...");

    // Đóng gói dữ liệu JSON (đây là cái Apps Script đang mong đợi)
    const data = {
      email: email,
    };

    try {
      // Gửi dữ liệu bằng fetch, không dùng hack iframe
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "cors", // Cần thiết để gọi từ domain khác
        headers: {
          // Apps Script đọc body dạng text/plain
          "Content-Type": "text/plain;charset=utf-8",
        },
        // Gửi đi DẠNG CHUỖI JSON
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "success") {
        console.log("Gửi thành công:", result.message);
        setStatus("success");
        setEmail(""); // Xóa email sau khi thành công
      } else {
        console.error("Lỗi từ Apps Script:", result.message);
        setStatus("error");
      }
    } catch (err) {
      console.error("Lỗi khi gửi fetch (check CORS):", err);
      setStatus("error");
    }
  }; // (Phần JSX <form> ... </form> của bạn giữ nguyên, nó đã tốt rồi)

  return (
    <form
      onSubmit={handleSubmit}
      className="
        group relative flex items-center
        w-full max-w-md lg:max-w-lg mx-auto 
        bg-black/30 backdrop-blur-md 
        border border-[#00D084]/30 
        rounded-full shadow-lg
        overflow-hidden
      "
    >
           {" "}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={
          status === "success"
            ? "✅ Gửi thành công!"
            : status === "loading"
            ? "Đang gửi..."
            : status === "error"
            ? "❌ Lỗi, vui lòng thử lại."
            : "ENTER YOUR EMAIL"
        }
        required
        disabled={status === "loading"}
        className="
          flex-1 p-[0.4vw] pl-8 
          bg-transparent 
          text-white text-[1vw] font-kode-mono 
          placeholder:text-gray-100
          placeholder:font-bold
          focus:outline-none
          w-full
          disabled:opacity-50
        "
      />
           {" "}
      <button
        type="submit"
        disabled={status === "loading"}
        className="
          cursor-pointer hover-button
          relative flex items-center justify-center
          w-[3vw] h-[3vw] m-2 
          bg-black/50 backdrop-blur-sm
          border border-[#00D084]/30
          rounded-full
      _     transition-all
          disabled:cursor-not-allowed
        "
      >
        {status === "loading" ? (
          <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
        ) : (
          <PixelArrowIcon />
        )}
      </button>
    </form>
  );
};
