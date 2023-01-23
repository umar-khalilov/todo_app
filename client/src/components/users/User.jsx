export const User = ({ name, surname, email, isMale }) => {
    const isMaleHandler = ({ target: { checked } }) => !checked;
    return (
        <article>
            <p>{name}</p>
            <p>{surname}</p>
            <p>{email}</p>
            <input type="checkbox" checked={isMale} onChange={isMaleHandler} />
        </article>
    );
};
