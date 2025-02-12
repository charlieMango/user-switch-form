import { useFormStore, useWorkplaces } from '@/store/formStore';
import { infoValidationSchema } from '@/utils/validationUtils';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';

interface IFormData {
    workplace: string;
    address: string;
}

const FormStep2 = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useFormStore();
    const { data: workPlaces, isPending, error } = useWorkplaces();
    const isLoading = isPending;

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormData>({
        resolver: yupResolver(infoValidationSchema),
        mode: 'onBlur',
        defaultValues: JSON.parse(localStorage.getItem('formDataStep2') || '{}') || {
            workplace: formData.workplace || '',
            address: formData.address || '',
        },
    });

    useEffect(() => {
        const subscription = watch((values) => {
            localStorage.setItem('formDataStep2', JSON.stringify(values));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = (data: IFormData) => {
        updateFormData(data);
        navigate('/step3');
    };

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: 'auto',
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
            }}>
            <Typography variant="h5" textAlign="center" mb={2}>
                Адрес и место работы
            </Typography>
            {error && (
                <Typography color="error">
                    {error instanceof Error ? error.message : 'Ошибка загрузки данных'}
                </Typography>
            )}
            {isLoading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="workplace"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.workplace}>
                                <InputLabel>Место работы</InputLabel>
                                <Select
                                    label={'Место работы'}
                                    {...field}
                                    value={field.value || ''}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                                overflow: 'auto',
                                            },
                                        },
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        },
                                        transformOrigin: {
                                            vertical: 'top',
                                            horizontal: 'left',
                                        },
                                    }}>
                                    {workPlaces?.map((place: any) => (
                                        <MenuItem key={place} value={place}>
                                            <span>{place}</span>
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.workplace?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Адрес проживания"
                                variant="outlined"
                                fullWidth
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                sx={{ mb: 2 }}
                            />
                        )}
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

                        <Button type="submit" variant="contained">
                            Далее
                        </Button>
                    </Box>
                </form>
            )}
        </Box>
    );
};

export default FormStep2;
