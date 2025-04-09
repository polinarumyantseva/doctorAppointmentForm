import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Title } from '../../components';
import styles from './authorization.module.css';

export const Authorization = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState(null);

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

		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (!response.ok) {
					return response.json().then((errData) => {
						setError(errData.message || 'Ошибка валидации');
						throw new Error(errData.message || 'Ошибка валидации');
					});
				}
				return response.json();
			})
			.then((data) => {
				setFormData({ email: '', password: '' });
				navigate('/requests');
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	return (
		<div className={styles['form-wrapper']}>
			<Title>Вход в систему</Title>

			{error && <div className={styles.error}>{error}</div>}

			<form className={styles.form} onSubmit={onSubmit}>
				<Input type='text' label='Email' name='email' value={formData.email} onChange={handleChange} required />
				<Input
					type='password'
					label='Пароль'
					name='password'
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<Button type='submit'>Авторизоваться</Button>
			</form>
		</div>
	);
};
