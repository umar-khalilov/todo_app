import PropTypes from 'prop-types';

export const User = ({ name, surname, email, avatar, isMale }) => {
    const isMaleHandler = ({ target: { checked } }) => !checked;
    return (
        <article>
            <p>{name}</p>
            <p>{surname}</p>
            <p>{email}</p>
            <p>{avatar}</p>
            <input type='checkbox' checked={isMale} onChange={isMaleHandler} />
        </article>
    );
};

User.propTypes = {
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isMale: PropTypes.bool.isRequired,
};
