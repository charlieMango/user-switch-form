import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Ошибка в ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Что-то пошло не так. Пожалуйста, перезагрузите страницу.</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
