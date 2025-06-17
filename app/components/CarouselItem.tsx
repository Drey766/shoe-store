import React, { useState, useEffect } from 'react'
import './CarouselItem.css'
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import { Parallax } from 'react-parallax';
import type { StaticImageData } from 'next/image';

interface CarouselItemProps {
    id: number | string;
    image: any;
    title: string;
    desc: string;
    position: string;
    color: string;
}

function CarouselItem({id, image, title, desc, position, color}: CarouselItemProps) {
    const [previousImage, setPreviousImage] = useState(image);
    const [uniqueKey, setUniqueKey] = useState(id);

    useEffect(() => {
        if (image !== previousImage) {
            setPreviousImage(image);
            setUniqueKey(prevKey => Number(prevKey) + 1); // Increment the key to force re-render
        }
    }, [image, previousImage]);

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className='carouselItem'>
            <motion.div
                key={`${uniqueKey}-previous`}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1, ease: easeOut }}
                style={{position: 'absolute', width: '100%', height: '100%'}}
            >
                <Parallax className="carouselItem" bgClassName='carouselItem__img' bgImage={previousImage} strength={400}>
                    <div style={{height: '100%'}} />
                </Parallax>
            </motion.div>
            <motion.div
                key={`${uniqueKey}-current`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: easeOut }}
                style={{position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
                <Parallax className="carouselItem" bgClassName='carouselItem__img' bgImage={image} strength={400}>
                    <div className="carouselItemTextContainer" style={{justifyContent: `${position}` }}>
                        <div className="carouselItem__text" style={{color: `${color}`}}>
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    className="carouselItem__title"
                                    key={`${uniqueKey}-title`}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.5, ease: easeOut }}
                                >
                                    {title}
                                </motion.h1>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    className="carouselItem__p"
                                    key={`${uniqueKey}-desc`}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
                                >
                                    {desc}
                                </motion.p>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.button
                                    className='carouselItem__button'
                                    key={`${uniqueKey}-button`}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
                                >
                                    Discover
                                </motion.button>
                            </AnimatePresence>
                        </div>
                    </div>
                </Parallax>
            </motion.div>
            
        </div>
    )
}

export default CarouselItem