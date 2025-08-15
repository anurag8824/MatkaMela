import { motion } from "framer-motion";

export default function Card({ card, isFlipped, onClick }) {
  return (
    <motion.div
      className="w-24 h-32 bg-gray-200 rounded-xl shadow-lg flex items-center justify-center cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="absolute backface-hidden text-2xl font-bold"
        style={{ transform: "rotateY(180deg)" }}
      >
        {card.value}
      </div>
      <div className="absolute front-face w-full h-full bg-blue-500 rounded-xl" />
    </motion.div>
  );
}
