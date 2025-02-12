import * as yup from 'yup';

export const userValidationSchema = yup.object({
    phone: yup
        .string()
        .matches(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, 'Формат: +7 999 999-99-99')
        .required('Телефон обязателен'),
    firstName: yup.string().trim().min(2, 'Минимум 2 символа').required('Имя обязательно'),
    lastName: yup.string().trim().min(2, 'Минимум 2 символа').required('Фамилия обязательна'),
    gender: yup.string().oneOf(['Мужской', 'Женский'], 'Выберите корректный пол').required('Пол обязателен'),
});

export const infoValidationSchema = yup.object({
    workplace: yup.string().required('Место работы обязательно'),
    address: yup.string().min(5, 'Минимум 5 символов').required('Адрес обязателен'),
});

export const sliderValidationSchema = yup.object({
    loanAmount: yup.number().min(200, 'Минимум $200').max(1000, 'Максимум $1000').required(),
    loanTerm: yup.number().min(10, 'Минимум 10 дней').max(30, 'Максимум 30 дней').required(),
});
