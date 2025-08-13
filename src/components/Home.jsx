import React from "react";
import { motion } from "framer-motion";
 import logo from "../assets/logo.png";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";
import {
  FaBullhorn,
  FaInstagram,
  FaLinkedinIn,
  FaRegComments,
  FaRegFileVideo,
  FaUsers,
} from "react-icons/fa";
import { GiBrain } from "react-icons/gi";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  return (
    <>
<h1 className="text-8xl text-center font-semibold text-white mb-2 pb-6">Data<span className="text-8xl font-semibold text-teal-700">Repo</span></h1>

      {/* Section 1 */}
      <section className="bg-black h-auto w-full flex flex-col items-center justify-center text-white font-sans p-2">
        <div className="flex flex-col lg:flex-row gap-4 w-[90%] items-center lg:items-start py-5 mb-10">
          {/* Left big card */}
          <motion.div
            className="flex flex-col sm:flex-row items-center bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg p-4 border border-gray-300 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] h-[350px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.1}
          >
            <div className="bg-gray-700 rounded-2xl p-4 flex items-center justify-center">
              <motion.img
                 src={logo}
                alt="DataRepo Logo"
                className="w-28 sm:w-36 h-auto rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>

            <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left flex flex-col gap-2">
              <p className="text-gray-400 text-sm">Software &amp; IT Company</p>
              <h2 className="text-xl sm:text-2xl font-semibold">DataRepo</h2>
              <p className="text-gray-400 text-sm">
                Innovate with AI, Transform with Data
              </p>
          <span>
              <motion.button
                  className="mt-4 border border-gray-500 p-2 rounded-full hover:bg-gray-800 transition"
                  whileHover={{ scale: 1.2 }}
                >
                  <IoArrowForwardCircleOutline />
                </motion.button>
          </span>
            </div>
             
          </motion.div>

          {/* Right column */}
          <motion.div
            className="gap-6 m-auto w-full sm:w-[80%] md:w-[70%] lg:w-[60%]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.2}
          >
            <div className="relative overflow-hidden w-full border rounded-3xl bg-black text-gray-400 text-2xl p-4 sm:text-sm mb-6">
              <div className="flex whitespace-nowrap animate-marquee">
                <p className="mx-4 shrink-0 ">
                  <span className="font-semibold">Welcome to DataRepo!</span>{" "}
                  Empowering Businesses with Smart SaaS, AI Solutions & Web
                  Development –{" "}
                  <span className="font-semibold">Welcome to DataRepo</span>
                </p>
                <p className="mx-4 shrink-0">
                  <span className="font-semibold">Welcome to DataRepo!</span>{" "}
                  Empowering Businesses with Smart SaaS, AI Solutions & Web
                  Development –{" "}
                  <span className="font-semibold">Welcome to DataRepo</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col  sm:flex-row gap-6 text-center justify-center">
              {/* Founder */}
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg w-full sm:w-[300px] p-4 flex flex-col items-center justify-center border border-gray-300 gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-800 flex items-center justify-center text-xl sm:text-2xl">
                  👤
                </div>
                <p className="text-gray-400 text-xs mt-2">FOUNDER</p>
                <p className="text-white font-semibold">Amrendra Yadav</p>
                <motion.button
                  className="mt-4 border border-gray-500 p-2 rounded-full hover:bg-gray-800 transition"
                  whileHover={{ scale: 1.2 }}
                >
                  <IoArrowForwardCircleOutline />
                </motion.button>
              </motion.div>

              {/* Projects */}
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg w-full sm:w-[300px] p-4 flex flex-col items-center justify-center border border-gray-300 gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-800 flex items-center justify-center text-xl sm:text-2xl">
                  🌐
                </div>
                <p className="text-gray-400 text-xs mt-2">SHOWCASE</p>
                <p className="text-white font-semibold">Projects</p>
                <motion.button
                  className="mt-4 border border-gray-500 p-2 rounded-full hover:bg-gray-800 transition"
                  whileHover={{ scale: 1.2 }}
                >
                  <IoArrowForwardCircleOutline />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2*/}
      <section className="bg-black h-auto flex items-center justify-center p-6">
        <motion.div
          className="flex flex-col lg:flex-row gap-10 w-[85%] max-w-7xl py-5 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
        >
          {/* Cards */}
          {[
            { icon: <FaUsers />, title: "View Now", subtitle: "OUR TEAM" },
            {
              iconGroup: [
                <FaBullhorn />,
                <FaRegFileVideo />,
                <FaRegComments />,
                <GiBrain />,
              ],
              title: "Our Core Services",
              subtitle: "SPECIALIZATION",
              large: true,
            },
            {
              iconGroup: [<FaInstagram />, <FaLinkedinIn />],
              title: "DataRepo",
              subtitle: "Innovating SaaS, AI",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className={`bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 flex flex-col justify-between border border-gray-800 shadow-lg ${
                card.large ? "w-full lg:w-2/4" : "w-full lg:w-1/4"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {card.icon ? (
                  <div className="bg-gray-800 rounded-2xl p-6 text-4xl text-white">
                    {card.icon}
                  </div>
                ) : (
                  card.iconGroup?.map((icon, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800 rounded-full p-4 text-2xl text-white"
                    >
                      {icon}
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-gray-400 text-xs">{card.subtitle}</p>
                  <h3 className="text-white font-bold text-lg">{card.title}</h3>
                </div>
                {card.subtitle && (
                  <motion.button
                    className="border border-gray-600 rounded-full p-2 hover:bg-gray-800 transition"
                    whileHover={{ scale: 1.2 }}
                  >
                    <FiArrowRight className="text-lg text-white" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* section 3 */}
      <section className="bg-black flex items-center justify-center p-6">
        <motion.div
          className="flex flex-col lg:flex-row gap-10 w-[85%] max-w-7xl py-5 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.4}
        >
          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-1/2">
            {[
              { number: "+100", text: "CLIENTS WORLDWIDE" },
              { number: "+150", text: "TOTAL PROJECTS" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-gray-800 shadow-lg w-full"
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-white font-bold text-3xl">{stat.number}</h2>
                <p className="text-gray-400 text-sm mt-2">{stat.text}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 flex items-center justify-between border border-gray-800 shadow-lg w-full lg:w-1/2"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h2 className="text-white text-3xl font-bold">
                Let’s <br />
                work <span className="text-teal-400">together.</span>
              </h2>
            </div>
            <motion.button
              className="border border-gray-600 rounded-full p-3 hover:bg-gray-800 transition"
              whileHover={{ scale: 1.2 }}
            >
              <FiArrowRight className="text-xl text-white" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
