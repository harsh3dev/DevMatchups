"use client";
import React, { useState } from 'react';

const useToggleForm = () => {
    const [isOpen,setIsOpen] = useState(false);

    return {
        isOpen,
        setIsOpen
    }
}

export default useToggleForm;