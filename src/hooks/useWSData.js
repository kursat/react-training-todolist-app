import { useCallback, useEffect, useState } from 'react';

const useWSData = (url) => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched) {
            setIsFetching(true);

            fetch(url, {
                method: 'GET',
                headers: {},
            })
                .then((response) => response.json())
                .then((result) => {
                    setData(result);
                    setIsFetched(true);
                })
                .catch((e) => {
                    setError('Bir hata oluştu');
                })
                .finally(() => {
                    setIsFetching(false);
                });
        }
        return () => {};
    }, [isFetched, url]);

    const refetch = useCallback(() => {
        setIsFetched(false);
    }, []);

    return {
        data,
        error,
        isFetching,
        setIsFetched,
        refetch,
    };
};

export default useWSData;
