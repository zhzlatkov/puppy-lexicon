import { useState, useEffect } from 'react';
import getLexiconImage from './getLexiconImage';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

import whiteHeart from './assets/white-heart.png';
import arrow from './assets/white-arrow.png';

export default function LexiconImage(lexiconID) {
    const [lexiconFinalImage, setLexiconFinalImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ error: false, type: '' });

    useEffect(() => {
        setLoading(true)(async function () {
            try {
                const image = await getLexiconImage(lexiconID);
                if (image && !image.error) {
                    setLexiconFinalImage(image.imageUrl);
                    setLoading(false);
                    return;
                }
                setAlert({ error: image.error, type: image.status });
                setLoading(false);
            } catch (error) {
                setAlert({ error: true, type: error.message });
                setLoading(false);
                console.error(error);
            }
        })();
    }, [lexiconID, loading, alert]);

    if (!alert.error && (!lexiconFinalImage || loading)) {
        return <LoadingSpinner />;
    }

    if (alert.error) {
        return <ErrorMessage alert={alert} />;
    }

    return (
        <div className='background-after'>
            <h1>Сега ме сподели с приятели...</h1>
            <img
                src={whiteHeart}
                alt='drawing white Heart'
                className='white-heart'
            />
            <div className='instagram-header'>
                <div className='fake-icon'></div>
                <div className='fake-icon'></div>
            </div>
            <div className='instagram-frame'>
                <img className='instagram-img' src={lexiconFinalImage} alt='' />
                <div className='instagram-footer'>
                    <div>
                        <div className='fake-icon'></div>
                        <div className='fake-icon'></div>
                        <div className='fake-icon'></div>
                    </div>
                    <div className='fake-icon'></div>
                </div>
            </div>
            <img src={arrow} alt='drawing arrow' className='arrow-desktop' />
            <div className='background-after-footer'>
                <h2>Сподели</h2>
                <div className='share-after-footer'>
                    <a href='https://facebook/example-example'>
                        <svg
                            style={{ color: 'white' }}
                            width='50'
                            height='50'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 448 512'
                        >
                            <path
                                d='M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z'
                                fill='white'
                            ></path>
                        </svg>
                    </a>
                    <a href='https://instagram.com/example-example'>
                        <svg
                            style={{ color: 'white' }}
                            xmlns='http://www.w3.org/2000/svg'
                            width='50'
                            height='50'
                            fill='currentColor'
                            viewBox='0 0 16 16'
                        >
                            <path
                                d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z'
                                fill='white'
                            ></path>
                        </svg>
                    </a>
                    <img src={arrow} alt='drawing arrow' className='arrow' />
                </div>
            </div>
        </div>
    );
}
