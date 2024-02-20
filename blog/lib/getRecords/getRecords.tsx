import fs from 'fs';
import path from 'path';
import styles from "./getRecords.module.css";

const recordsJSON = JSON.parse(fs.readFileSync(`${path.join(process.cwd(), 'public')}/data/records.json`, 'utf-8'));

type aDay={[key:string]:boolean,}
type records={[key:string]:aDay,}

function RecordsNest({
    recordsJSON,
}:{
    recordsJSON:records,
}){
    var weeks:React.ReactNode[]=[];
    const nowDate=new Date();
    for(let i=9; i>=0; i--){
        var aWeek:React.ReactNode[]=[];
        for(let j=6; j>=0; j--){
            let theDay = new Date();
            let timeStemp = theDay.setDate(nowDate.getDate()-(i*7+j));
            const theDate = Intl.DateTimeFormat('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(theDay)
            .replace(/\//g, '-');
            let flag:boolean=true;
            for(const [key, values] of Object.entries(recordsJSON)){
                if(key==theDate){
                    aWeek.push((values.test1)?<div key={i*7+j} className={styles.aSquare_005f7533} />:<div key={i*7+j} className={styles.aSquare} />);
                    flag=false;
                }
            }
            if(flag) aWeek.push(<div key={i*7+j} className={styles.aSquare} />);
        }
        weeks.push(<div key={i} className={styles.row}>{aWeek}</div>);
    }
    const graph = weeks.map((item)=>{
        return item;
    })
    return(
        // <div className={styles.flexBox}>{graph}</div>
        <>{graph}</>
    );
}

export default function RecordsDash(){
    return (
        <RecordsNest recordsJSON={recordsJSON} />
    );
}
