import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 15,
        scale: 0.99,
        filter: 'blur(4px)'
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1], // Custom premium ease-out curve
            staggerChildren: 0.1
        },
    },
    exit: {
        opacity: 0,
        y: -15,
        filter: 'blur(4px)',
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1],
        },
    },
};

export default function PageTransition({ children }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    );
}
