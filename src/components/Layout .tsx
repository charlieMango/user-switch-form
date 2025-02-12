import React, { FC, ReactNode } from 'react';

import { Box } from '@mui/material';

import AnimatedPage from './AnimatedPage';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
            }}>
            <AnimatedPage>
                <Box
                    sx={{
                        width: 600,
                        p: 3,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}>
                    {children}
                </Box>
            </AnimatedPage>
        </Box>
    );
};

export default Layout;
