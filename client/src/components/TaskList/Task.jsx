export const Task = props => {
    const { id, title, body, deadline, files, isDone } = props;
    const isDoneHandler = ({ target: { checked } }) => !checked;
    return (
        <article>
            <p>{title}</p>
            <p>{body}</p>
            <div>{deadline}</div>
            <div>{files}</div>
            <input type='checkbox' checked={isDone} onChange={isDoneHandler} />
        </article>
    );
};
