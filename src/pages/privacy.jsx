import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, Database } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-300">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg mb-8">
        <p className="text-gray-300 mb-6">
          At APShort, we take your privacy seriously. This Privacy Policy
          describes how we collect, use, and share your personal information
          when you use our URL shortening service.
        </p>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Lock className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl font-semibold text-white">
              Information We Collect
            </h2>
          </div>
          <p className="text-gray-300 mb-4">
            When you use APShort, we may collect the following information:
          </p>
          <ul className="list-disc list-inside text-gray-300 ml-4">
            <li className="mb-2">URLs that you shorten through our service</li>
            <li className="mb-2">
              IP address and browser information for analytics
            </li>
            <li className="mb-2">
              If you create an account: email address, name, and profile
              information
            </li>
            <li>Click data and geographic information for shortened URLs</li>
          </ul>
        </div>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Eye className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl font-semibold text-white">
              How We Use Your Information
            </h2>
          </div>
          <p className="text-gray-300 mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-300 ml-4">
            <li className="mb-2">
              To provide and maintain our URL shortening service
            </li>
            <li className="mb-2">To generate analytics about link usage</li>
            <li className="mb-2">
              To prevent abuse and malicious use of our service
            </li>
            <li className="mb-2">
              To communicate with you about your account or our services
            </li>
            <li>To improve our service and develop new features</li>
          </ul>
        </div>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl font-semibold text-white">
              Data Retention
            </h2>
          </div>
          <p className="text-gray-300">
            We retain your personal information only for as long as necessary to
            provide you with our services and for legitimate business purposes.
            Analytics data is anonymized after 12 months.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Your Rights
          </h2>
          <p className="text-gray-300 mb-4">
            You have the right to access, correct, or delete your personal
            information. You can also object to our processing of your personal
            information in certain circumstances.
          </p>
          <p className="text-gray-300">
            If you have any questions about this Privacy Policy, please contact
            us at privacy@apshort.com.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link to="/">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
