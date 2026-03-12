import React, { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

// Color palette
const colors = {
  cream: "#eefabd",
  green: "#a0d585",
  blue: "#6984a9",
  darkBlue: "#263b6a",
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-7" : "bg-white shadow-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/Logo/logop1nobog.png"
              alt="Egg Management Logo"
              className="w-10 h-10"
            />
            <span
              className="text-2xl font-bold"
              style={{ color: colors.darkBlue }}
            >
              EggFlow
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {["Features", "How It Works", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="font-medium hover:opacity-70 transition-opacity"
                style={{ color: colors.darkBlue }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-3">
            <button
              className="cursor-pointer px-4 py-2 rounded-lg font-medium transition-all hover:opacity-70"
              style={{ color: colors.darkBlue }}
              onClick={() => navigate("/auth")}
            >
              Log In
            </button>
            <button
              className="cursor-pointer px-4 py-2 rounded-lg text-white font-medium transition-all hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: colors.green }}
              onClick={() => navigate("/auth")}
            >
              Start Free Trial
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: colors.darkBlue }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {["Features", "How It Works", "Pricing", "About"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="py-2 font-medium"
                  style={{ color: colors.darkBlue }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <hr className="border-gray-200" />
              <button
                className="py-2 font-medium text-left"
                style={{ color: colors.darkBlue }}
                onClick={() => navigate("/auth")}
              >
                Log In
              </button>
              <button
                className="py-2 px-4 rounded-lg text-white font-medium text-center"
                style={{ backgroundColor: colors.green }}
                onClick={() => navigate("/auth")}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full animate-float"
          style={{ backgroundColor: colors.green }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full animate-float-delayed"
          style={{ backgroundColor: colors.blue }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full animate-float-slow"
          style={{ backgroundColor: colors.cream }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1
              className="text-3xl md:text-5xl lg:text-5xl font-bold mb-6 animate-slideUp"
              style={{ color: colors.darkBlue }}
            >
              Manage Your Egg Farm
              <br />
              <span
                className="animate-slideUp delay-200 inline-block"
                style={{ color: colors.green }}
              >
                From Collection to Sale
              </span>
            </h1>

            <p
              className="text-base md:text-lg mb-8 animate-fadeIn delay-400"
              style={{ color: colors.blue }}
            >
              Track inventory across 6 egg sizes, manage customer orders, and
              get real-time financial insights — all in one place.
            </p>

            <div className="cursor-pointer flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeIn delay-600">
              <button
                className="px-12 py-3 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: colors.green }}
              >
                Start Now!
              </button>
              <button
                className="hidden cursor-pointer lg:flex px-12 py-3 rounded-lg font-semibold text-lg transition-all hover:shadow-xl border-2"
                style={{ borderColor: colors.green, color: colors.darkBlue }}
              >
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mt-9 animate-fadeIn delay-800">
              {[
                { value: "1,000+", label: "Eggs Tracked Daily" },
                { value: "98%", label: "Customer Satisfaction" },
                { value: "50+", label: "Active Farms" },
                { value: "40%", label: "Time Saved" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div
                    className="text-2xl md:text-3xl font-bold counter"
                    style={{ color: colors.green }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: colors.blue }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex relative animate-fadeIn delay-400">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <img src="/Logo/wes.png" alt="Dashboard Preview" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div
          className="w-6 h-10 border-2 rounded-full"
          style={{ borderColor: colors.darkBlue }}
        >
          <div
            className="w-1 h-3 mx-auto mt-2 rounded-full animate-scroll"
            style={{ backgroundColor: colors.darkBlue }}
          />
        </div>
      </div>
    </section>
  );
};

// Egg Sizes Showcase
const EggSizesSection = () => {
  const eggSizes = [
    { size: "XS", pieces: 5, halfTray: 70, fullTray: 140, color: colors.blue },
    {
      size: "Small",
      pieces: 6,
      halfTray: 85,
      fullTray: 170,
      color: colors.green,
    },
    {
      size: "Medium",
      pieces: 7,
      halfTray: 95,
      fullTray: 190,
      color: colors.blue,
    },
    {
      size: "Large",
      pieces: 8,
      halfTray: 120,
      fullTray: 240,
      color: colors.darkBlue,
    },
    {
      size: "XL",
      pieces: 9,
      halfTray: 125,
      fullTray: 250,
      color: colors.green,
    },
    {
      size: "Jumbo",
      pieces: 10,
      halfTray: 140,
      fullTray: 280,
      color: colors.blue,
    },
  ];

  return (
    <section
      id="features"
      className="py-20 px-4"
      style={{ backgroundColor: colors.cream }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colors.darkBlue }}
          >
            Track All Egg Sizes
          </h2>
          <p className="text-lg" style={{ color: colors.blue }}>
            From XS to Jumbo, with flexible pricing for pieces, half trays (15
            eggs), and full trays (30 eggs)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eggSizes.map((egg, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-2" style={{ backgroundColor: egg.color }} />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: colors.darkBlue }}
                  >
                    {egg.size}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span style={{ color: colors.blue }}>Per Piece:</span>
                    <span
                      className="font-semibold"
                      style={{ color: colors.green }}
                    >
                      ₱{egg.pieces}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: colors.blue }}>Half Tray (15):</span>
                    <span
                      className="font-semibold"
                      style={{ color: colors.green }}
                    >
                      ₱{egg.halfTray}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: colors.blue }}>Full Tray (30):</span>
                    <span
                      className="font-semibold"
                      style={{ color: colors.green }}
                    >
                      ₱{egg.fullTray}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Grid
const FeaturesSection = () => {
  const features = [
    {
      title: "Inventory Management",
      desc: "Real-time tracking of egg stock across all sizes. Automatic updates when eggs are collected or sold.",
    },
    {
      title: "Smart Pricing",
      desc: "Automatic price calculation for pieces, half trays, and full trays based on your configured rates.",
    },
    {
      title: "Customer Management",
      desc: "Track customer history, repeat buyers, and order patterns. Build lasting relationships.",
    },
    {
      title: "Financial Analytics",
      desc: "Daily, weekly, and monthly reports on revenue, expenses, and profit. Make data-driven decisions.",
    },
    {
      title: "Expense Tracking",
      desc: "Record feed, labor, electricity, and transportation costs. See your true profit margins.",
    },
    {
      title: "Mobile Ready",
      desc: "Access your farm data anywhere. Record collections and sales right from your phone.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colors.darkBlue }}
          >
            Everything You Need to Run Your Egg Business
          </h2>
          <p className="text-lg" style={{ color: colors.blue }}>
            From daily collection to monthly profits — we've got you covered
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border-2 hover:shadow-lg transition-all hover:-translate-y-1 duration-300 animate-slideUp"
              style={{
                borderColor: colors.cream,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="text-4xl mb-4 animate-bounce-small">
                {feature.icon}
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: colors.darkBlue }}
              >
                {feature.title}
              </h3>
              <p style={{ color: colors.blue }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works
const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Record Daily Collection",
      desc: "Staff enter number of eggs collected for each size. Inventory updates automatically.",
      icon: "🥚",
    },
    {
      step: "02",
      title: "Process Customer Orders",
      desc: "Select customer, egg type, and quantity. System calculates total price instantly.",
      icon: "📝",
    },
    {
      step: "03",
      title: "Track Expenses",
      desc: "Log feed, labor, and operational costs. Know your exact expenses.",
      icon: "💰",
    },
    {
      step: "04",
      title: "View Profit Reports",
      desc: "Get real-time insights on revenue, expenses, and profit margins.",
      icon: "📈",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 px-4"
      style={{ backgroundColor: colors.cream }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colors.darkBlue }}
          >
            How It Works
          </h2>
          <p className="text-lg" style={{ color: colors.blue }}>
            Four simple steps to transform your egg business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div
                className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl 
                            transition-all group-hover:scale-110 group-hover:rotate-12 duration-300"
                style={{ backgroundColor: colors.green, color: "white" }}
              >
                {step.icon}
              </div>
              <div
                className="text-sm font-bold mb-2"
                style={{ color: colors.darkBlue }}
              >
                {step.step}
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: colors.darkBlue }}
              >
                {step.title}
              </h3>
              <p className="text-sm" style={{ color: colors.blue }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Santos",
      farm: "Sunrise Egg Farm",
      text: "Cut our paperwork time by 80%. Now we focus on growing our business instead of managing spreadsheets.",
    },
    {
      name: "John Reyes",
      farm: "Green Valley Poultry",
      text: "The automatic price calculation for different tray sizes saved us from so many pricing errors.",
    },
    {
      name: "Elena Cruz",
      farm: "Happy Hens Farm",
      text: "Finally know our true profit margins. The expense tracking feature is a game-changer.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colors.darkBlue }}
          >
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border-2 animate-fadeIn hover:shadow-xl transition-all"
              style={{
                borderColor: colors.cream,
                animationDelay: `${index * 200}ms`,
              }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">👤</span>
                <div>
                  <div className="font-bold" style={{ color: colors.darkBlue }}>
                    {testimonial.name}
                  </div>
                  <div className="text-xs" style={{ color: colors.blue }}>
                    {testimonial.farm}
                  </div>
                </div>
              </div>
              <p className="text-sm italic" style={{ color: colors.blue }}>
                "{testimonial.text}"
              </p>
              <div className="mt-3 flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="py-20 px-4"
      style={{ backgroundColor: colors.cream }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colors.darkBlue }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg" style={{ color: colors.blue }}>
            Start with a 14-day free trial. No credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Starter",
              price: "0",
              features: ["Up to 500 eggs/day", "Basic inventory", "1 user"],
              popular: false,
            },
            {
              name: "Professional",
              price: "29",
              features: [
                "Up to 5000 eggs/day",
                "Full analytics",
                "3 users",
                "Expense tracking",
              ],
              popular: true,
            },
            {
              name: "Enterprise",
              price: "99",
              features: [
                "Unlimited eggs",
                "Advanced reporting",
                "Unlimited users",
                "API access",
              ],
              popular: false,
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 border-2 transition-all hover:-translate-y-2 duration-300 animate-fadeIn ${
                plan.popular ? "shadow-xl scale-105" : ""
              }`}
              style={{
                borderColor: plan.popular ? colors.green : colors.cream,
                backgroundColor: "white",
                animationDelay: `${index * 200}ms`,
              }}
            >
              {plan.popular && (
                <span
                  className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-4"
                  style={{ backgroundColor: colors.green, color: "white" }}
                >
                  MOST POPULAR
                </span>
              )}
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: colors.darkBlue }}
              >
                {plan.name}
              </h3>
              <div className="mb-4">
                <span
                  className="text-3xl font-bold"
                  style={{ color: colors.green }}
                >
                  ₱{plan.price}
                </span>
                <span className="text-sm" style={{ color: colors.blue }}>
                  /month
                </span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span style={{ color: colors.green }}>✓</span>
                    <span className="text-sm" style={{ color: colors.blue }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-lg font-semibold transition-all hover:shadow-lg ${
                  plan.popular ? "text-white" : "border-2"
                }`}
                style={{
                  backgroundColor: plan.popular ? colors.green : "transparent",
                  borderColor: colors.green,
                  color: plan.popular ? "white" : colors.darkBlue,
                }}
              >
                Start Trial
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section
      className="py-20 px-4 text-center"
      style={{ backgroundColor: colors.darkBlue }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white animate-fadeIn">
          Ready to Transform Your Egg Business?
        </h2>

        <p
          className="text-lg mb-8 animate-fadeIn delay-200"
          style={{ color: colors.cream }}
        >
          Join hundreds of egg farmers already using EggFlow to manage their
          farms.
        </p>

        <button
          className="px-8 py-4 rounded-lg text-lg font-bold transition-all hover:shadow-xl hover:scale-105 animate-fadeIn delay-400"
          style={{ backgroundColor: colors.green, color: colors.darkBlue }}
        >
          Start Your 14-Day Free Trial
        </button>

        <p
          className="mt-4 text-sm animate-fadeIn delay-600"
          style={{ color: colors.cream, opacity: 0.6 }}
        >
          No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-8 px-4" style={{ backgroundColor: colors.darkBlue }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4" style={{ color: colors.cream }}>
              Product
            </h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "FAQ", "Demo"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm hover:underline"
                    style={{ color: colors.cream, opacity: 0.8 }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4" style={{ color: colors.cream }}>
              Company
            </h4>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm hover:underline"
                    style={{ color: colors.cream, opacity: 0.8 }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4" style={{ color: colors.cream }}>
              Resources
            </h4>
            <ul className="space-y-2">
              {["Documentation", "Support", "API", "Status"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm hover:underline"
                    style={{ color: colors.cream, opacity: 0.8 }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4" style={{ color: colors.cream }}>
              Legal
            </h4>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm hover:underline"
                    style={{ color: colors.cream, opacity: 0.8 }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="border-gray-600 mb-8" />
        <div
          className="text-center text-sm"
          style={{ color: colors.cream, opacity: 0.6 }}
        >
          <p>
            © 2024 EggFlow. All rights reserved. Made for egg farmers, by egg
            farmers.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <EggSizesSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
