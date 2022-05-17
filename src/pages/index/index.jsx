import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  isNight,
  getDay,
  getTime
} from '../../utils/tool';
import { useNavigate } from 'react-router-dom';
import './index.css';
import logo from '../../images/logo.png';
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

const Index = () => {
  const navigate = useNavigate();
  const [isDay, setIsDay] = useState(isNight());
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState('');
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
    }
    axios.get('https://restapi.amap.com/v3/weather/weatherInfo?parameters', {
      params
    }).then(function (response) {
      let {
        data
      } = response;
      console.log(getTime())
      let weatherLives = data.lives[0];
      if (weatherLives.weather.indexOf('晴') != -1) {
        setWeatherIcon(isDay == 1 ? DaySun : NightMoon);
      }
      if (weatherLives.weather.indexOf('云') != -1) {
        setWeatherIcon(isDay == 1 ? DayClouds : NightClouds);
      }
      if (weatherLives.weather.indexOf('风') != -1) {
        setWeatherIcon(isDay == 1 ? DayWind : NightWind);
      }
      if (weatherLives.weather.indexOf('雷') != -1) {
        setWeatherIcon(isDay == 1 ? DayStorm : NightStorm);
      }
      if (weatherLives.weather.indexOf('雨') != -1) {
        setWeatherIcon(isDay == 1 ? DayRain : NightRain);
      }
      if (weatherLives.weather.indexOf('雪') != -1) {
        setWeatherIcon(isDay == 1 ? DaySnow : NightSnow);
      }
      if (Number(data.status) == 1) {
        setWeather(data.lives[0]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className='container'>
      <div className='index_view'>
        <img
          src={logo}
          className='index_view_logo'
        />
        <div className='index_view_icon1'></div>
        <div className='index_view_icon2'></div>
        <div className='index_view_icon3'></div>
        <div className='index_view_icon4'></div>
        <div className='index_view_icon5'></div>
        <div className='index_view_icon6'></div>
        <div className='index_view_main'>
          <div className='index_view_main_container'>
            <img
              src={weatherIcon}
              className='index_view_main_container_icon'
            />
            <p className='index_view_main_container_location'>杭州市, 浙江省</p>
            <div className='index_view_main_container_temperature'>
              <div className='index_view_main_container_temperature_value'>{weather.temperature}</div>
            </div>
            <div className='index_view_main_container_day'>
              <span>{getDay()} </span>
              {getTime()}
            </div>
            <div className='index_view_main_container_tags'>
              {weather.weather}
            </div>
            <a className='index_view_main_container_detail' onClick={(e)=>navigate('/detail')}>详情</a>
          </div>
          <div className='index_view_main_detail'>
            <div className='index_view_main_detail_item'>
              <div className='index_view_main_detail_item_l'>
                <img
                  src={rainfall}
                  className='index_view_main_detail_item_icon'
                />
                降水量
              </div>
              <p className='index_view_main_detail_item_value'>{weather.humidity}%</p>
            </div>
            <div className='index_view_main_detail_item'>
              <div className='index_view_main_detail_item_l'>
                <img
                  src={humidity}
                  className='index_view_main_detail_item_icon'
                />
                湿度
              </div>
              <p className='index_view_main_detail_item_value'>{weather.humidity}%</p>
            </div>
            <div className='index_view_main_detail_item'>
              <div className='index_view_main_detail_item_l'>
                <img
                  src={windSpeed}
                  className='index_view_main_detail_item_icon'
                />
                风速
              </div>
              <p className='index_view_main_detail_item_value'>{weather.windpower} km/h</p>
            </div>
          </div>
        </div>
      </div>
      <div className='index_view_navbar'>
        <div className='index_view_navbar_main'>
          <div className='index_view_navbar_main_item'>
            <img
              src={home}
              className='index_view_navbar_main_item_icon'
            />
            <p className='index_view_navbar_main_item_text'>Home</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Index;