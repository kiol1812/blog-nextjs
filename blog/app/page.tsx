import { WeatherBar } from '@/src/components/WeatherIcon';

import fs from 'fs';
import path from "path";

const sunriseAndSunsetData = fs.readFileSync(`${path.join(process.cwd(), 'public')}/data/sun_rise-set.json`, 'utf-8');
const sunriseAndSunsetJSON = JSON.parse(sunriseAndSunsetData);

import HomepageFullContainer from '@/src/components/homePageUtils/mainUnit'

export default function Home() {
  return (
    <main>
      <HomepageFullContainer leftsideElement={<h1>hello world</h1>} rightsideElement={<WeatherBar sunriseAndSunsetJSON={sunriseAndSunsetJSON} />} />
    </main>
  );
}
