import { useState } from 'react';
import { Input, Button, Title } from '../../components';
import styles from './recordingForm.module.css';

export const RecordingForm = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		description: '',
	});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setError(null);
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setError(null);

		fetch('/api/requests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (!response.ok) {
					return response.json().then((errData) => {
						setError(errData.message || errData.error || 'Ошибка валидации');
						throw new Error(errData.message || errData.error || 'Ошибка валидации');
					});
				}
				return response.json();
			})
			.then((data) => {
				console.log('Success:', data);
				setSuccess(true);
				setFormData({ fullName: '', phone: '', description: '' });
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	return (
		<div className={styles['form-wrapper']}>
			<Title>Запись к врачу</Title>

			{success && <div className={styles.success}>Заявка успешно отправлена!</div>}
			{error && <div className={styles.error}>{error}</div>}

			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type='text'
					label='ФИО'
					name='fullName'
					value={formData.fullName}
					onChange={handleChange}
					required
				/>
				<Input label='Номер телефона' name='phone' value={formData.phone} onChange={handleChange} required />

				<Input
					type='textarea'
					label='Опишите вашу проблему'
					name='description'
					value={formData.description}
					onChange={handleChange}
				/>

				<Button type='submit' disabled={!!error}>
					Отправить
				</Button>
			</form>
		</div>
	);
};
