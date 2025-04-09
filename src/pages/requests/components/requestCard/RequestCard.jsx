import styles from './requestCard.module.css';

export const RequestCard = ({ fullName, phone, description, createdAt }) => {
	return (
		<div className={styles['request-card']}>
			<div className={styles['name']}>
				<b>ФИО:</b> {fullName}
			</div>
			<div className={styles['phone']}>
				<b>Телефон:</b> {phone}
			</div>
			<div className={styles['created-at']}>
				<b>Дата создания:</b> {new Date(createdAt).toLocaleString('ru')}
			</div>
			<div className={styles['description']}>
				<b>Описание проблемы:</b>
				{description}
			</div>
		</div>
	);
};
