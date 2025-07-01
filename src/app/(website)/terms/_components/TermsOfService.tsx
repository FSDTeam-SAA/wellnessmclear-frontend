import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-[#F8FAF9]">
      <div className="container mx-auto py-[88px]">
        <div className="text-center mb-8">
          <h1 className="lg:text-[40px] md:text-[30px] text-[20px] font-bold mb-2">Terms Of Service</h1>
          <p className="text-sm text-gray-600">Effective Date: July 1, 2025</p>
        </div>

        <div className="space-y-6">
          {/* Welcome Section */}
          <section>
            <h2 className="lg:text-[32px] md:text-[28px] text-[24px] font-semibold mb-3">Welcome</h2>
            <p className="text-sm leading-relaxed">
              Welcome to Netmedia! These are our policy statement designed to
              provide clarity and guidance in your health and wellness journey.
              By accessing or using our website, you agree to be bound by, and
              to comply with, the following Terms of Service.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm leading-relaxed mb-2">
              By using this website, you acknowledge that you have website,
              blog, products, coaching services, or community forums, you agree
              to comply with and be bound by these Terms of Service and all
              applicable laws and regulations.
            </p>
            <p className="text-sm leading-relaxed">
              If you do not agree to these terms, please do not use our
              services.
            </p>
          </section>

          {/* Health Disclaimer */}
          <section>
            <h2 className="text-lg font-semibold mb-3">2. Health Disclaimer</h2>
            <p className="text-sm leading-relaxed mb-2">
              Our service health and wellness information and resources for
              general wellness educational and personal growth.
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>• No medical advice: medical provider recommendation</li>
              <li>
                • No diagnosis or treatment: offered by a qualified healthcare
                professional
              </li>
              <li>
                • No substitute for professional or qualified health
                professional guidance
              </li>
            </ul>
          </section>

          {/* Services Offered */}
          <section>
            <h2 className="text-lg font-semibold mb-3">3. Services Offered</h2>
            <p className="text-sm mb-2">
              Our services may include but are not limited to:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>
                • Wellness coaching based on lifestyle, nutrition, and holistic
                health
              </li>
              <li>• Nutrition and educational content</li>
              <li>• Community forums and discussions for members</li>
              <li>• Articles, blog, or wellness tools and products</li>
              <li>• Community discussions forums and group support features</li>
              <li>
                • Personalized wellness recommendations, assessments, or
                diagnostic without notice
              </li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              4. User Responsibilities
            </h2>
            <p className="text-sm mb-2">As a user, you agree to:</p>
            <ul className="text-sm space-y-1 ml-4">
              <li>• Act respectfully</li>
              <li>• Not to misuse, hack, or damage the website or services</li>
              <li>
                • Use the service lawfully, honestly, respectfully, or
                inappropriate content
              </li>
              <li>
                • Not to share your account credentials with others or access
              </li>
              <li>
                • Notify us if the content is incorrect or when wellness
                advising requires licensed professional
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-sm leading-relaxed">
              All content on Netmedia features, including web content, videos,
              and graphics, is protected under copyright and intellectual
              property law. You may not copy, reproduce, or distribute any
              content without written permission.
            </p>
          </section>

          {/* Payments & Refunds */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              6. Payments & Refunds
            </h2>
            <p className="text-sm mb-2">
              If you purchase coaching services, products, or subscriptions:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>• All payments are due at the time of purchase</li>
              <li>
                • We offer refunds on physical products within 15 days of
                receipt if unused and in original packaging
              </li>
              <li>
                • Digital products and subscriptions are non-refundable after
                access is granted
              </li>
            </ul>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-lg font-semibold mb-3">7. Third-Party Links</h2>
            <p className="text-sm leading-relaxed">
              Our site may contain affiliate links or links to third-party
              services. We are not responsible for the content, policies, or
              practices of those external sites.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-lg font-semibold mb-3">8. Termination</h2>
            <p className="text-sm leading-relaxed">
              We can terminate or suspend your access to the site if you violate
              these terms or act in any way that harms the community, brand, or
              other users.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              9. Limitation of Liability
            </h2>
            <p className="text-sm mb-2">
              Netmedia Users Clinic, its team, and affiliates will not be liable
              for:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>
                • Any health issues, injuries, or damages resulting from
                following content on our Site
              </li>
              <li>• Any indirect, incidental, or consequential damages</li>
              <li>• Any errors or omissions in our offerings</li>
            </ul>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-lg font-semibold mb-3">10. Changes to Terms</h2>
            <p className="text-sm leading-relaxed">
              We may update these Terms of Service from time to time. Any
              changes will be posted here with an updated effective date.
              Continued use of the site other changes means your consent to the
              updated terms.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-lg font-semibold mb-3">11. Contact Us</h2>
            <p className="text-sm mb-2">Questions, feedback, or concerns:</p>
            <div className="text-sm space-y-1">
              <p>Email: info@netmedia.com</p>
              <p>
                Mailing Address: 123 Main Street, Anytown, CA 12345, Clinic
                Hills, CA 91765
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
