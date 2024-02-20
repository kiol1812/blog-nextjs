import fs from 'fs';
import path from 'path';
import styles from "./getCalender.module.css";

const calenderJSON = JSON.parse(fs.readFileSync(`${path.join(process.cwd(), 'public')}/data/calender.json`, 'utf-8'));

type calenderType={[key:string]:string[],}

function CalenderObj({
    calenderJSON,
}:{
    calenderJSON:calenderType,
}){
    var weeks:React.ReactNode[]=[];
    const nowDate = new Date();
    const IntlnowDate = Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(nowDate)
    .replace(/\//g, '-');
    let theDay = new Date();
    let timeStemp = theDay.setDate(nowDate.getDate()-3);
    timeStemp = theDay.setDate(theDay.getDate()-theDay.getDay());
    for(let i=0; i<5; i++){
        var aWeek:React.ReactNode[]=[];
        for(let j=0; j<7; j++){
            timeStemp = theDay.setDate(theDay.getDate()+1);
            const theDate = Intl.DateTimeFormat('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(theDay)
            .replace(/\//g, '-');
            let flag:boolean=true;
            let isToday:boolean=false;
            if(IntlnowDate==theDate) isToday=true;
            for(const [key, values] of Object.entries(calenderJSON)){
                if(key==theDate){
                    aWeek.push((isToday)
                        ?<div className={styles.importantAndIsToday} key={i*7+j}>{`${theDate.at(-2)}${theDate.at(-1)}`}</div>
                        :<div className={styles.important} key={i*7+j}>{`${theDate.at(-2)}${theDate.at(-1)}`}</div>)
                    flag=false;
                }
            }
            if(flag) aWeek.push((isToday)
                ?<div className={styles.normalAndIsToday} key={i*7+j}>{`${theDate.at(-2)}${theDate.at(-1)}`}</div>
                :<div className={styles.normal} key={i*7+j}>{`${theDate.at(-2)}${theDate.at(-1)}`}</div>)
        }
        weeks.push(<div className={styles.row} key={i*-1}>{aWeek}</div>);
    }
    const calenterObj = weeks.map((item)=>{
        return item;
    })
    return (
        <div className={styles.calenderBox}>{calenterObj}</div>
    );
}

export default function MarkedDateList(){
    return (
        // <>from get marked date list</>
        <CalenderObj calenderJSON={calenderJSON} />
    );
}