import WeatherBar from '@/src/components/homePageUtils/WeatherIcon';
import LifeRecoedsBar from '@/src/components/homePageUtils/LifeRecords';
import DateMarkBar from '@/src/components/homePageUtils/DateMark';

import fs from 'fs';
import path from "path";

const sunriseAndSunsetData = fs.readFileSync(`${path.join(process.cwd(), 'public')}/data/sun_rise-set.json`, 'utf-8');
const sunriseAndSunsetJSON = JSON.parse(sunriseAndSunsetData);

import HomepageFullContainer from '@/src/components/homePageUtils/mainUnit'
import Goal from '@/lib/getGoals/getGoals';
import RecordsDash from '@/lib/getRecords/getRecords';
import MarkedDateList from '@/lib/getMarkedDateList/getMarkedDateList';

export default function Home() {
  return (
    <main>
      <HomepageFullContainer leftsideElement={<DateMarkBar dateList={<MarkedDateList />} />} centersideElement={<LifeRecoedsBar gold={<Goal />} records={<RecordsDash />} />} rightsideElement={<WeatherBar sunriseAndSunsetJSON={sunriseAndSunsetJSON} />} />
    </main>
  );
}
