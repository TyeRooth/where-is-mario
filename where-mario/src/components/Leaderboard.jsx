import styles from './Leaderboard.module.scss';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../utils/firebase";
import uniqid from 'uniqid';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const getLeaderboardData = async () => {
            const scoresData = await getDocs(collection(db, "scores"));
            let scores = [];
            scoresData.forEach(score => {
                const name = score._document.data.value.mapValue.fields.name.stringValue;
                const time = score._document.data.value.mapValue.fields.score.integerValue;
                const entry = {name: name, score: time};
                scores.push(entry);
            });
            setLeaderboard(scores);
        };
        getLeaderboardData();
    }, []);

    const sortedBoard = leaderboard.sort((a, b) => a.score - b.score);
    const leaderBoardTable = sortedBoard.map((entry, index) => {
        return (
            <tr key={uniqid()}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
            </tr>
        );
    });
    
    return (
        <div className={styles.root}>
            <h1 className={styles.heading}>LeaderBoard</h1>
            <table className={styles.board}>
                <thead className={styles['table-head']}>
                    <tr>
                        <th className={styles['column-name']}>Rank</th>
                        <th className={styles['column-name']}>Name</th>
                        <th className={styles['column-name']}>Time (Seconds)</th>
                    </tr>
                </thead>
                <tbody className={styles.table}>
                    {leaderBoardTable}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;