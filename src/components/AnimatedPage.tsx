import { motion } from 'framer-motion';

import { FC, ReactNode } from 'react';

interface AnimatedPageProps {
    children: ReactNode;
}

const AnimatedPage: FC<AnimatedPageProps> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}>
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
