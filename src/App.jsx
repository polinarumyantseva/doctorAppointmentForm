import { Routes, Route } from 'react-router-dom';
import { Authorization, RecordingForm, Requests } from './pages';
// import { ERROR } from './constants';
import styles from './app.module.css';

export const App = () => {
	return (
		<div className={styles.app}>
			<div className={styles.content}>
				<Routes>
					<Route path='/' element={<RecordingForm />} />
					<Route path='/login' element={<Authorization />} />
					<Route path='/requests' element={<Requests />} />
					{/*
					<Route path='/post/:id' element={<Post />} />
					<Route path='/post/:id/edit' element={<Post />} />
					<Route path='*' element={<Error error={ERROR.PAGE_NOT_EXIST} />} /> */}
				</Routes>
			</div>
		</div>
	);
};
