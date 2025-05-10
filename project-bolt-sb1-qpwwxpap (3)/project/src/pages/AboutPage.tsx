// src/pages/AboutPage.tsx
import React from 'react';

const teamMembers = [
  { name: 'Gade Naga Chetan', role: 'Student' },
  { name: 'Dammalapati Mohan Siva Sankar', role: 'Student' },
  { name: 'Gudipalli Hemanth Kumar', role: 'Student' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
            <p className="text-sm text-gray-500 mt-2">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
