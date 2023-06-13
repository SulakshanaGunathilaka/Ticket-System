import React from 'react';
import qaData from './qaData.json';

const FAQPage = () => {
   
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {qaData.map((qa, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold">{qa.question}</h2>
            <p>{qa.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;