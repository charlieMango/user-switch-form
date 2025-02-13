import ConfirmationModal from '@/components/ConfirmationModal';
import ControlledSlider from '@/components/ControlledSlider';
import Layout from '@/components/Layout ';
import { UNIT_TYPES } from '@/constants/constants';
import { useFormStore, useSubmitForm } from '@/store/formStore';
import { sliderValidationSchema } from '@/utils/validationUtils';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

interface IFormData {
    loanAmount: number;
    loanTerm: number;
}

const FormStep3: FC = () => {
    const navigate = useNavigate();
    const { formData, updateFormData, resetForm, toggleModalOpen, isModalOpen } = useFormStore();
    const [responseData, setResponseData] = useState<{
        fullName: string;
        amount: number;
        term: number;
    } | null>(null);
    const { mutate, isPending: isLoading, error } = useSubmitForm();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>({
        resolver: yupResolver(sliderValidationSchema),
        mode: 'onBlur',
        defaultValues: {
            loanAmount: formData.loanAmount || 200,
            loanTerm: formData.loanTerm || 10,
        },
    });

    const onSubmit = (data: IFormData) => {
        updateFormData(data);
        mutate(formData, {
            onSuccess: () => {
                setResponseData({
                    fullName: `${formData.firstName} ${formData.lastName}`,
                    amount: data.loanAmount,
                    term: data.loanTerm,
                });
                toggleModalOpen(true);
                localStorage.removeItem('formData');
                resetForm();
            },
        });
    };

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    const handleClose = () => {
        toggleModalOpen(false);
        navigate('/');
        localStorage.removeItem('formDataStep1');
        localStorage.removeItem('formDataStep2');
    };

    return (
        <Layout>
            {error && <Typography color="error">{error.message}</Typography>}

            <Typography mb={3} variant="h5" textAlign="center">
                Параметры займа
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <ControlledSlider
                    name="loanAmount"
                    error={errors.loanAmount?.message}
                    control={control}
                    label="Сумма займа"
                    min={200}
                    max={1000}
                    step={100}
                    unit={UNIT_TYPES.CURRENCY}
                />

                <ControlledSlider
                    name="loanTerm"
                    error={errors.loanTerm?.message}
                    control={control}
                    label="Срок займа"
                    min={10}
                    max={30}
                    step={1}
                    unit={UNIT_TYPES.DAYS}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        mt: 2,
                    }}>
                    <Box mr={2}>
                        <Button variant="outlined" onClick={handleBack}>
                            Назад
                        </Button>
                    </Box>
                    <Button type="submit" variant="contained" disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : 'Подать заявку'}
                    </Button>
                </Box>
            </form>

            {responseData && (
                <ConfirmationModal
                    open={isModalOpen}
                    handleClose={handleClose}
                    message={`Поздравляем, ${responseData.fullName}. Вам одобрена ${responseData.amount}${UNIT_TYPES.CURRENCY}  на ${responseData.term} дней.`}
                />
            )}
        </Layout>
    );
};

export default FormStep3;
