import { createContext, useContext, useState, useCallback } from "react";

interface UpdateContext {
    updatePosts: () => void;
}

const UpdateContext = createContext<UpdateContext | null>(null);

export const UpdateProvider = ({ children }: { children: React.ReactNode }) => {
    const [shouldUpdate, setShouldUpdate] = useState(false);

    const updatePosts = useCallback(() => {
        setShouldUpdate(!shouldUpdate);
    }, [shouldUpdate]);

    return (
        <UpdateContext.Provider value={{ updatePosts }}>
            {children}
        </UpdateContext.Provider>
    );
};

export const useUpdateContext = () => {
    const context = useContext(UpdateContext);
    if (context === null) {
        throw new Error("useUpdateContext must be used within an UpdateProvider");
    }
    return context;
};
