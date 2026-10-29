import React from 'react';
import { PricingSection } from '../home/PricingSection';
import { Sparkles, HelpCircle, Check, ShieldCheck, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface PricingPageProps {
  onSelectPlan: (planId: string) => void;
  className?: string;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onSelectPlan, className = '' }) => {
  const faqs = [
    {
      q: 'How does the animated video reveal work?',
      a: 'When your wedding guests open your personalized link, the website plays a high-definition cinematic animation (such as royal palace gates parting or organza silk drapes gliding open) before smoothly freezing into your personalized invitation card.',
    },
    {
      q: 'Can guests RSVP and leave wishes?',
      a: 'Yes! Every tier comes with a built-in RSVP form where guests select their attendance, number of family members, meal preferences, and heartfelt blessings. You can view all submissions in your studio dashboard.',
    },
    {
      q: 'How do I share the invitation with guests?',
      a: 'We provide an instant WhatsApp share button that auto-formats your names, ceremony date, venue, and a direct link. You can also copy your custom link to send via SMS, email, or social media.',
    },
    {
      q: 'Can I customize the music and scratch card message?',
      a: 'Yes, in the Royal and Atelier tiers you can choose your favorite South Asian instrumental piece (shehnai, sitar, flute) and personalize the secret text revealed when guests scratch the rose gold heart card.',
    },
  ];

  return (
    <div className={`w-full py-12 ${className}`}>
      {/* Pricing Cards */}
      <PricingSection onSelectPlan={onSelectPlan} />

      {/* Feature Comparison Matrix */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <h3 className="font-playfair text-2xl font-bold text-[#392922] text-center mb-8">
          Detailed Feature Comparison
        </h3>

        <div className="overflow-x-auto bg-white rounded-3xl border border-[#e8d5c8] shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#ebd8cc] bg-[#faf5ee]">
                <th className="py-4 px-6 font-playfair font-bold text-[#392922]">Feature</th>
                <th className="py-4 px-4 font-playfair font-bold text-[#864e3c] text-center">
                  Classic ($29)
                </th>
                <th className="py-4 px-4 font-playfair font-bold text-[#864e3c] text-center bg-[#f7ede4]">
                  Royal ($49)
                </th>
                <th className="py-4 px-4 font-playfair font-bold text-[#864e3c] text-center">
                  Atelier ($89)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f2e6dc] text-[#553f34]">
              <tr>
                <td className="py-3.5 px-6 font-medium">Cinematic Video Opening</td>
                <td className="py-3.5 px-4 text-center">Included</td>
                <td className="py-3.5 px-4 text-center bg-[#fcf8f3]">Included</td>
                <td className="py-3.5 px-4 text-center">Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">Interactive Scratch-to-Reveal Card</td>
                <td className="py-3.5 px-4 text-center text-[#9c8577]">—</td>
                <td className="py-3.5 px-4 text-center bg-[#fcf8f3]">Included</td>
                <td className="py-3.5 px-4 text-center">Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">South Asian Background Instrumental Music</td>
                <td className="py-3.5 px-4 text-center text-[#9c8577]">—</td>
                <td className="py-3.5 px-4 text-center bg-[#fcf8f3]">Included</td>
                <td className="py-3.5 px-4 text-center">Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">Live Countdown & Program Timeline</td>
                <td className="py-3.5 px-4 text-center">Included</td>
                <td className="py-3.5 px-4 text-center bg-[#fcf8f3]">Included</td>
                <td className="py-3.5 px-4 text-center">Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">Guest RSVP Collection & Wishbook</td>
                <td className="py-3.5 px-4 text-center">Included</td>
                <td className="py-3.5 px-4 text-center bg-[#fcf8f3]">Included</td>
                <td className="py-3.5 px-4 text-center">Included (CSV Export)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">AI Photo-to-Video Animation Studio</td>
                <td className="py-3.5 px-4 text-center text-[#9c8577]">—</td>
                <td className="py-3.5 px-4 text-center bg-[#fcf8f3] text-[#9c8577]">—</td>
                <td className="py-3.5 px-4 text-center font-semibold text-[#864e3c]">
                  Gemini Omni Flash
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">AI Video Understanding & Transcription</td>
                <td className="py-3.5 px-4 text-center text-[#9c8577]">—</td>
                <td className="py-3.5 px-4 text-center bg-[#fcf8f3] text-[#9c8577]">—</td>
                <td className="py-3.5 px-4 text-center font-semibold text-[#864e3c]">
                  Gemini 4 Argon
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">Active Online Hosting</td>
                <td className="py-3.5 px-4 text-center">6 Months</td>
                <td className="py-3.5 px-4 text-center bg-[#fcf8f3]">1 Full Year</td>
                <td className="py-3.5 px-4 text-center">2 Full Years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="text-center mb-10">
          <HelpCircle className="w-8 h-8 text-[#864e3c] mx-auto mb-2" />
          <h3 className="font-playfair text-2xl font-bold text-[#392922]">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-[#ebd8cc] shadow-xs">
              <h4 className="font-playfair text-base font-semibold text-[#864e3c] mb-2">
                {faq.q}
              </h4>
              <p className="font-lora text-xs sm:text-sm text-[#5d473b] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
