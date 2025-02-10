// 27. Оптимизированная версия FormStep3.tsx с обновленной ConfirmationModal и хранением состояния в сторе (Zustand)
import React, { useCallback, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormStep3.scss';
import { useFormStore } from '../store/formStore';
import ConfirmationModal from './ConfirmationModal';

interface FormData {
    loanAmount: number;
    loanTerm: number;
}

const validationSchema = yup.object({
    loanAmount: yup.number().min(200).max(1000).required('Сумма займа обязательна'),
    loanTerm: yup.number().min(10).max(30).required('Срок займа обязателен'),
});

const FormStep3: FC = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useFormStore();

    const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        defaultValues: {
            loanAmount: formData.loanAmount || 200,
            loanTerm: formData.loanTerm || 10,
        },
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [approvedAmount, setApprovedAmount] = useState(0);
    const [approvedTerm, setApprovedTerm] = useState(0);

    const loanAmount = watch('loanAmount');
    const loanTerm = watch('loanTerm');

    const onSubmit = useCallback((data: FormData) => {
        updateFormData(data);
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: `Займ на сумму ${data.loanAmount}$ сроком на ${data.loanTerm} дней` })
        })
            .then((response) => response.json())
            .then((result) => {
                setApprovedAmount(result.loanAmount || data.loanAmount);
                setApprovedTerm(result.loanTerm || data.loanTerm);
                setIsModalOpen(true);
            })
            .catch((error) => console.error('Ошибка отправки:', error));
    }, [updateFormData]);

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <h2 className="form-title">Параметры займа</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="loanAmount">Сумма займа: {loanAmount}$</label>
                        <Controller
                            name="loanAmount"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="range"
                                    min="200"
                                    max="1000"
                                    step="100"
                                    className="form-control"
                                    {...field}
                                />
                            )}
                        />
                        <div className="error-message">{errors.loanAmount?.message}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="loanTerm">Срок займа: {loanTerm} дней</label>
                        <Controller
                            name="loanTerm"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="range"
                                    min="10"
                                    max="30"
                                    step="1"
                                    className="form-control"
                                    {...field}
                                />
                            )}
                        />
                        <div className="error-message">{errors.loanTerm?.message}</div>
                    </div>

                    <div className="button-group">
                        <button type="button" className="back-button" onClick={() => navigate('/step2')}>Назад</button>
                        <button type="submit" className="submit-button">Подать заявку</button>
                    </div>
                </form>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => navigate('/')}
                fullName={`${formData.lastName} ${formData.firstName}`}
                loanAmount={approvedAmount}
                loanTerm={approvedTerm}
            />
        </div>
    );
};

export default FormStep3;
