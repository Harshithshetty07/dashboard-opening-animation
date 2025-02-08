'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import WaxImg from '../public/images/wax-injection-machine-.png'

const WelcomeAnimation = () => {
    const [showTitle, setShowTitle] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    useEffect(() => {
        // Start title animation after divs meet
        const titleTimer = setTimeout(() => {
            setShowTitle(true);
        }, 1000);

        // Show dashboard after all animations
        const dashboardTimer = setTimeout(() => {
            setShowDashboard(true);
        }, 3000);

        return () => {
            clearTimeout(titleTimer);
            clearTimeout(dashboardTimer);
        };
    }, []);

    if (showDashboard) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gray-100 p-8"
            >
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-bold text-gray-800"
                >
                    Welcome to Dashboard
                </motion.h1>
            </motion.div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white overflow-hidden">
            {/* Top div animating down */}
            <motion.div
                initial={{ y: "0" }}
                animate={{ y: "-100%" }}
                transition={{
                    duration: 2.5,
                    ease: "easeInOut"
                }}
                className="absolute w-full h-1/2 bg-black"
            />

            {/* Bottom div animating up */}
            <motion.div
                initial={{ y: "0%" }}
                animate={{ y: "100%" }}
                transition={{
                    duration: 3,
                    ease: "easeInOut"
                }}
                className="absolute bottom-0 w-full h-1/2 bg-black"
            />

            {/* Wax Injector text */}
            <AnimatePresence>
                {showTitle && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute left-[30%] top-[40%] transform -translate-x-1/2 -translate-y-1/2"
                    >
                        <h1 className="text-8xl font-extrabold text-black whitespace-nowrap">
                            Wax Injector
                        </h1>
                        {/* <motion.div>
                            <Image src={WaxImg} alt='' />
                        </motion.div> */}
                    </motion.div>

                )}
            </AnimatePresence>
        </div>
    );
};

export default WelcomeAnimation;