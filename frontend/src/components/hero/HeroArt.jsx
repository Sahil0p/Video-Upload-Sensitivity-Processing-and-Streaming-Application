// import { motion } from "framer-motion";
// import FloatingCard from "./FloatingCard";

// export default function HeroArt() {
//   return (
//     <div className="relative mt-20 w-full max-w-5xl h-72">
//       {/* Glow blobs */}
//       <div className="blob blue" />
//       <div className="blob purple" />

//       {/* Floating cards */}
//       <motion.div
//         animate={{ y: [0, -12, 0] }}
//         transition={{ repeat: Infinity, duration: 6 }}
//         className="absolute left-10 top-10"
//       >
//         <FloatingCard title="Uploading video.mp4" delay={0.2} />
//       </motion.div>

//       <motion.div
//         animate={{ y: [0, 14, 0] }}
//         transition={{ repeat: Infinity, duration: 7 }}
//         className="absolute right-10 top-24"
//       >
//         <FloatingCard title="Scanning content…" delay={0.4} />
//       </motion.div>

//       <motion.div
//         animate={{ y: [0, -8, 0] }}
//         transition={{ repeat: Infinity, duration: 5 }}
//         className="absolute left-1/2 -translate-x-1/2 bottom-0"
//       >
//         <FloatingCard title="Ready to stream" delay={0.6} />
//       </motion.div>
//     </div>
//   );
// }


import { motion } from "framer-motion";
import FloatingCard from "./FloatingCard";

const float = {
  animate: {
    y: [0, -12, 0],
  },
  transition: {
    repeat: Infinity,
    repeatType: "mirror",
    duration: 6,
    ease: "easeInOut",
  },
};

export default function HeroArt() {
  return (
    <div className="relative mt-20 w-full max-w-6xl mx-auto h-[320px]">
      {/* Glow blobs */}
      <div className="blob blue" />
      <div className="blob purple" />

      {/* Cards Grid */}
      <div className="relative grid grid-cols-3 gap-16 place-items-center h-full">
        {/* Left card */}
        <motion.div {...float} transition={{ ...float.transition, duration: 6 }}>
          <FloatingCard title="Uploading video.mp4" delay={0.2} />
        </motion.div>

        {/* Center card */}
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="self-end"
        >
          <FloatingCard title="Ready to stream" delay={0.6} />
        </motion.div>

        {/* Right card */}
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
          }}
        >
          <FloatingCard title="Scanning content…" delay={0.4} />
        </motion.div>
      </div>
    </div>
  );
}
