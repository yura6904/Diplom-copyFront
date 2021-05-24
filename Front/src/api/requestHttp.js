import React, {useState, useCallback} from 'react';

//запросы на сервер
export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const responce = await fetch(url, {method, body, headers});
            const data = await responce.json();

            if (!responce.ok) {
                throw new Error(data.message || 'Smth is wrong');
            }
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    },[]);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}

/*


/*

import React, {useState, useCallback} from 'react';

//запросы на сервер
export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback( (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            debugger;
            let data;
            const responce =  fetch(url, {method, body, headers})
                .then(function (responce) {
                    responce.json()
                    .then(function (d) {
                        console.log('it is d ', d);
                        debugger;
                        data = d;
                        return data;
                    })
                });

            if (!responce.ok) {
                throw new Error(data.message || 'Smth is wrong');
            }
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    },[]);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}


/*



*/
