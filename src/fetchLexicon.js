export default async function fetchLexicon() {
    try {
        let lexiconID = localStorage.getItem('lexiconID');
        if (!lexiconID) {
            const response = await fetch(
                'https://example.com/my-example-lexicons/new-lexicon',
                {
                    method: 'GET',
                }
            );
            const lexicon = await response.json();
            lexiconID = lexicon.id;
            localStorage.setItem('lexiconID', JSON.stringify(lexiconID));
        }

        const response = await fetch(
            `https://example.com/my-example-lexicons/lexicon-${lexiconID}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        );
        const lexicon = await response.json();
        if (response.status === 200) {
            return { lexiconResonse: lexicon, error: false, errorStatus: '' };
        } else {
            console.error(response.statusText);
            return {
                lexiconResonse: null,
                error: true,
                errorStatus: response.statusText,
            };
        }
    } catch (error) {
        console.error(error);
        return {
            lexiconResonse: null,
            error: true,
            errorStatus: error.message,
        };
    }
}
