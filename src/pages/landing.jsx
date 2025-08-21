import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, BarChart3, Shield, Globe } from "lucide-react";

const LandingPage = () => {
  const [LongUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (LongUrl) navigate(`/auth?createNew=${LongUrl}`);
  };

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-blue-500" />,
      title: "Lightning Fast",
      description: "Generate short URLs instantly with our optimized platform.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-green-500" />,
      title: "Detailed Analytics",
      description:
        "Track clicks, locations, and devices with comprehensive statistics.",
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-500" />,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security ensures your links are always protected.",
    },
    {
      icon: <Globe className="h-10 w-10 text-orange-500" />,
      title: "Global Access",
      description:
        "Your shortened links work anywhere in the world with low latency.",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl mb-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="my-6 text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight">
            The only URL Shortener <br /> you'll ever need
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-blue-100 mb-8">
            Create short URLs, QR codes, and track your links with powerful
            analytics. Perfect for marketers, developers, and content creators.
          </p>

          <form
            onSubmit={handleShorten}
            className="mx-auto max-w-2xl flex flex-col sm:flex-row gap-4 justify-center items-stretch"
          >
            <Input
              type="url"
              placeholder="Paste your long URL here"
              className="flex-1 py-6 px-5 text-lg rounded-full border-0 shadow-lg"
              value={LongUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
            <Button
              className="py-6 px-8 text-lg rounded-full font-bold shadow-lg transition-all hover:scale-105"
              type="submit"
              variant="destructive"
            >
              Shorten URL
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </section>

      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">10M+</p>
            <p className="text-gray-600 dark:text-gray-300">Links Generated</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">500K+</p>
            <p className="text-gray-600 dark:text-gray-300">Active Users</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">99.9%</p>
            <p className="text-gray-600 dark:text-gray-300">Uptime</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">24/7</p>
            <p className="text-gray-600 dark:text-gray-300">Support</p>
          </div>
        </div>
      </div>

      <section className="w-full mb-16">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose Our URL Shortener?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full mb-16 overflow-hidden shadow-xl">
        <img
          src="/banner_web.png"
          alt="Landing"
          className="w-full rounded-4xl my-11 md:px-11"
        />
      </div>

      <section className="w-full max-w-3xl mb-16">
        <h3 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h3>
        <Accordion
          type="multiple"
          collapsible
          className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
        >
          <AccordionItem value="item-1" className="border-b py-2">
            <AccordionTrigger className="text-lg text-gray-800 font-medium hover:no-underline">
              How it works?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              Our URL shortener works by taking your long URL and generating a
              unique, shortened version that redirects to the original URL.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b py-2">
            <AccordionTrigger className="text-lg text-gray-800 font-medium hover:no-underline">
              Why use a URL shortener?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              URL shorteners make links easier to share, especially on social
              media, and can help track link performance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="py-2">
            <AccordionTrigger className="text-lg text-gray-800 font-medium hover:no-underline">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              Our URL shortener is designed with accessibility in mind, ensuring
              that all users can easily interact with it.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-10 text-center mb-16">
        <h3 className="text-3xl font-bold text-white mb-4">
          Ready to get started?
        </h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied users who are already shortening their
          URLs and tracking their performance.
        </p>
        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-full"
          onClick={() => navigate("/auth")}
        >
          Get Started For Free
        </Button>
      </section>
    </div>
  );
};

export default LandingPage;
