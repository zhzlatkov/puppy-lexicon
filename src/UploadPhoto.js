import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

import crown from './assets/drawing crown.png';
import thinkBallons from './assets/drawing think ballons.png';
import heart from './assets/drawing glowing heart.png';
import awesome from './assets/sticker awesome.png';
import dashedLines from './assets/drawing dashed lines.png';
import paw from './assets/sticker paw.png';
import imgUpload from './assets/img upload.png';

export default function UploadPhoto({ lexiconID }) {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ error: false, message: '' });
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

    const uploadPhoto = async (e) => {
        setLoading(true);

        try {
            let formData = new FormData();
            formData.append('photo', e[0]);
            const response = await fetch(
                `https://example.com/my-example-lexicons/lexicon-${lexiconID}/photo`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (response.status === 200) {
                setIsPhotoUploaded(true);
                setAlert({ error: false, message: '' });
                return setLoading(false);
            }
            setIsPhotoUploaded(false);
            setAlert({ error: true, message: response.message });
            return setLoading(false);
        } catch (error) {
            setIsPhotoUploaded(false);
            setAlert({ error: true, message: error.message });
            console.error(error.message);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div style={{ position: 'relative' }}>
            <img src={crown} alt='crown' className='crown' />
            <img
                src={thinkBallons}
                alt='think Ballons'
                className='think-ballons'
            />
            <img src={heart} alt='heart' className='heart' />
            <img src={awesome} alt='awesome' className='awesome' />
            <img src={paw} alt='paw' className='paw-4' />
            <img
                src={dashedLines}
                alt='dashed Lines'
                className={`dashed-lines ${
                    isPhotoUploaded ? 'green-border' : ''
                }`}
            />
            <label>Снимка на куч:</label>
            <section className='upload-photo'>
                <input
                    type='file'
                    id='dogProfile'
                    name='dogProfile'
                    accept='image/*'
                    className='img-input'
                    onChange={(e) => uploadPhoto(e.target.files)}
                ></input>
                <img src={imgUpload} alt='' className='img-btn' />
                {alert.error ? (
                    <ErrorMessage alert={alert} />
                ) : (
                    <p>
                        Файлът трябва да бъде <br></br>между 100 килобайта и 25
                        мегабайта
                    </p>
                )}{' '}
                ;
            </section>
        </div>
    );
}
