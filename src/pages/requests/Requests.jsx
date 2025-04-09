import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Button } from '../../components';
import { RequestCard } from './components';
import styles from './requests.module.css';

export const Requests = () => {
	const navigate = useNavigate();
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		fetch('/api/verify', {
			method: 'GET',
			credentials: 'include',
		}).then((response) => {
			if (!response.ok) {
				navigate('/login');
			}
			return response.ok;
		});

		fetch('/api/requests')
			.then((response) => {
				if (!response.ok) {
					return response.json().then((errData) => {
						setError(errData.message || 'Ошибка валидации');
						throw new Error(errData.message || 'Ошибка валидации');
					});
				}
				return response.json();
			})
			.then((loadedRequests) => {
				setRequests(loadedRequests);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const logout = () => {
		fetch('/api/logout', {
			method: 'POST',
			credentials: 'include',
		})
			.then((response) => {
				if (response.ok) {
					navigate('/login');
				} else {
					console.error('Logout failed');
				}
			})
			.catch((error) => {
				console.error('Logout error:', error);
			});
	};

	return (
		<div className={styles['requests']}>
			<Button onClick={logout}>Выход</Button>
			<Title>Заявки с формы</Title>
			{requests.length ? (
				<div className={styles['requests-list']}>
					{requests.map(({ _id, fullName, phone, description, createdAt }) => (
						<RequestCard
							key={_id}
							id={_id}
							fullName={fullName}
							phone={phone}
							description={description}
							createdAt={createdAt}
						/>
					))}
				</div>
			) : (
				<div className={styles['no-requests-found']}>Заявки не найдены</div>
			)}
		</div>
	);
};
