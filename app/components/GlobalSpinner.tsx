'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from '../modules/Spinner.module.css';

interface SpinnerContextType {
    showSpinner: () => void;
}

const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

export const useSpinner = () => {
    const context = useContext(SpinnerContext);
    if (!context) {
        throw new Error('useSpinner must be used within a SpinnerProvider');
    }
    return context;
};

export const GlobalSpinner = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsLoading(false);
    }, [pathname, searchParams]);

    const showSpinner = () => {
        setIsLoading(true);
    };

    return (
        <SpinnerContext.Provider value={{ showSpinner }}>
            {children}
            {isLoading && (
                <div className={styles.overlay}>
                    <div className={styles.spinnerContainer}>
                        <div className={styles.spinner}></div>
                        <div className={styles.text}>Ładowanie...</div>
                    </div>
                </div>
            )}
        </SpinnerContext.Provider>
    );
};
