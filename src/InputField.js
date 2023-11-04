export default function InputField({
    questionHint,
    answer,
    setAnswer,
    postAnswer,
}) {
    return (
        <input
            className='input-field z-index'
            type='text'
            placeholder={questionHint}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onBlur={(e) => {
                postAnswer(e.target.value);
            }}
        />
    );
}
