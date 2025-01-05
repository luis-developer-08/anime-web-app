import React, { useState } from "react";

const TooltipCard = ({ title, details, children }) => {
    const [visible, setVisible] = useState(false);

    const showCard = () => setVisible(true);
    const hideCard = () => setVisible(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={showCard}
            onMouseLeave={hideCard}
        >
            {children}
            {visible && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 bg-white border rounded-lg shadow-lg w-60 p-4 space-y-2 opacity-100 transition-opacity duration-300 max-h-60 overflow-y-auto">
                    <h3 className="font-semibold text-lg text-gray-800">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600">{details}</p>
                </div>
            )}
        </div>
    );
};

export default TooltipCard;
