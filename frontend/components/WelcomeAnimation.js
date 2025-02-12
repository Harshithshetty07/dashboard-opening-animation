'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import WaxImg from '../public/images/wax-injection-machine-.png'
import CmtiLogo from '../public/images/cmti-logo.png'
import VideoPage from './VideoPage';

const WelcomeAnimation = () => {
    const [showTitle, setShowTitle] = useState(false);
    const [showWaxImage, setShowWaxImage] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    const titleText = "Wax Injector";
    const letters = titleText.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 1.5,
                staggerChildren: 0.08,
                staggerDirection: -1,
                when: "afterChildren",
                ease: "easeInOut"
            }
        }
    };

    const letterVariants = {
        hidden: { 
            opacity: 0,
            y: 50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8
            }
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: {
                duration: 1.2,
                ease: "easeInOut"
            }
        }
    };

    useEffect(() => {
        const titleTimer = setTimeout(() => {
            setShowTitle(true);
        }, 1000);

        const imageTimer = setTimeout(() => {
            setShowTitle(false);
            setTimeout(() => setShowWaxImage(true), 1500);
        }, 4000);

        const dashboardTimer = setTimeout(() => {
            setShowDashboard(true);
        }, 7000);

        return () => {
            clearTimeout(titleTimer);
            clearTimeout(imageTimer);
            clearTimeout(dashboardTimer);
        };
    }, []);

    if (showDashboard) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-screen"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className=""
                >
                    <VideoPage />
                </motion.div>
            </motion.div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white overflow-hidden">
            <motion.div
                initial={{ y: "0" }}
                animate={{ y: "-100%" }}
                transition={{
                    duration: 7,
                    ease: "easeInOut"
                }}
                className="absolute w-full h-1/2 bg-black"
            />

            <motion.div
                initial={{ y: "0%" }}
                animate={{ y: "100%" }}
                transition={{
                    duration: 8,
                    ease: "easeInOut"
                }}
                className="absolute bottom-0 w-full h-1/2 bg-black"
            />

            <AnimatePresence>
                {showTitle && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full flex justify-center"
                    >
                        <h1 className="text-8xl font-extrabold text-black whitespace-nowrap flex">
                            {letters.map((letter, index) => (
                                <motion.span
                                    key={index}
                                    variants={letterVariants}
                                    className={letter === " " ? "mr-4" : ""}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showWaxImage && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute left-[20%] top-[20%] transform -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                        <motion.div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                            <Image src={WaxImg} alt='Wax Injection Machine' />
                            <Image src={WaxImg} alt='Wax Injection Machine' />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WelcomeAnimation;