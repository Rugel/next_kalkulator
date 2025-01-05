import React, { useEffect, useState } from 'react';

const Print = () => {
    const [isClient, setIsClient] = useState(false);

    // Sprawdzenie, czy jesteśmy po stronie klienta
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePrint = () => {
        if (isClient) {
            window.print();
        }
    };

    if (!isClient) return null;
    return (
        <div id='print'><label><button onClick={handlePrint}>🖨️Drukuj</button><br /><em>aby zapisać do pliku należy wybrać w urządzeniach &quot;zapisz jako PDF&quot;</em></label></div>
    );
};
export default Print;
