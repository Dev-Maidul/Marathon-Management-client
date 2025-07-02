import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Sarah B',
    image: 'https://i.ibb.co/q3jvmDVr/111.jpg',
    text: 'Joining a marathon has never been easier! This platform helped me find, register, and prepare for my first run. Everything was smooth and beginner-friendly.'
  },
  {
    id: 2,
    name: 'James L',
    image: 'https://i.ibb.co/FkwtQRdW/1.webp',
    text: 'I love how organized the event listings are. The countdown feature and dashboard make it so easy to track upcoming marathons!'
  },
  {
    id: 3,
    name: 'Emily K',
    image: 'https://i.ibb.co/RGb150v3/Bid1-min.png',
    text: 'This system helped me discover local marathons I never knew existed. The registration process is seamless and the reminders are helpful.'
  },
  {
    id: 4,
    name: 'Michael D.',
    image: 'https://i.ibb.co/5g6fkG2K/8.jpg',
    text: 'As an event organizer, I found the platform intuitive and effective. Managing participants and sharing event details is hassle-free!'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const Testimonial = () => {
  return (
    <section className="my-16 py-10 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-green-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">What Participants Say 🙌</h2>
        <p className="text-gray-500 mt-2">Real stories from real runners</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 px-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            variants={cardVariants}
          >
            <FaQuoteLeft className="text-green-600 text-2xl mb-4" />
            <p className="text-gray-700 text-base leading-relaxed italic mb-4">{testimonial.text}</p>
            <FaQuoteRight className="text-green-600 text-xl mb-4" />
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-green-300 mb-2"
            />
            <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;