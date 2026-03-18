"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import {
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiBox,
  FiShoppingBag,
  FiTruck,
  FiRefreshCw,
  FiHelpCircle,
} from "react-icons/fi";
import { API_CONFIG } from "../../lib/api-config";
import { getSystemUserByCompanyId } from "../../lib/api-services";
import { SystemUser } from "../../types/system-user";
import ScrollAnimation from "../../components/shared/ScrollAnimation";

const contactReasons = [
  {
    id: "product",
    label: "পণ্য সংক্রান্ত",
    icon: FiBox,
    description: "সাইজ, কালার বা স্টক",
  },
  {
    id: "order",
    label: "অর্ডার সংক্রান্ত",
    icon: FiShoppingBag,
    description: "অর্ডার স্ট্যাটাস বা পরিবর্তন",
  },
  {
    id: "delivery",
    label: "ডেলিভারি সংক্রান্ত",
    icon: FiTruck,
    description: "ডেলিভারি সময় বা লোকেশন",
  },
  {
    id: "refund",
    label: "রিটার্ন/রিফান্ড",
    icon: FiRefreshCw,
    description: "পণ্য ফেরত বা টাকা ফেরত",
  },
  {
    id: "other",
    label: "অন্যান্য",
    icon: FiHelpCircle,
    description: "অন্য কোন বিষয়",
  },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  reason?: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    reason: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [companyInfo, setCompanyInfo] = useState<SystemUser | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const data = await getSystemUserByCompanyId(API_CONFIG.companyId);
        if (data) setCompanyInfo(data);
      } catch {}
    };
    loadCompany();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ type: "loading" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setFormStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setFormStatus({ type: "idle" });
      }, 4000);
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative bg-white overflow-hidden"
    >
      <div className="relative  max-w-7xl mx-auto px-4 sm:px-5 py-12 sm:py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          <div className="inline-block mb-6">
            <span className="text-xs font-bold tracking-widest text-primary px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              আমাদের সাথে যোগাযোগ
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 leading-tight text-gray-900">
            {`চলুন কথা বলি`}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {` আমাদের পণ্য বা সেবাসমূহ নিয়ে কোনো প্রশ্ন থাকলে নির্দ্বিধায় বার্তা দিন। আমরা দ্রুত উত্তর দেওয়ার চেষ্টা করি।`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {[
            {
              icon: FiMail,
              title: "ইমেইল",
              content: companyInfo?.email || "skshobuj9988@gmail.com",
              description: "সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর",
            },
            {
              icon: FiPhone,
              title: "ফোন",
              content: companyInfo?.phone || "(+৮৮) ০১৭৭৪৬১৭৪৫২",
              description: "শনিবার থেকে বৃহস্পতিবার, সকাল ৯টা–সন্ধ্যা ৬টা",
            },
            {
              icon: FiMapPin,
              title: "ঠিকানা",
              content:
                companyInfo?.branchLocation ||
                "স্টেশন রোড, শাপলা চত্তর, রংপুর।",
              description: "শোরুম এবং অফিস",
            },
            {
              icon: FaWhatsapp,
              title: "হোয়াটসঅ্যাপ",
              content: "চ্যাট করুন",
              description: "তাৎক্ষণিক কথোপকথন",
              href: (() => {
                const raw = (companyInfo?.phone || "01774617452").replace(
                  /[^\d]/g,
                  "",
                );
                return `https://wa.me/88${raw}`;
              })(),
            },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <IconComponent size={80} />
                  </div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white bg-black group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20">
                    <IconComponent size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-base font-semibold text-gray-700 mb-2 hover:text-black transition-colors"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-base font-semibold text-gray-700 mb-2">
                      {item.content}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Form */}
          <div className="order-2 lg:order-1 max-w-xl mx-auto w-full">
            <ScrollAnimation>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    পূর্ণ নাম
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                    placeholder="আপনার নাম"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    ইমেইল
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                    placeholder="example@email.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    বিষয়
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                    placeholder="কিসের বিষয়ে?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    যোগাযোগের কারণ
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {contactReasons.map((reason) => {
                      const isSelected = formData.reason === reason.id;
                      return (
                        <div
                          key={reason.id}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              reason: reason.id,
                            }))
                          }
                          className={`
                          relative cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col gap-3 group
                          ${
                            isSelected
                              ? "border-black bg-black text-white shadow-lg scale-[1.02] ring-1 ring-black"
                              : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-md text-gray-600 hover:bg-gray-50"
                          }
                        `}
                        >
                          <div
                            className={`p-2.5 rounded-lg w-fit transition-colors duration-300 ${
                              isSelected
                                ? "bg-white/15 text-white"
                                : "bg-gray-100 text-gray-600 group-hover:bg-white group-hover:shadow-sm"
                            }`}
                          >
                            <reason.icon size={20} />
                          </div>
                          <div>
                            <h4
                              className={`font-semibold text-sm mb-1 transition-colors duration-300 ${
                                isSelected ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {reason.label}
                            </h4>
                            <p
                              className={`text-xs transition-colors duration-300 ${
                                isSelected ? "text-gray-300" : "text-gray-500"
                              }`}
                            >
                              {reason.description}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="absolute top-3 right-3 text-white">
                              <FiCheckCircle size={16} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    বার্তা
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 transition-all duration-200 bg-gray-50/50 focus:bg-white resize-none"
                    placeholder="আরও বিস্তারিত লিখুন..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus.type === "loading"}
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus.type === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      পাঠানো হচ্ছে...
                    </>
                  ) : (
                    <>
                      <FiSend size={18} />
                      বার্তা পাঠান
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {formStatus.type === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-fade-in">
                    <FiCheckCircle
                      size={20}
                      className="text-green-600 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-green-900">
                        বার্তা সফলভাবে পাঠানো হয়েছে! খুব শিগগিরই যোগাযোগ করা
                        হবে।
                      </p>
                    </div>
                  </div>
                )}

                {formStatus.type === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="font-medium text-red-800">
                      কোনো ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।
                    </p>
                  </div>
                )}
              </form>
            </ScrollAnimation>
          </div>

          {/* Info Section */}
          <div className="order-1 lg:order-2 h-full">
            <ScrollAnimation delay={0.2} className="h-full">
              <div className="relative rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden h-full bg-black">
                {/* Decorative background circles */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl font-black mb-8 leading-tight tracking-tight">
                    {`আমরা সবসময় পাশে`}
                  </h2>

                  <div className="space-y-10 mb-12">
                    <div className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                        <FiCheckCircle size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">দ্রুত উত্তর</h3>
                        <p className="text-white/70 leading-relaxed">
                          সাধারণত ২৪ ঘণ্টার মধ্যে অধিকাংশ প্রশ্নের উত্তর দেওয়া
                          হয়
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                        <FiCheckCircle size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          এক্সপার্ট সাপোর্ট
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          বিশেষজ্ঞ টিম সাহায্য করতে সদা প্রস্তুত
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                        <FiCheckCircle size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          বহুমাত্রিক যোগাযোগ
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          ইমেইল, ফোন বা কন্টাক্ট ফর্ম— যেকোনো মাধ্যমে যোগাযোগ
                          করুন
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <p className="text-sm text-white/60 mb-6">
                      শনিবার–বৃহস্পতিবার সকাল ৯টা থেকে সন্ধ্যা ৬টা পর্যন্ত
                      সাপোর্ট খোলা থাকে। জরুরি প্রয়োজনে ফোন করুন।
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <a
                        href={(() => {
                          const raw = (
                            companyInfo?.phone || "01774617452"
                          ).replace(/[^\d]/g, "");
                          return `https://wa.me/88${raw}`;
                        })()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95"
                      >
                        <FaWhatsapp size={20} />
                        <span>চ্যাট করুন</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>

        <div className="mt-16">
          <ScrollAnimation delay={0.3}>
            <div className="rounded-xl overflow-hidden bg-gray-100">
              <div className="relative h-[240px] sm:h-[300px] md:h-[350px]">
                <iframe
                  title="Map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(companyInfo?.branchLocation || "স্টেশন রোড, শাপলা চত্তর, রংপুর")}&output=embed`}
                  className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
