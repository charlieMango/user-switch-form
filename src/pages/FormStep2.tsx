import React, { useCallback, useEffect, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormStep2.scss';

interface FormData {
    workPlace: string;
    address: string;
}

const validationSchema = yup.object({
    workPlace: yup.string().required('Место работы обязательно'),
    address: yup.string().required('Адрес обязателен'),
});

const FormStep2: FC = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
        defaultValues: {
            workPlace: '',
            address: '',
        },
    });

    const [workPlaces, setWorkPlaces] = useState<{ slug: string, name: string, url: string }[]>([]);


    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then((response) => response.json())
            .then(setWorkPlaces)
            .catch(console.error);
    }, []);

    useEffect(() => {
        console.log('workPlaces', workPlaces);
    }, [workPlaces]);

    const onSubmit = useCallback((data: FormData) => {
        console.log('Form Data:', data);
        navigate('/step3');
    }, [navigate]);

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <h2 className="form-title">Адрес и место работы</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="workPlace">Место работы</label>
                        <Controller
                            name="workPlace"
                            control={control}
                            render={({ field }) => (
                                <select
                                    className={`form-control ${errors.workPlace ? 'is-invalid' : ''}`}
                                    {...field}
                                    aria-label="Выберите место работы"
                                >
                                    <option value="">Выберите место работы</option>
                                    {workPlaces.map((place) => (
                                        <option key={place.slug} value={place.name}>{place.name}</option>
                                    ))}
                                </select>
                            )}
                        />
                        <div className="error-message">{errors.workPlace?.message}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Адрес проживания</label>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                    placeholder="Введите адрес"
                                    aria-label="Введите адрес проживания"
                                    {...field}
                                />
                            )}
                        />
                        <div className="error-message">{errors.address?.message}</div>
                    </div>

                    <div className="button-group">
                        <button type="button" className="back-button" onClick={() => navigate('/step1')}>Назад</button>
                        <button type="submit" className="submit-button">Далее</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormStep2;

