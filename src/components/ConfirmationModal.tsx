import { FC } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface ConfirmationModalProps {
    open: boolean;
    handleClose: () => void;
    message: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ open, handleClose, message }) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Заявка одобрена!</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
