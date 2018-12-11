const utils =  require('../utils/utils')

const BEGIN = 'begins shift';
const GUARD = 'Guard';
const A_SLEEP = 'falls asleep';
const WAKE_UP = 'wakes up';

const STARTS = 0;
const WAKES_UP = 1;
const SLEEPS = 2;

exports.solve = function(){
   const logs =  utils.readFileIntoStringArray('./puzzle_4/input.txt');
   logs.sort();
   let structuredLogs = [];
   let guards = new Map();
   let currentGuardNumber = undefined;
   for(let log of logs){
      const structuredLog = structureLogs(log);
      structuredLogs.push(structuredLog);
      currentGuardNumber = processLog(structuredLog,guards, currentGuardNumber);
   }
   // const result = Array.from(guards.values()).reduce((acc,guard) => {
   //    if(guard.minutesASleep > acc.total){
   //       acc.id=guard.id;
   //       acc.minute = findMinuteMostASleep(guard);
   //       acc.total = guard.minutesASleep;
   //    }
   //    return {...acc};
   // }, {id:0, minute:0, total:0})
   // return result.id*result.minute.minute;

   const result = Array.from(guards.values()).reduce((acc, guard) => {
      const {frequency, minute} = findFrequencyAndMinuteMostASleep(guard);
      if(frequency > acc.frequency){
         acc.frequency = frequency;
         acc.id = guard.id;
         acc.minute = minute;
      }
      return {... acc};
      
   }, {id:0, minute:0, frequency:0});

   return result.id*result.minute;
}

function findFrequencyAndMinuteMostASleep(guard){
   return Array.from(guard.shift.values()).reduce((acc, minute, index) => {
      if(minute.length > acc.frequency){
         acc.frequency = minute.length;
         acc.minute = index;
      }
      return {... acc};
   }, {frequency: 0, minute: 0})
}

function findMinuteMostASleep(guard){
   return Array.from(guard.shift.values()).reduce((acc, minute, index) => {
      if(minute.length > acc.number){
         acc.number = minute.length;
         acc.minute = index;
      }
      return {...acc};
   }, {minute:0, number:0})
}

function processLog(structuredLog, guards, currentGuardNumber){
   if(getEventType(structuredLog.event) === STARTS){
      //guard starts:
      let guardNumber = Number(getGuard(structuredLog.event));
      currentGuardNumber = guardNumber;
      let guard = guards.get(guardNumber);
      if(!guard){
         guard = {id : guardNumber , shift :  getEmptyShift(), minutesASleep : 0};
         guards.set(guardNumber, guard);
      }
   } else if(getEventType(structuredLog.event) === SLEEPS){
      const guard = guards.get(currentGuardNumber);
      startSleeping(getMinutes(structuredLog.time), guard, structuredLog.date);
   } else if(getEventType(structuredLog.event) === WAKES_UP){
      const guard = guards.get(currentGuardNumber);
      wakeUp(getMinutes(structuredLog.time), guard, structuredLog.date);  
   }
   return currentGuardNumber;
}

function startSleeping(from, guard, day){
   for(let minute = from; minute < guard.shift.size; minute++){
      guard.shift.get(minute).push(day);
      guard.minutesASleep++;
   }
}

function wakeUp(from, guard, day){
   for(let minute = from; minute < guard.shift.size; minute++){
      guard.shift.get(minute).pop();
      guard.minutesASleep--;
   }
}

function getMinutes(timeString){
   const [hourString, minutesString] = timeString.split(':');
   if(hourString === '23'){
      return 0;
   }
   return Number(minutesString);
}

function getEmptyShift(){
   const returnValue = new Map();
   for(let i = 0; i <= 60; i++) {
      returnValue.set(i, []);
   }
   return returnValue;
}

function structureLogs(log){
   let dateString = log.substr(1, 10);
   let timeString = log.substr(12, 5);
   let eventString = log.substr(18);
   
   return {date:dateString, time: timeString, event: eventString}
}

function getGuard(eventString){
  return eventString.substring(eventString.indexOf('#')+1, eventString.indexOf('begins shift'));
}

function getEventType(eventString){
   if(eventString.indexOf(GUARD) !== -1){
      return STARTS;
   } else if(eventString.indexOf(A_SLEEP)!== -1){
      return SLEEPS;
   }  else if(eventString.indexOf(WAKE_UP)!== -1){
      return WAKES_UP;
   }
}