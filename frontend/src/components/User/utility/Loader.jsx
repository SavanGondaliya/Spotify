import { motion } from "framer-motion";

const MusicLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <motion.div
            key={index}
            className="w-2 bg-indigo-500 rounded"
            initial={{ height: "20px" }}
            animate={{ height: ["20px", "50px", "20px"] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicLoader;
