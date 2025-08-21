import React from "react";
import { Link } from "react-router-dom";
import { Target, Globe, Heart, Code, Palette, Cpu } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">About APShort</h1>
        <p className="text-gray-300 text-lg">
          The URL shortener built for professionals
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Story</h2>
          <p className="text-gray-300 mb-4">
            APShort was founded in 2023 with a simple mission: to create the
            most reliable, secure, and user-friendly URL shortening service on
            the market.
          </p>
          <p className="text-gray-300">
            Our team of developers and digital marketers saw a need for a URL
            shortener that didn't compromise on features while maintaining
            simplicity and elegance.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/lo-white.png"
            alt="About APShort"
            className="max-w-xs md:max-w-sm"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <Target className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
          <p className="text-gray-300">
            To simplify link sharing while providing powerful analytics for
            businesses and individuals.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <Globe className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Our Vision</h3>
          <p className="text-gray-300">
            To become the most trusted URL management platform worldwide.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Our Values</h3>
          <p className="text-gray-300">
            Privacy, simplicity, and innovation drive everything we do.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Meet Our Website Maker
        </h2>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-red-500 rounded-full mb-6 overflow-hidden border-4 border-red-400">
            <img
              src="/saya.jpg"
              alt="Website Maker"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Alvarizqi</h3>
          <p className="text-red-400 mb-4">Front end web Developer</p>
          <p className="text-gray-300 text-center max-w-md">
            Passionate developer with expertise in creating modern web
            applications using React, Next.js, and various cutting-edge
            technologies.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center text-gray-300">
              <Code className="h-5 w-5 text-red-500 mr-2" />
              <span>Web Development</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Palette className="h-5 w-5 text-red-500 mr-2" />
              <span>UI/UX Design</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Cpu className="h-5 w-5 text-red-500 mr-2" />
              <span>Problem Solving</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to="/">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
