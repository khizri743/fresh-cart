import React from 'react';

const Features = () => {
  const features = [
    {
      name: 'Free Shipping',
      description: 'On all orders over $50. No hidden fees.',
      icon: '🚚',
    },
    {
      name: 'Freshness Guaranteed',
      description: 'Money back guarantee if not fresh.',
      icon: '🥬',
    },
    {
      name: '24/7 Support',
      description: 'We are here to help you anytime.',
      icon: '🎧',
    },
    {
      name: 'Secure Payment',
      description: '100% secure payment methods.',
      icon: '🔒',
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
          {features.map((feature) => (
            <div key={feature.name} className="text-center p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;