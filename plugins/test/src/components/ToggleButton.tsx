import React, { useState } from 'react';

const ToggleButton = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <button onClick={handleClick}>
            {isActive ? "Actif" : "Inactif"}
        </button>
    );
};

export default ToggleButton;