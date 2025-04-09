import styles from './formError.module.css';

export const FormError = ({ children }) => {
	return <div className={styles['error-message']}>{children}</div>;
};
