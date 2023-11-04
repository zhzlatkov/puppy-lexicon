import { useMemo } from 'react';
import Question from './Question';

import zLines from './assets/drawing lines.png';
import questionMark from './assets/drawing question mark.png';

export default function SecondLexiconPhase({
    questions,
    lexiconID,
    setLexicon,
    answers,
    dogName,
}) {
    const filteredQuestions = useMemo(
        () => questions.filter((question) => question.phase === 1),
        [questions]
    );
    return (
        <div style={{ position: 'relative' }}>
            <img src={zLines} alt='zLines' className='z-lines' />
            <img
                src={questionMark}
                alt='question Mark'
                className='question-mark'
            />
            <section className='second-phase'>
                <h2>
                    Моля сега дайте шанс на вашето куче да отговори на <br></br>
                    следните въпроси:
                </h2>
                {filteredQuestions.map((question, index) => {
                    const previousAnswer =
                        answers.length > 0
                            ? answers.find(
                                  (answer) => question.id === answer.question_id
                              )?.answer
                            : '';
                    return (
                        <div
                            key={question.id}
                            className='questions-second-phase'
                        >
                            <Question
                                question={question}
                                setLexicon={setLexicon}
                                index={index}
                                previousAnswer={previousAnswer}
                                lexiconID={lexiconID}
                                dogName={dogName}
                            />
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
