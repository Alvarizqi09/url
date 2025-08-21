import React from "react";
import { Link } from "react-router-dom";
import { Cookie, Settings, Shield } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <Cookie className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
        <p className="text-gray-300">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg mb-8">
        <p className="text-gray-300 mb-6">
          This Cookie Policy explains how APShort uses cookies and similar
          technologies to recognize you when you visit our website. It explains
          what these technologies are and why we use them, as well as your
          rights to control our use of them.
        </p>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Cookie className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl font-semibold text-white">
              What Are Cookies?
            </h2>
          </div>
          <p className="text-gray-300">
            Cookies are small data files that are placed on your computer or
            mobile device when you visit a website. Cookies are widely used by
            website owners to make their websites work, or to work more
            efficiently, as well as to provide reporting information.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Settings className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl font-semibold text-white">
              How We Use Cookies
            </h2>
          </div>
          <p className="text-gray-300 mb-4">
            We use cookies for several reasons. Some cookies are required for
            technical reasons in order for our website to operate, and we refer
            to these as "essential" or "strictly necessary" cookies.
          </p>
          <p className="text-gray-300">
            We also use cookies to track and target the interests of our users
            to enhance the experience on our website and for analytics purposes.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl font-semibold text-white">
              Types of Cookies We Use
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-white">
                    Cookie Type
                  </th>
                  <th className="px-4 py-2 text-left text-white">Purpose</th>
                  <th className="px-4 py-2 text-left text-white">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 text-white">
                    Essential Cookies
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    Necessary for the website to function properly
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    Session
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 text-white">
                    Analytics Cookies
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    Collect information about how visitors use our website
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    2 years
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 text-white">
                    Preference Cookies
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    Remember your preferences and settings
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    1 year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Managing Cookies
          </h2>
          <p className="text-gray-300 mb-4">
            Most web browsers allow you to control cookies through their
            settings preferences. However, if you limit the ability of websites
            to set cookies, you may worsen your overall user experience, as it
            will no longer be personalized to you.
          </p>
          <p className="text-gray-300">
            You can typically find the controls for cookies in the "Options" or
            "Preferences" menu of your browser.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Updates to This Policy
          </h2>
          <p className="text-gray-300">
            We may update this Cookie Policy from time to time to reflect
            changes in technology, legislation, or our data use policies. Any
            changes will be posted on this page with an updated revision date.
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

export default CookiePolicy;
