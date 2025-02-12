import * as yup from 'yup';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

// Определяем допустимые значения для поля gender
const genderOptions = ['Мужской', 'Женский'] as const;

// Определяем схему валидации
const validationSchema = yup.object({
    phone: yup
        .string()
        .matches(/^0\d{9}$/, 'Введите корректный номер телефона')
        .required('Телефон обязателен'),
    firstName: yup.string().required('Имя обязательно'),
    lastName: yup.string().required('Фамилия обязательна'),
    gender: yup
        .string()
        .oneOf([...genderOptions], 'Выберите пол')
        .required('Пол обязателен'),
    address: yup.string().required('Адрес обязателен'),
    workplace: yup.string().required('Место работы обязательно'),
    loanAmount: yup.number().min(200).max(1000).required('Введите сумму займа'),
    loanTerm: yup.number().min(10).max(30).required('Введите срок займа'),
});

export interface IFormValues {
    phone: string;
    firstName: string;
    lastName: string;
    gender: (typeof genderOptions)[number];
    address: string;
    workplace: string;
    loanAmount: number;
    loanTerm: number;
}

export function useFormValidation(defaultValues: IFormValues) {
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<IFormValues>({
        defaultValues,
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    return { control, handleSubmit, setValue, getValues, errors };
}
