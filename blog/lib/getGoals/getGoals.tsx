import styles from "./getGoals.module.css";

import fs from 'fs';
import path from "path";

const goalData = fs.readFileSync(`${path.join(process.cwd(), 'public')}/data/goal.json`, 'utf-8');
const goalJSON = JSON.parse(goalData);

type goal={"name" : string,}
type goals={"goals" : goal[],}

function GoalLists({
    goalJSON,
}:{
    goalJSON:goals,
}){
    const list = Object.values(goalJSON.goals).map((title)=>{
        return (
            <div key={`${title.name}`} className={styles.goalBox}>
                <div className={styles.goalTitle}>{title.name}</div>
                <div className={styles.count}>countTest</div>
            </div>
        );
    })
    return (
        <>{list}</>
    );
}
export default function Goal(){
    return (
        <>
            <div className={styles.flexBox}>
                <GoalLists goalJSON={goalJSON}/>
            </div>
        </>
    );
}