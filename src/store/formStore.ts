import { create } from 'zustand';

// Определяем допустимые значения для поля gender
const genderOptions = ['Мужской', 'Женский'] as const;

// Определяем интерфейс для данных формы
export interface FormValues {
    phone: string;
    firstName: string;
    lastName: string;
    gender: (typeof genderOptions)[number];
    address: string;
    workplace: string;
    loanAmount: number;
    loanTerm: number;
}

// Определяем интерфейс для состояния
interface FormState {
    formData: FormValues;
    updateFormData: (data: Partial<FormValues>) => void;
    resetForm: () => void;
}

// Инициализация хранилища Zustand
export const useFormStore = create<FormState>((set) => ({
    formData: {
        phone: '',
        firstName: '',
        lastName: '',
        gender: 'Мужской',
        address: '',
        workplace: '',
        loanAmount: 200,
        loanTerm: 10,
    },

    // Функция для обновления данных формы
    updateFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),

    // Функция для сброса данных формы
    resetForm: () =>
        set({
            formData: {
                phone: '',
                firstName: '',
                lastName: '',
                gender: 'Мужской',
                address: '',
                workplace: '',
                loanAmount: 200,
                loanTerm: 10,
            },
        }),
}));