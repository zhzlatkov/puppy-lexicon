export default function Loading() {
    return (
        <div className='loading-container'>
            <div className='loading-center'>
                <div className='loading-spinner' role='status'></div>
            </div>
            <h1 className='loading-text'>Loading...</h1>
        </div>
    );
}
