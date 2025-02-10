import React, { FC } from 'react';
import './ConfirmationModal.scss';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    fullName: string;
    loanAmount: number;
    loanTerm: number;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ isOpen, onClose, fullName, loanAmount, loanTerm }) => {
    if (!isOpen) return null;

    console.log('fullName', fullName);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Поздравляем, {fullName}!</h2>
                <p className="modal-text">Вам одобрена сумма <strong>{loanAmount}$</strong> на <strong>{loanTerm}</strong> дней.</p>
                <button className="modal-button" onClick={onClose}>ОК</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;