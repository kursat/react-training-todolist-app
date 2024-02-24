import { useEffect, useState } from 'react';

const useWSData = (url) => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched) {
            setIsFetching(true);

            setTimeout(() => {
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
            }, 3000);
        }
        return () => {};
    }, [isFetched, url]);

    return {
        data,
        error,
        isFetching,
        setIsFetched,
    };
};

export default useWSData;
