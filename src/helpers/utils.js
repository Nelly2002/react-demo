
export function idGen(){
    return Math.random().toString(32).slice(2);
}

export function formDate(date){
    return date ? date.slice(0,10) : '';
    
}