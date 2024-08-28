import { useState, useEffect, useCallback } from "react";

const useLoading = (loadDataFunction: () => Promise<void>) => {
    const [loading, setLoading] = useState<boolean>(false);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            await loadDataFunction();
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    }, [loadDataFunction]);

    useEffect(() => {
        load();
    }, []);

    return loading;
};

export default useLoading;
