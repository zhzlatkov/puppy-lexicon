export default function ErrorMessage({ alert }) {
    return (
        <div className='center'>
            <h1>Грешка...</h1>
            <h3>
                Статус на грешката:{' '}
                <span className='error-text-color'> {alert.type} </span>
            </h3>
        </div>
    );
}
