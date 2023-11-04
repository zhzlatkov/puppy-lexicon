import React, { useState, useMemo, useCallback } from 'react';

import FirstLexiconPhase from './FirstLexiconPhase';
import SecondLexiconPhase from './SecondLexiconPhase';
import UploadPhoto from './UploadPhoto';

import LexiconTitle from './assets/lexicon title.png';
import paw from './assets/sticker paw.png';
import sun from './assets/drawing sun.png';
import stickerLoveDog from './assets/sticker I love my dog.png';
import stickerAmasing from './assets/sticker my dog is amazing.png';
import envelope from './assets/drawing envelope.png';
import clickClick from './assets/drawing click click.png';

export default function LexiconForm({ lexicon, setLexicon, setIsFinished }) {
    const [isRequieredFilled, setIsRequieredFilled] = useState(false);

    const answers = useMemo(() => lexicon?.answers || [], [lexicon]);
    const questions = useMemo(() => lexicon?.questions, [lexicon]);

    const questionIdWithSpecialMeaningDogName = useMemo(() => {
        if (questions) {
            return questions.find(
                (question) => question.has_special_meaning_dog_name
            ).id;
        }
    }, [questions]);

    const dogName = useMemo(() => {
        if (answers.length > 0) {
            return answers.find(
                (answer) =>
                    questionIdWithSpecialMeaningDogName === answer.question_id
            ).id;
        }
    }, [answers, questionIdWithSpecialMeaningDogName]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const requiredQuestions = questions.filter((e) => e.is_required);
            let isAnswerMissing = false;
            requiredQuestions.forEach((requiredQuestion) => {
                const answer = answers.find(
                    (answer) => answer.question_id === requiredQuestion.id
                );
                if (!answer) {
                    return (isAnswerMissing = true);
                }
            });
            if (isAnswerMissing) {
                return setIsRequieredFilled(false);
            }
            return setIsFinished(true);
        },
        [answers, questions, setIsFinished]
    );

    return (
        <>
            <div className='background'>
                <div className='header'>
                    <img
                        src={LexiconTitle}
                        alt='lexicon Title'
                        className='lexicon-title-img'
                    />
                    <img src={sun} alt='sun' className='sun' />
                    <img src={paw} alt='paw' className='paw-1' />
                </div>
                <div className='lexicon-form'>
                    <div>
                        <div className='lexicon-header-title'>
                            <h1>Хайде да се запознаем...</h1>
                            <img
                                src={stickerLoveDog}
                                className='sticker-love-dog'
                                alt=''
                            />
                        </div>

                        {isRequieredFilled ? (
                            <p className='error-text-color'>
                                Моля попълни всички въпроси със{' '}
                                <span className='error-text-color'>*</span>
                            </p>
                        ) : null}

                        <form onSubmit={handleSubmit}>
                            <FirstLexiconPhase
                                setLexicon={setLexicon}
                                questions={questions}
                                answers={answers}
                                lexiconID={lexicon.id}
                            />
                            <UploadPhoto lexiconID={lexicon.id} />
                            <div className='container-second-phase'>
                                <SecondLexiconPhase
                                    setLexicon={setLexicon}
                                    questions={questions}
                                    answers={answers}
                                    lexiconID={lexicon.id}
                                    dogName={dogName}
                                />
                            </div>
                            <div className='form-footer'>
                                <img
                                    src={stickerAmasing}
                                    alt='sticker Amasing'
                                    className='sticker-amazing'
                                />
                                <img src={paw} alt='paw' className='paw-3' />
                                <img
                                    src={clickClick}
                                    alt='sticker Amasing'
                                    className='click-click'
                                />
                                <button type='submit' className='submit-btn'>
                                    Изпрати
                                    <img
                                        src={envelope}
                                        alt='envelope'
                                        className='envelope'
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
