import Link from 'next/link';

export default function AffiliateDisclosure() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Affiliate Disclosure</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What Are Affiliate Links?</h2>
              <p className="text-gray-700 mb-4">
                Affiliate links are special links that allow us to earn a small commission when you make a purchase through them. These links help support our website and allow us to continue providing valuable content to our readers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-700 mb-4">
                When you click on an affiliate link on our website and make a purchase, we may receive a small commission from the retailer. This commission comes at no additional cost to you &mdash; the price you pay remains exactly the same.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment to Transparency</h2>
              <p className="text-gray-700 mb-4">
                We believe in complete transparency with our readers. That&apos;s why we:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Clearly mark affiliate links throughout our content</li>
                <li>Only recommend products and services we genuinely believe in</li>
                <li>Provide honest, unbiased reviews and recommendations</li>
                <li>Disclose our affiliate relationships as required by law</li>
                <li>Never let affiliate relationships influence our editorial content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amazon Associates Program</h2>
              <p className="text-gray-700 mb-4">
                We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Affiliate Programs</h2>
              <p className="text-gray-700 mb-4">
                In addition to Amazon, we may participate in other affiliate programs from time to time. We will always disclose these relationships clearly in our content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Privacy</h2>
              <p className="text-gray-700 mb-4">
                When you click on affiliate links, the retailer may place cookies on your device to track the referral. This is standard practice and helps ensure we receive credit for the referral. You can learn more about this in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions About Affiliate Links?</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our affiliate relationships or how affiliate links work, please don&apos;t hesitate to contact us. We&apos;re committed to being completely transparent about our business practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about our affiliate disclosure or business practices, please contact us at:
              </p>
              <p className="text-gray-700">
                Email: affiliate@example.com<br />
                Address: [Your Business Address]
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 