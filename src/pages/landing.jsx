import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  BarChart3,
  Shield,
  Globe,
  ChevronRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description:
        "Generate short URLs instantly with our optimized infrastructure.",
      color: "text-blue-400",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description:
        "Track clicks, geography, devices, and referral sources in real-time.",
      color: "text-emerald-400",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description:
        "Military-grade encryption and privacy controls for all your links.",
      color: "text-purple-400",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global CDN",
      description:
        "Delivered worldwide with near-zero latency and 99.9% uptime.",
      color: "text-amber-400",
    },
  ];

  const stats = [
    { value: "10M+", label: "Links Shortened", subtext: "and counting" },
    { value: "500K+", label: "Active Users", subtext: "worldwide" },
    { value: "99.9%", label: "Uptime", subtext: "guaranteed" },
    { value: "<100ms", label: "Average Speed", subtext: "redirection time" },
  ];

  const faqs = [
    {
      question: "How does it work?",
      answer:
        "Simply paste your long URL and we generate a unique, short alias. When someone clicks your shortened link, they're instantly redirected to the original destination.",
    },
    {
      question: "Is there a limit on URL length?",
      answer:
        "No limits. We can shorten URLs of any length while maintaining optimal performance and reliability.",
    },
    {
      question: "Are shortened URLs permanent?",
      answer:
        "Yes, all shortened URLs remain active indefinitely unless manually deactivated by you.",
    },
    {
      question: "Can I customize my short links?",
      answer:
        "Premium users can create custom aliases and manage their branded short domains for professional use.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium">
                The Next Generation URL Shortener
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Shorten links,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                amplify results
              </span>
            </h1>

            <p className="mb-10 text-xl text-gray-300">
              Create short URLs, QR codes, and track your links with
              enterprise-grade analytics. Perfect for marketers, developers, and
              content creators.
            </p>

            <form onSubmit={handleShorten} className="mx-auto mb-16 max-w-2xl">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Input
                    type="url"
                    placeholder="Paste your long URL here..."
                    className="h-14 rounded-xl border-gray-700 bg-gray-800/50 text-lg backdrop-blur-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="group h-14 gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-lg font-semibold hover:from-blue-700 hover:to-purple-700"
                >
                  Shorten URL
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Instant activation</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto mb-24 px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all hover:border-gray-700 hover:bg-gray-900"
            >
              <div className="mb-2 text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="font-medium text-gray-200">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto mb-32 px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything you need in one platform
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Advanced features designed to give you complete control over your
            links
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-900/20 p-6 backdrop-blur-sm transition-all hover:border-gray-700 hover:from-gray-900 hover:to-gray-900/50"
            >
              <div
                className={`mb-4 inline-flex rounded-xl bg-gray-800 p-3 ${feature.color}`}
              >
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Section */}
      <div className="container mx-auto mb-32 px-4">
        <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h3 className="text-2xl font-bold md:text-3xl">
                See it in action
              </h3>
              <p className="mt-2 text-gray-400">
                Watch how quickly we transform long URLs into clean, trackable
                links
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
                <div className="text-sm text-gray-400">Original URL</div>
                <div className="truncate text-gray-300">
                  https://www.example.com/very-long-path/to/some-specific-page?with=multiple&query=parameters
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="rounded-full bg-gray-800 p-2">
                  <ArrowRight className="h-6 w-6 text-blue-400" />
                </div>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <div className="text-sm text-blue-400">Shortened URL</div>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-lg font-semibold text-blue-300">
                    short.ly/abc123
                  </div>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto mb-32 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-gray-400">
              Everything you need to know about our URL shortener
            </p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border border-gray-800 bg-gray-900/50 px-6 backdrop-blur-sm"
              >
                <AccordionTrigger className="py-6 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  <span className="text-lg font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden border-t border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10" />
        <div className="container relative mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              Ready to transform your links?
            </h2>
            <p className="mb-10 text-xl text-gray-300">
              Join thousands of professionals who trust our platform for their
              link management needs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={() => navigate("/auth")}
                className="group h-14 gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-10 text-lg font-semibold hover:from-blue-700 hover:to-purple-700"
              >
                Get Started Free
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/auth")}
                className="h-14 rounded-xl border-gray-700 px-10 text-lg font-medium hover:bg-gray-800"
              >
                View Pricing
              </Button>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
