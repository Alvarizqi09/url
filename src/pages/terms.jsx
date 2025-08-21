import React from "react";
import { Link } from "react-router-dom";
import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <FileText className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-gray-300">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg mb-8">
        <p className="text-gray-300 mb-6">
          Welcome to APShort. By using our URL shortening service, you agree to
          the following terms and conditions. Please read them carefully.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Acceptable Use
          </h2>
          <p className="text-gray-300 mb-4">
            You agree not to use APShort for any unlawful purpose or in any way
            that might harm, damage, or disparage any other party. Without
            limiting the foregoing, you agree not to use our service:
          </p>
          <ul className="list-disc list-inside text-gray-300 ml-4">
            <li className="mb-2">For any illegal or fraudulent purpose</li>
            <li className="mb-2">To send spam or unsolicited messages</li>
            <li className="mb-2">
              To distribute malware, viruses, or other harmful code
            </li>
            <li className="mb-2">
              To phish or collect sensitive information illegally
            </li>
            <li>To promote violence, hate speech, or discrimination</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Intellectual Property
          </h2>
          <p className="text-gray-300">
            APShort and its original content, features, and functionality are
            owned by APShort and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property
            laws.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Termination
          </h2>
          <p className="text-gray-300">
            We may terminate or suspend your account and access to our service
            immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach the Terms.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Limitation of Liability
          </h2>
          <p className="text-gray-300">
            In no event shall APShort, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or
            inability to access or use the service.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Changes to Terms
          </h2>
          <p className="text-gray-300">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. By continuing to access or use our service
            after those revisions become effective, you agree to be bound by the
            revised terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions about these Terms, please contact us at
            terms@apshort.com.
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

export default TermsOfService;
