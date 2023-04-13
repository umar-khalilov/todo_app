import PropTypes from 'prop-types';
import cx from 'classnames';
import { ErrorMessage } from 'formik';
import styles from './InputField.module.css';

const InputField = ({ field, meta, form, ...rest }) => {
    const classNames = cx(styles.input, {
        [styles.validInput]: meta.touched && !meta.error,
        [styles.invalidInput]: meta.touched && meta.error,
    });
    return (
        <label className={styles.container}>
            <input {...field} type='text' className={classNames} {...rest} />
            <ErrorMessage component='div' name={field.name} className={styles.arrowStyles} />
        </label>
    );
};

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
};

export default InputField;
