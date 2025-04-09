import { forwardRef } from 'react';
import styles from './input.module.css';

export const Input = forwardRef(({ label = null, error = null, ...props }, ref) => {
	const inputItem =
		props.type === 'textarea' ? (
			<textarea className={styles.input} {...props} ref={ref} />
		) : (
			<input className={styles.input} {...props} ref={ref} />
		);
	return label ? (
		<label className={styles.label}>
			{label}
			{inputItem}
			{error && <FormError>{error}</FormError>}
		</label>
	) : (
		<>
			{inputItem}
			{error && <FormError>{error}</FormError>}
		</>
	);
});
