export default async function getLexiconImage(lexiconID, retryTimes = 10) {
    try {
        let interval = setInterval(async () => {
            const response = await fetch(
                `https://example.com/my-example-lexicons/lexicon-${lexiconID}/image`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            const result = await response.json();
            if (result.imageUrl != null) {
                clearInterval(interval);
                return { imageUrl: result.imageUrl, error: false, status: '' };
            }
            if (retryTimes < 0) {
                clearInterval(interval);
                return { imageUrl: '', error: true, status: 'network error' };
            }
            --retryTimes;
        }, 3000);
    } catch (error) {
        console.error(error);
        return { imageUrl: '', error: true, status: 'network error' };
    }
}
