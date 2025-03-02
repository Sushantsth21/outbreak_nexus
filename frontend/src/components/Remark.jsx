import React from 'react';

const Remark = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Main Section */}
      <section className="mt-7 text-center px-4 sm:px-12">
        <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
          Outbreak Maps is your go-to platform for monitoring disease outbreaks. Whether you're tracking them over the last month or the past year, you’ll find all the details you need right here. The interactive maps provide an intuitive way to understand disease spread and empower users, from individuals to government officials, with the right information to act swiftly and responsibly.
        </p>

        <h3 className="text-2xl font-semibold text-gray-700 mb-4">What’s Inside?</h3>

        <div className="space-y-6 max-w-4xl mx-auto text-left text-lg text-gray-700">
          <div>
            <strong>Outbreak Maps:</strong>
            <ul className="list-disc pl-6">
              <li><strong>Look Back in Time:</strong> Access outbreak maps from the past month or the last year, as you prefer.</li>
              <li><strong>Zoom In Local:</strong> Want to know what's happening near you? Explore outbreaks by specific regions or countries.</li>
            </ul>
          </div>

          <div>
            <strong>All About Diseases:</strong>
            <ul className="list-disc pl-6">
              <li><strong>The Full Scoop:</strong> Detailed information on symptoms, causes, diagnoses, treatments, and tips for prevention.</li>
              <li><strong>Behind the Scenes:</strong> Get to know the pathogens causing the diseases—types, names, and how they spread.</li>
            </ul>
          </div>

          <div>
            <strong>For Everyday Users:</strong>
            <ul className="list-disc pl-6">
              <li><strong>Simple and Clear:</strong> We provide clear, easy-to-understand information about each disease and its prevention.</li>
              <li><strong>Explore Away:</strong> Dive into interactive maps and detailed disease data to stay informed.</li>
            </ul>
          </div>

          <div>
            <strong>For Government Users:</strong>
            <ul className="list-disc pl-6">
              <li><strong>Game Plans:</strong> Ready-to-use control strategies for governments to manage and mitigate outbreaks.</li>
              <li><strong>Smart Insights:</strong> Access comprehensive data trends to aid decision-making at the national and global levels.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Remark;
