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
export function isAfterNoon() {
    let type;
    let date = new Date();
    if(date.getHours() >=0 && date.getHours() < 12) {
        type = 'am';
    }
    else{
        type = 'pm';
    }
    return type;
}
export function getTime() {
    
}