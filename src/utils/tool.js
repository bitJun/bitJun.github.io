export function isNight() {
    let type;
    let date = new Date();
    if(date.getHours() >=6 && date.getHours() < 18) {
        type = 1;
    }
    else{
        type = 0;
    }
    return type;
}
export function getDay() {
    let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    let date = new Date();
    let type;
    if(date.getHours() >=0 && date.getHours() < 12) {
        type = 'am';
    }
    else{
        type = 'pm';
    }
    return `${weekDay[date.getDay()]}`;
}
export function getTime() {
    let date = new Date();
    let type;
    if(date.getHours() >=0 && date.getHours() < 12) {
        type = 'am';
    }
    else{
        type = 'pm';
    }
    return `${date.getHours()} ${type}`;
}