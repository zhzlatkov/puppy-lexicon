import React, { useState, useEffect } from 'react';
import fetchLexicon from './fetchLexicon';
import ErrorMessage from './ErrorMessage';
import LexiconImage from './LexiconImage';
import LoadingSpinner from './LoadingSpinner';

import LexiconForm from './LexiconForm';

export default function App() {
    const [lexicon, setLexicon] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ error: false, type: '' });

    useEffect(() => {
        setLoading(true);
        (async function () {
            const fetchedLexicon = await fetchLexicon();
            if (fetchedLexicon.lexiconResonse) {
                setLexicon(fetchedLexicon.lexiconResonse);
                setLoading(false);
                return;
            }
            setAlert({
                error: fetchedLexicon.error,
                status: fetchedLexicon.errorStatus,
            });
            setLoading(false);
        })();
    }, []);

    if (isFinished) {
        return <LexiconImage lexiconID={lexicon.id} />;
    }
    if (loading) {
        return <LoadingSpinner />;
    }
    if (alert.error) {
        return <ErrorMessage alert={alert} />;
    }

    return (
        <LexiconForm
            lexicon={lexicon}
            setLexicon={setLexicon}
            setIsFinished={setIsFinished}
        />
    );
}
