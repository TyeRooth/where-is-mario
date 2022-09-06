import styles from './NamePrompt.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase';
import { setDoc, doc } from 'firebase/firestore';
import uniqid from 'uniqid';

const NamePrompt = (props) => {
    let navigate = useNavigate();

    const handleSubmission = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        await setDoc(doc(db, "scores", uniqid()), {
            name: name,
            score: props.time,
        });
        navigate("/leaderboard", {replace: true});
    };

    return (
        <div className={styles.root}>
            <p className={styles.time}>You finished in {props.time} seconds!</p>
            <p className={styles.description}>Submit your score on the global leaderboard.</p>
            <form className={styles.form} onSubmit={handleSubmission}>
                <label htmlFor="username" className={styles.label}>Username</label>
                <input id="username" className={styles.input} type="text"></input>
                <div className={styles['buttons-container']}>
                    <Link to="/"><button type="button" className={styles.cancel} onClick={props.reset}>Cancel</button></Link>
                    <button className={styles.submit}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default NamePrompt;