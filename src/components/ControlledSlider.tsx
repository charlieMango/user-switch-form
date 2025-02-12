import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { Box, Slider, Typography } from '@mui/material';

interface IControlledSliderProps {
    name: string;
    control: any;
    label: string;
    min: number;
    max: number;
    step: number;
    unit?: string;
    error?: string;
}

const ControlledSlider: FC<IControlledSliderProps> = ({ name, control, label, min, max, step, unit = '', error }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Box sx={{ mb: 3 }}>
                    <Typography>
                        {label}: {field.value} {unit}
                    </Typography>
                    <Slider
                        {...field}
                        min={min}
                        max={max}
                        step={step}
                        onChange={(_, value) => field.onChange(value)}
                        sx={{ mt: 2 }}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            )}
        />
    );
};

export default ControlledSlider;
