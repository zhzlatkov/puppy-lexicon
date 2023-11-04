import { useState } from 'react';
import SelectField from './SelectField';
import InputField from './InputField';

import paw from './assets/sticker paw.png';
import hearts2 from './assets/drawing hearts 2.png';
import star from './assets/drawing star.png';
import shark from './assets/drawing shark.png';
import hearts from './assets/drawing hearts.png';
import lines from './assets/drawing lines-1.png';
import check from './assets/drawing check.png';
import bone from './assets/drawing bone.png';
import flower from './assets/drawing flower.png';
import exclamationMark from './assets/drawing exclamation mark.png';
import treeLines from './assets/drawing tree lines.png';

export default function Question({
    question,
    setLexicon,
    previousAnswer,
    index = undefined,
    lexiconID,
    dogName = '',
}) {
    const [answer, setAnswer] = useState(previousAnswer);
    const [isEmpty, setIsEmpty] = useState(false);

    let imageSide;
    if (question.image) {
        switch (question.image_side) {
            case 'left':
                imageSide = 'question-image-left';
                break;
            case 'right':
                imageSide = 'question-image-right';
                break;
            default:
                imageSide = 'question-image-center';
        }
    }

    const postAnswer = async (e) => {
        if (e.trim() === '') {
            setIsEmpty(true);
            return;
        }

        try {
            const res = await fetch(
                `https://example.com/my-example-lexicons/lexicon-${lexiconID}/answers`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        has_finished: false,
                        question_id: question.id,
                        [question.type === 'single' ? 'answer_id' : 'answer']:
                            answer,
                    }),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                }
            );
            const response = await res.json();
            setLexicon(response);
        } catch (error) {
            setIsEmpty(true);
            console.error(error.message);
        }
    };

    return (
        <div className='question-container z-index'>
            <label className='z-index capitalize'>
                {index ? `${index + 1}. ` : ''}
                {!dogName
                    ? question.label_without_variables
                    : question.label_with_variables.replace(
                          '%DOG_NAME%',
                          dogName
                      )}
                <span className='error-text-color z-index'>
                    {question.is_required ? '*' : ''}
                </span>
            </label>
            {isEmpty ? (
                <p className='error-text-color z-index'>Моля попълни полето</p>
            ) : null}
            {question.image ? (
                <img
                    src={getQuestionImageVariable(question.image)}
                    alt={question.image + 'image'}
                    className={imageSide}
                />
            ) : null}
            {question.type === 'single' ? (
                <SelectField
                    question={question}
                    answer={answer}
                    setAnswer={setAnswer}
                    postAnswer={postAnswer}
                />
            ) : (
                <InputField
                    questionHint={question.hint}
                    answer={answer}
                    setAnswer={setAnswer}
                    postAnswer={postAnswer}
                />
            )}
        </div>
    );
}

function getQuestionImageVariable(imageName) {
    switch (imageName) {
        case 'paw':
            return paw;
        case 'hearts2':
            return hearts2;
        case 'star':
            return star;
        case 'shark':
            return shark;
        case 'hearts':
            return hearts;
        case 'lines':
            return lines;
        case 'check':
            return check;
        case 'bone':
            return bone;
        case 'flower':
            return flower;
        case 'exclamationMark':
            return exclamationMark;
        case 'treeLines':
            return treeLines;
        default:
            return null;
    }
}
