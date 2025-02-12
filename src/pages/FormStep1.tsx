import Layout from '@/components/Layout ';
import { useFormStore } from '@/store/formStore';
import { userValidationSchema } from '@/utils/validationUtils';

import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { InputMask } from '@react-input/mask';

interface IFormData {
    phone: string;
    firstName: string;
    lastName: string;
    gender: 'Мужской' | 'Женский';
}

const FormStep1: FC = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useFormStore();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormData>({
        resolver: yupResolver(userValidationSchema),
        mode: 'onBlur',
        defaultValues: JSON.parse(localStorage.getItem('formDataStep1') || '{}') || {
            phone: formData.phone || '',
            firstName: formData.firstName || '',
            lastName: formData.lastName || '',
            gender: formData.gender || 'Мужской',
        },
    });

    useEffect(() => {
        const subscription = watch((values) => {
            localStorage.setItem('formDataStep1', JSON.stringify(values));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = (data: IFormData) => {
        updateFormData(data);
        navigate('/step2');
    };

    const renderGenderMenuItems = () => {
        const genderOptions = ['Мужской', 'Женский'];
        return genderOptions.map((gender) => {
            return (
                <MenuItem key={gender} value={gender}>
                    {gender}
                </MenuItem>
            );
        });
    };

    return (
        <Layout>
            <Typography mb={3} variant="h5">
                Личные данные
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field} // Передаем все свойства react-hook-form
                                label="Телефон"
                                variant="outlined"
                                fullWidth
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                InputProps={{
                                    inputComponent: InputMask as any, // Используем InputMask как inputComponent
                                    inputProps: {
                                        mask: '+7 000 000-00-00',
                                        replacement: { '0': /\d/ },
                                    },
                                }}
                            />
                        )}
                    />
                </div>

                <div className="form-group">
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Имя"
                                variant="outlined"
                                fullWidth
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        )}
                    />
                </div>

                <div className="form-group">
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Фамилия"
                                variant="outlined"
                                fullWidth
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        )}
                    />
                </div>

                <div className="form-group">
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.gender}>
                                <InputLabel>Пол</InputLabel>
                                <Select label="Пол" {...field} value={field.value || ''}>
                                    {renderGenderMenuItems()}
                                </Select>
                                <FormHelperText>{errors.gender?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="button-group">
                    <Button type="submit" variant="contained">
                        Далее
                    </Button>
                </div>
            </form>
        </Layout>
    );
};

export default FormStep1;
