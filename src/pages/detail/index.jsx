import { useState, useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { useNavigate } from 'react-router-dom';
import {
  isNight
} from '../../utils/tool';
import './index.css';
import back from '../../images/back.png';
import rainfall from '../../images/rainfallIcon.png';
import humidity from '../../images/humidityIcon.png';
import windSpeed from '../../images/windSpeedIcon.png';
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
import rainIcon from '../../images/rainIcon.png';
import stormIcon from '../../images/stormIcon.png';
import windIcon from '../../images/windIcon.png';
let weekDay = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const Detail = () => {
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState('');
  const [futureWeather, setFutureWeather] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    Init();
    InitToday();
    InitHour();
    initChart();
  }, []);
  const InitHour = () => {
    let params = {
      version: 'v9',
      appid: 61369121,
      appsecret: 'iwbhE2AE',
      city: '杭州'
    }
    axios.get('https://www.tianqiapi.com/api', {
      params
    }).then(response=> {
      let {
        data
      } = response;
      console.log('data', data)
      let list = data.data[0].hours;
      let hours = [],
      tmps = [];
      list.forEach(item=>{
        hours.push(item.hours);
        tmps.push(item.tem);
      });
      initChart(hours, tmps);
      // if (Number(data.status) == 1) {
      //   setFutureWeather(data.forecasts[0]);
      // }
    })
    .catch(err=> {
      console.log(err);
    });
  }
  /**
   * 初始化天气图表
   * @param {c} hours 
   * @param {*} tmps 
   */
  const initChart = (hours, tmps) => {
    let element = document.getElementById('chart2');
    let myChart = echarts.init(element);
    myChart.clear()
    let option;
    option = {
      xAxis: {
        type: 'category',
        data: hours,
        axisLine: {
          lineStyle: {
            color: '#E9C939'
          }
        }
      },
      yAxis: {
        type: '',
        axisLine: {
          show: false //y轴线消失
        },
        axisTick: {
          show: false
        },
      },
      series: [{
        data: tmps,
        type: 'line',
        smooth: true,
        itemStyle:{
          normal:{
              color: '#E9C939',
              lineStyle: {
                  color: '#E9C939',
                  width: 1
              }
          }
        }
      }]
    };
    option && myChart.setOption(option);
  }
  /**
   * 获取未来几天的天气预报数据
   */
  const Init = () => {
    let params = {
      key: '05f1b463c1d3b34e683c1c7ab790b44b',
      city: 330100,
      extensions: 'all'
    }
    axios.get('https://restapi.amap.com/v3/weather/weatherInfo?parameters', {
      params
    }).then(response=> {
      let {
        data
      } = response;
      if (Number(data.status) === 1) {
        setFutureWeather(data.forecasts[0]);
      }
    })
    .catch(error=> {
      console.log(error);
    });
  }
  const renderIcon = (dayweather) => {
    let Icon = null;
    if (['晴', '多云', '风', '阴'].indexOf(dayweather) !== -1) {
      Icon = windIcon;
    }
    if (dayweather.indexOf('雷') !== -1) {
      Icon = stormIcon;
    }
    if (dayweather.indexOf('雨') !== -1 || dayweather.indexOf('雪') !== -1) {
      Icon = rainIcon;
    }
    return (
      <img
        alt=''
        src={Icon}
        className='detail_view_featureList_item_icon'
      />
    )
  }
  /**
   * 获取今天的天气预报数据
   */
  const InitToday = () => {
    let params = {
      key: '05f1b463c1d3b34e683c1c7ab790b44b',
      city: 330100,
    }
    axios.get('https://restapi.amap.com/v3/weather/weatherInfo?parameters', {
      params
    }).then(response=> {
      let {
        data
      } = response;
      let weatherLives = data.lives[0];
      /**
       * 高德返回的天气对照表是中文的形式
       */
      if (weatherLives.weather.indexOf('晴') !== -1) {
        setWeatherIcon(isNight() === 1 ? DaySun : NightMoon);
      }
      if (weatherLives.weather.indexOf('云') !== -1 || weatherLives.weather.indexOf('阴') !== -1) {
        setWeatherIcon(isNight() === 1 ? DayClouds : NightClouds);
      }
      if (weatherLives.weather.indexOf('风') !== -1) {
        setWeatherIcon(isNight() === 1 ? DayWind : NightWind);
      }
      if (weatherLives.weather.indexOf('雷') !== -1) {
        setWeatherIcon(isNight() === 1 ? DayStorm : NightStorm);
      }
      if (weatherLives.weather.indexOf('雨') !== -1) {
        setWeatherIcon(isNight() === 1 ? DayRain : NightRain);
      }
      if (weatherLives.weather.indexOf('雪') !== -1) {
        setWeatherIcon(isNight() === 1 ? DaySnow : NightSnow);
      }
      if (Number(data.status) === 1) {
        setWeather(data.lives[0]);
      }
    })
    .catch(error=> {
      console.log(error);
    });
  }
  return (
    <div className='container'>
      <div className='detail_view'>
        <div className='detail_view_header'>
          <img
            alt=''
            src={back}
            className='detail_view_back'
            onClick={(e)=>navigate(-1)}
          />
          <img
            alt=''
            className='detail_view_Icon'
            src={weatherIcon}
          />
        </div>
        <div className='detail_view_main'>
          <div className='detail_view_main_city'>{weather.city || ''}</div>
          <div className='detail_view_main_province'>{weather.province || ''}</div>
          <div className='detail_view_main_temp'>
            {weather.temperature}
            <span>°C</span>
          </div>
        </div>
        <div className='detail_view_main_tags'>
          <div className='detail_view_main_tags_item'>
            <img
              alt=''
              src={rainfall}
              className='detail_view_main_tags_item_icon'
            />
            {weather.humidity}%
          </div>
          <div className='detail_view_main_tags_item'>
            <img
              alt=''
              src={humidity}
              className='detail_view_main_tags_item_icon'
            />
            {weather.humidity}%
          </div>
          <div className='detail_view_main_tags_item'>
            <img
              alt=''
              src={windSpeed}
              className='detail_view_main_tags_item_icon'
            />
            {weather.windpower} km/h
          </div>
        </div>
        <div className='detail_view_title'>Today</div>
        <div id='chart2' style={{ width: '100%', margin: '50px auto', height: '87px' }}></div>
        <div className='detail_view_featureList'>
          {
            futureWeather.casts && futureWeather.casts.map(item=>
              <div className='detail_view_featureList_item' key={item.date}>
                <div className='detail_view_featureList_item_week'>{weekDay[item.week-1]}</div>
                {renderIcon(item.dayweather)}
                <div className='detail_view_featureList_item_temp'>
                  <div className='detail_view_featureList_item_temp_day'>
                    <p>{item.daytemp}</p>
                    <span>°C</span>
                  </div>
                  <div className='detail_view_featureList_item_temp_night'>
                    <p>{item.nighttemp}</p>
                    <span>°C</span>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
export default Detail;