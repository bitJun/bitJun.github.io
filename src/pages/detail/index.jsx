import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  isNight
} from '../../utils/tool';
import './index.css';
import logo from '../../images/logo.png';
import back from '../../images/back.png';
import home from '../../images/home.png';
import rainfall from '../../images/rainfall.png';
import humidity from '../../images/humidity.png';
import windSpeed from '../../images/windSpeed.png';
import DayClouds from '../../images/DayClouds.png';
import DayRain from '../../images/DayRain.png';
import DaySnow from '../../images/DaySnow.png';
import DayStorm from '../../images/DayStorm.png';
import DayWind from '../../images/DayWind.png';
import DaySun from '../../images/DaySun.png';
import NightClouds from '../../images/NightClouds.png';
import NightMoon from '../../images/NightMoon.png';
import NightRain from '../../images/NightRain.png';
import NightSnow from '../../images/NightSnow.png';
import NightStorm from '../../images/NightStorm.png';
import NightWind from '../../images/NightWind.png';
const Detail = () => {
  const [weather, setWeather] = useState({});
  const [isDay, setIsDay] = useState(isNight());
  const navigate = useNavigate();
  useEffect(() => {
    Init();
  }, []);
  /**
   * 初始化数据
   */
  const Init = () => {
    let params = {
      key: '05f1b463c1d3b34e683c1c7ab790b44b',
      city: 330100,
      extensions: 'all'
    }
    axios.get('https://restapi.amap.com/v3/weather/weatherInfo?parameters', {
      params
    }).then(function (response) {
      let {
        data
      } = response;
      console.log('data', data)
      if (Number(data.status) == 1) {
        setWeather(data.forecasts[0]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className='container'>
      <div className='detail_view'>
        <img
          src={back}
          className='detail_view_back'
          onClick={(e)=>navigate(-1)}
        />
        <div className='detail_view_main'>
          <div className='detail_view_main_city'>{weather.city || ''}</div>
          <div className='detail_view_main_province'>{weather.province || ''}</div>
        </div>
      </div>
    </div>
  )
}
export default Detail;