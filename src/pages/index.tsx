import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "swiper/css";
import "swiper/css/pagination";
import Footer from "../components/Footer";
import img1 from "../assets/aaa.jpg";
import img2 from "../assets/bbb.jpg";
import img3 from "../assets/ccc.jpg";
import viit from "../assets/viit.jpg";

const Index: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Use navigate to redirect to /home
  const redirectTo = (url: string) => {
    navigate(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      {/* College Header Image */}
      <img
        src={viit}
        alt="College Header"
        className="w-full h-auto object-cover shadow-md mb-4"
      />
      {/* Main Title */}
      <header className="text-center mt-2">
        <h1 className="text-4xl font-bold text-green-700">TRASH TRACKER</h1>
      </header>
      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
          onClick={() => redirectTo("/home")}
        >
          Select Worker
        </button>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          onClick={() => redirectTo("/home")}
        >
          Select Reporter
        </button>
      </div>
      {/* Carousel Section */}
      <div className="mt-10 w-full max-w-3xl text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Glimpses of Cleanliness
        </h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          className="rounded-xl shadow-lg"
        >
          {[img1, img2, img3].map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Clean ${index + 1}`}
                className="w-full h-72 object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-600">
        <p>
          By using this website, you agree to our{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            terms and conditions
          </span>
          .
        </p>
      </footer>
      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
            <p className="text-gray-700">
              By using this Trash Tracker platform, you agree to abide by our
              terms and conditions. We reserve the right to update or modify
              these terms at any time.
            </p>
          </div>
        </div>
      )}
      <Footer />;
    </div>
  );
};

export default Index;
