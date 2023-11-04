export default function SelectField({
    question,
    answer,
    setAnswer,
    postAnswer,
}) {
    return (
        <select
            className='select-field z-index'
            value={answer}
            onChange={(e) => {
                postAnswer(e.target.value);
                setAnswer(e.target.value);
            }}
        >
            <option disabled></option>
            {question.possible_answers.map((possibleOption) => (
                <option
                    key={possibleOption.id}
                    id={possibleOption.id}
                    type='radio'
                    name={question.title}
                    value={possibleOption.id}
                >
                    {possibleOption.label}
                </option>
            ))}
        </select>
    );
}
