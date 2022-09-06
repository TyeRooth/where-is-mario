import styles from './NamePrompt.module.scss';
import { Link } from 'react-router-dom';

const NamePrompt = () => {
    const handleSubmission = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
    }
    return (
        <div className={styles.root}>
            <p className={styles.time}>You finished in 13 seconds!</p>
            <p className={styles.description}>Submit your score on the global leaderboard.</p>
            <form className={styles.form} onSubmit={handleSubmission}>
                <label for="username" className={styles.label}>Username</label>
                <input id="username" className={styles.input} type="text"></input>
                <div className={styles['buttons-container']}>
                    <Link to="/"><button type="button" className={styles.cancel}>Cancel</button></Link>
                    <button className={styles.submit}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default NamePrompt;