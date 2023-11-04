import { useMemo } from 'react';
import Question from './Question';

export default function FirstLexiconPhase({
    questions,
    lexiconID,
    setLexicon,
    answers,
}) {
    const filteredQuestions = useMemo(
        () => questions.filter((question) => question.phase === 0),
        [questions]
    );
    return (
        <section className='first-phase'>
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
                        className='questions-first-phase'
                        style={
                            index === 0 ? { width: '100%' } : { width: '46%' }
                        }
                    >
                        <Question
                            question={question}
                            setLexicon={setLexicon}
                            previousAnswer={previousAnswer}
                            lexiconID={lexiconID}
                        />
                    </div>
                );
            })}
        </section>
    );
}
