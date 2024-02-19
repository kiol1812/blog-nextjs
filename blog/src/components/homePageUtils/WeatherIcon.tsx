'use client'
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { DayClear, DayCloudyFog, DayCloudy, DayFog, DayPartiallyClearWithRain, NightClear, NightCloudyFog, NightCloudy, NightFog, NightPartiallyClearWithRain,
         AirFlowIcon, HumidIcon, RefreshIcon, LoadingIcon } from "../../../public/weather_svg/allWeather";

type timeType = {
    Date:string,
    BeginCivilTwilightTime: string,
    SunRiseTime: string,
    SunRiseAZ: string,
    SunTransitTime: string,
    SunTransitAlt: string,
    SunSetTime: string,
    SunSetAZ: string,
    EndCivilTwilightTime: string,
}
type locationType={
    CountyName:string,
    time:timeType[],
}
type datasetType={
    location: locationType[],
}
type cwaopendataType={
    "@xmlns": string,
    identifier: string,
    sender: string,
    sent: string,
    status: string,
    msgType: string,
    dataid: string,
    scope: string,
    dataset: datasetType,
}
type stempType={
    cwaopendata: cwaopendataType,
}

const Container = styled.div`
    height: 100%,
    display: flex,
    align-items: center,
    justify-content: center,
`;

const WeatherCard = styled.div`
  position: relative;
  width: 210px;
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-size: 14px;
  margin-bottom: 3px;
`;

const TestInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
`;

const Temperature = styled.div`
  font-size: 24px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 14px;
`;

const Bottomflex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 14x;
  font-weight: 200;
  svg {
    width: 20px;
    height: auto;
    margin-right: 5px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 14x;
  font-weight: 200;
  svg {
    width: 20px;
    height: auto;
    margin-right: 5px;
  }
`;

const Redo = styled.div<{$isLoading?:boolean}>`
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  svg {
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${props => ((props.$isLoading) ? '1.5s' : '0s')};
  }
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

const IconContainer = styled.div`
    flex-basis: 30%;
    svg {
        max-height: 60px;
        max-width: 60px;
    }
`;

const weatherTypes = {
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isClear: [1],
    isCloudyFog: [25, 26, 27, 28],
    isCloudy: [2, 3, 4, 5, 6, 7],
    isFog: [24],
    isPartiallyClearWithRain: [
        8, 9, 10, 11, 12,
        13, 14, 19, 20, 29, 30,
        31, 32, 38, 39,
    ],
    isSnowing: [23, 37, 42],
}
type SvgElements = {
    [key:string] : React.JSX.Element,
    // isClear: React.JSX.Element,
    // isCloudyFog: React.JSX.Element,
    // isCloudy: React.JSX.Element,
    // isFog: React.JSX.Element,
    // isPartiallyClearWithRain: React.JSX.Element,
}
type weatherIconsType = {
    [key:string] : SvgElements,
}
const weatherIcons:weatherIconsType = {
    day: {
    //   isThunderstorm: <DayThunderstorm />,
        isClear: <DayClear />,
        isCloudyFog: <DayCloudyFog />,
        isCloudy: <DayCloudy />,
        isFog: <DayFog />,
        isPartiallyClearWithRain: <DayPartiallyClearWithRain />,
    //   isSnowing: <DaySnowing />,
        undefined: <>undefine</>,
    },
    night: {
    //   isThunderstorm: <NightThunderstorm />,
        isClear: <NightClear />,
        isCloudyFog: <NightCloudyFog />,
        isCloudy: <NightCloudy />,
        isFog: <NightFog />,
        isPartiallyClearWithRain: <NightPartiallyClearWithRain />,
    //   isSnowing: <NightSnowing />,
        undefined: <>undefine</>,
    },
};
const weatherCode2Type = (weatherCode:string)=>{
    var test:string="not-find.";
    for(const [key, values] of Object.entries(weatherTypes)){
        values.forEach((num)=>{
            if(num===Number(weatherCode)) test=key;
        })
    }
    return test;
}
const WeatherIcon = ({
    currentWeatherCode,
    moment,
}:{
    currentWeatherCode:string,
    moment:string,
})=>{
    const [currentWeatherIcon, setCurrentWeatherIcon] = useState('isClear');
    const theWeatherIcon = useMemo(()=>weatherCode2Type(currentWeatherCode), [ currentWeatherCode, ]);
    useEffect(()=>{
        setCurrentWeatherIcon(theWeatherIcon);
    }, [theWeatherIcon])
    return (
        <IconContainer>
            { weatherIcons[moment][currentWeatherIcon] }
        </IconContainer>
    );
}
const getMoment = (locationName:string, sunriseAndSunsetJSON:stempType)=>{
    const location = sunriseAndSunsetJSON.cwaopendata.dataset.location.find(
        (data:locationType) => data.CountyName === locationName
      );
      if(!location) return null;
      const now = new Date();
      const nowDate = Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(now)
        .replace(/\//g, '-');
    // const locationDate = location.time.find((aDay)=>{aDay.Date==nowDate})||location.time[0]; //&&location.time.find()
    var locationDate = location.time[0];
    location.time.forEach((aDay)=>{
        if(aDay.Date==nowDate) locationDate=aDay;
    })
    const sunriseTime = new Date(`${locationDate.Date} ${locationDate.SunRiseTime}`).getTime();
    const sunsetTime = new Date(`${locationDate.Date} ${locationDate.SunSetTime}`).getTime();
    const nowTime = now.getTime();
    return (sunriseTime<=nowTime&&nowTime<=sunsetTime)
      ? "day"
      : "night";
}
export default function WeatherBar({
    sunriseAndSunsetJSON,
}:{
    sunriseAndSunsetJSON:stempType,
}){
    const [currentWeather, setCurrentWeather] = useState({
        observationTime: '2019-10-02 22:10:00',
        locationName: '臺中市',
        description: '多雲時晴',
        weatherCode: "1",
        temperature: "27.5",
        windSpeed: "0.3",
        humid: "0.88",
        isLoading: true
    });
    useEffect(()=>{
        setCurrentWeather(pervState=>{
            return {
                ...pervState,
                isLoading: true,
            }
        });
        fetchCurrentWeather();
    }, [])
    const fetchCurrentWeather=()=>{
        fetch(
            'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-2F5656BD-691F-49DF-9064-C62B5E3F02F6&locationName=%E8%87%BA%E4%B8%AD%E5%B8%82&sort=time'
        )
            .then((Response) => Response.json())
            .then((data)=>{
                const locationData = data.records.location[0];
                const weather_elements = locationData.weatherElement;
                setCurrentWeather({
                    observationTime: weather_elements[0].time[0].startTime,
                    locationName: locationData.locationName,
                    description: weather_elements[0].time[0].parameter.parameterName,
                    weatherCode: weather_elements[0].time[0].parameter.parameterValue,
                    temperature: weather_elements[2].time[0].parameter.parameterName,
                    windSpeed: weather_elements[0].time[0].parameter.parameterValue,
                    humid: weather_elements[1].time[0].parameter.parameterName,
                    isLoading: false
                });
            })
    }
    const moment = useMemo(() => getMoment(currentWeather.locationName, sunriseAndSunsetJSON), [
        currentWeather.locationName,
    ]);
    return (
        <Container>
          <WeatherCard>
            <CurrentWeather>
                <TestInfo>
                    <Location>{currentWeather.locationName}</Location>
                    <Description>
                    {currentWeather.description}
                    </Description>
                </TestInfo>
              <Temperature>
                {Math.round(Number(currentWeather.temperature))} <Celsius>°C</Celsius>
              </Temperature>
              <WeatherIcon 
                currentWeatherCode={currentWeather.weatherCode}
                moment={moment||"day"}
              />
            </CurrentWeather>
            <Bottomflex>
                <AirFlow>
                    <AirFlowIcon />
                    {currentWeather.windSpeed} m/h
                </AirFlow>
                <Rain>
                    <HumidIcon />
                    {currentWeather.humid} %
                </Rain>
                <Redo onClick={()=>{
                    setCurrentWeather((prevState) => ({
                        ...prevState,
                        isLoading: true,
                    }));
                    fetchCurrentWeather();
                }} $isLoading={currentWeather.isLoading} >
                    {currentWeather.isLoading ? <LoadingIcon /> : <RefreshIcon />}
                </Redo>
            </Bottomflex>
          </WeatherCard>
        </Container>
    );
};