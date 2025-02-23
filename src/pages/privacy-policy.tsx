import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-black">Privacy Policy</h1>
          
          <div className="space-y-4 text-gray-700">
            <p className="italic">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Paint Quote Generator ("we", "us", "our") collects, uses, 
              and protects your information when you use our quote generation service. By using our service, 
              you agree to the collection and use of information in accordance with this policy.
            </p>

            <h2 className="text-xl font-semibold mt-6">2. Information We Collect</h2>
            <h3 className="text-lg font-medium mt-4">2.1 Information You Provide</h3>
            <ul className="list-disc pl-5 mt-2">
              <li>Client name</li>
              <li>Email address</li>
              <li>Room dimensions and specifications</li>
              <li>Project preferences (paint quality, additional services)</li>
            </ul>

            <h3 className="text-lg font-medium mt-4">2.2 Premium Features</h3>
            <ul className="list-disc pl-5 mt-2">
              <li>Account credentials</li>
              <li>Business information</li>
              <li>Saved quotes and settings</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 mt-2">
              <li>To generate accurate paint job quotes</li>
              <li>To save your preferences and settings (premium feature)</li>
              <li>To improve our quote calculation algorithms</li>
              <li>To communicate with you about your quotes</li>
              <li>To process payments (future premium features)</li>
              <li>To provide customer support</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">4. Data Storage and Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information. However, no method of transmission over the Internet or electronic storage 
              is 100% secure.
            </p>

            <h2 className="text-xl font-semibold mt-6">5. Data Sharing and Third Parties</h2>
            <p>We do not sell your personal information. We may share your data with:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Payment processors (for premium features)</li>
              <li>Cloud storage providers</li>
              <li>Email service providers</li>
              <li>Analytics services to improve our product</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">7. Cookies and Tracking</h2>
            <p>
              We use essential cookies to maintain basic functionality. Premium features may use 
              additional cookies to save your preferences and provide a better experience.
            </p>

            <h2 className="text-xl font-semibold mt-6">8. Children's Privacy</h2>
            <p>
              Our service is not directed to children under 13. We do not knowingly collect 
              personal information from children under 13.
            </p>

            <h2 className="text-xl font-semibold mt-6">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "last updated" date.
            </p>

            <h2 className="text-xl font-semibold mt-6">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              [Your Contact Information]
            </p>

            <div className="mt-8 pt-4 border-t">
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ← Back to Quote Generator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}