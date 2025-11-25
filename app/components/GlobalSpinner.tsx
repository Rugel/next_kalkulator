'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, Suspense } from 'react';
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

// Separate component for navigation listening that uses useSearchParams
function NavigationListener({ onNavigationStart, onNavigationEnd }: { onNavigationStart: () => void; onNavigationEnd: () => void }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const prevPathnameRef = React.useRef(pathname);

    useEffect(() => {
        // Show spinner when pathname changes
        if (prevPathnameRef.current !== pathname) {
            onNavigationStart();
            prevPathnameRef.current = pathname;
        }

        // Hide spinner after navigation completes
        const timer = setTimeout(() => {
            onNavigationEnd();
        }, 500);

        return () => clearTimeout(timer);
    }, [pathname, searchParams, onNavigationStart, onNavigationEnd]);

    return null;
}

export const GlobalSpinner = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleNavigationStart = () => {
        setIsLoading(true);
    };

    const handleNavigationEnd = () => {
        setIsLoading(false);
    };

    const showSpinner = () => {
        setIsLoading(true);
    };

    return (
        <SpinnerContext.Provider value={{ showSpinner }}>
            <Suspense fallback={null}>
                <NavigationListener
                    onNavigationStart={handleNavigationStart}
                    onNavigationEnd={handleNavigationEnd}
                />
            </Suspense>
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
