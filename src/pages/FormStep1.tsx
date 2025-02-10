// 23. Оптимизированная версия FormStep1.tsx (React 19 совместимость)
import React, { useCallback, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputMask } from '@react-input/mask'; // ✅ Новый исправленный пакет
import './FormStep1.scss';

interface FormData {
    phone: string;
    firstName: string;
    lastName: string;
    gender: 'Мужской' | 'Женский';
}

const validationSchema = yup.object({
    phone: yup.string()
        .matches(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/, 'Введите корректный номер телефона (11 цифр)')
        .required('Телефон обязателен'),
    firstName: yup.string().required('Имя обязательно'),
    lastName: yup.string().required('Фамилия обязательна'),
    gender: yup.string().oneOf(['Мужской', 'Женский'], 'Выберите пол').required('Пол обязателен'),
});

const FormStep1: FC = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        defaultValues: {
            phone: '',
            firstName: '',
            lastName: '',
            gender: '' as any,
        },
    });

    const onSubmit = useCallback((data: FormData) => {
        console.log('Form Data:', data);
        navigate('/step2');
    }, [navigate]);

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <h2 className="form-title">Личные данные</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <InputMask
                                    {...field}
                                    mask="+7 (___) ___-__-__"
                                    replacement={{ _: /\d/ }}
                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    placeholder="+7 (XXX) XXX-XX-XX"
                                    aria-label="Введите номер телефона"
                                />
                            )}
                        />
                        <div className="error-message">{errors.phone?.message}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="firstName">Имя</label>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    placeholder="Введите имя"
                                    autoFocus
                                    aria-label="Введите имя"
                                    {...field}
                                />
                            )}
                        />
                        <div className="error-message">{errors.firstName?.message}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Фамилия</label>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    placeholder="Введите фамилию"
                                    aria-label="Введите фамилию"
                                    {...field}
                                />
                            )}
                        />
                        <div className="error-message">{errors.lastName?.message}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Пол</label>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <select
                                    className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                                    {...field}
                                    aria-label="Выберите пол"
                                >
                                    <option value="">Выберите пол</option>
                                    <option value="Мужской">Мужской</option>
                                    <option value="Женский">Женский</option>
                                </select>
                            )}
                        />
                        <div className="error-message">{errors.gender?.message}</div>
                    </div>

                    <button type="submit" className="submit-button">Далее</button>
                </form>
            </div>
        </div>
    );
};

export default FormStep1;
