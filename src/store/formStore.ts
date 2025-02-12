import { api } from '@/api/formApi';
import { create } from 'zustand';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface FormData {
    phone: string;
    firstName: string;
    lastName: string;
    gender: 'Мужской' | 'Женский';
    address: string;
    workplace: string;
    loanAmount: number;
    loanTerm: number;
}

interface FormState {
    formData: FormData;
    isModalOpen: boolean;
    updateFormData: (data: Partial<FormData>) => void;
    toggleModalOpen: (value: boolean) => void;
    resetForm: () => void;
}

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
    isModalOpen: false,

    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data },
        })),

    toggleModalOpen: (value: boolean) =>
        set(() => ({
            isModalOpen: value,
        })),

    resetForm: () => {
        return set({
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
        });
    },
}));

export const useWorkplaces = () => {
    return useQuery({
        queryKey: ['workplaces'],
        queryFn: api.getWorkplaces,
    });
};

export const useSubmitForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: FormData) => api.sendFormData(`${formData.firstName} ${formData.lastName}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workplaces'] });
        },
        onError: (error) => {
            console.error('Ошибка отправки формы:', error);
        },
    });
};
