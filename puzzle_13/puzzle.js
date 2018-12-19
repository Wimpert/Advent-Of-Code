const utils =  require('../utils/utils')

const VERTICAL_TRACK = '|';
const HORIZONTAL_TRACK = '-';
const TRAIN_LEFT = '<';
const TRAIN_RIGHT = '>';
const TRAIN_DOWN = 'v';
const TRAIN_UP  = '^';
const CROSSING = '+';
const DOWN_RIGHT = '/';
const DOWN_LEFT = '\\';

const LEFT = {x:-1, y:0};
const STRAIGH = 'STRAIGH';
const RIGHT = {x:1, y:0};

const UP = {x:0, y:-1};
const DOWN = {x:0, y:1};




exports.solve = function(){


   const inputs =  utils.readFileIntoStringArray('./puzzle_13/input.txt');
   const tracks = [];
   const trains = [];

   for (let lineIndex in inputs){
      tracks[lineIndex] =  inputs[lineIndex].split('');
      for(let signIndex in tracks[lineIndex]){
         if(tracks[lineIndex][signIndex]=== TRAIN_LEFT) {
            tracks[lineIndex][signIndex] = '-';
            trains.push({x : Number(signIndex), y: Number(lineIndex), direction : LEFT, turns:[LEFT,STRAIGH,RIGHT]});
         } else if(tracks[lineIndex][signIndex]=== TRAIN_RIGHT){
            tracks[lineIndex][signIndex] = '-';
            trains.push({x : Number(signIndex), y: Number(lineIndex), direction : RIGHT, turns:[LEFT,STRAIGH,RIGHT]});
         } else if(tracks[lineIndex][signIndex]=== TRAIN_DOWN){
            tracks[lineIndex][signIndex] = '|';
            trains.push({x : Number(signIndex), y: Number(lineIndex), direction : DOWN, turns:[LEFT,STRAIGH,RIGHT]});
         } else if(tracks[lineIndex][signIndex]=== TRAIN_UP){
            tracks[lineIndex][signIndex] = '|';
            trains.push({x : Number(signIndex), y: Number(lineIndex), direction : UP, turns:[LEFT,STRAIGH,RIGHT]});
         }
      }
   }
   let iteration = 0;
   let found = false;
   while(!found){
      const coordinates = moveTrains(trains, tracks);
      if(coordinates){
         found = true;
         console.log(coordinates);
      }
      // console.log(iteration++);
   }
   


   //printTracks(tracks);
   
}

function printTracks(tracks){
   for (let line of tracks){
      let lineString = ''
      for (let sign of line){
         lineString = lineString + sign;
      }
      console.log(lineString);
   }
}

function moveTrains(trains, tracks){
   let returnValue;
   trains.sort((a,b) => {
      if(a.y !== b.y){
         return a.y-b.y;
      }
      return a.x-b.x;
   });

   

   let allCrashedTrainIndexes = new Set();
   for(let train of trains){
      moveTrain(train, tracks[train.y][train.x]);
      // if(!returnValue){
      //    returnValue = checkForCollision(trains);
      // }
      let crachesWith = checkCrash(train, trains);
      if(crachesWith !== undefined){
         allCrashedTrainIndexes.add(crachesWith);
         allCrashedTrainIndexes.add(Number(trains.indexOf(train)));
      }

   }
   
   for(let index of Array.from(allCrashedTrainIndexes.values()).sort((a,b) => Number(b)-Number(a))){
      console.log('delating index:', index);
      trains.splice(index, 1);
   }

   if(trains.length === 1){
      return trains;
   }

   return returnValue;
}

function checkForCollision(trains){
  const passedCoordinates = [];
  for (let train of trains){
      for(let coor of passedCoordinates){
         if(coor.x === train.x && coor.y === train.y){
            return {x:train.x, y: train.y};
         }   
      }
      passedCoordinates.push({x:train.x, y: train.y});
  }
}


function moveTrain(train, track){

   if(track === CROSSING) {
      const manouverToDo = train.turns.shift();
      train.turns.push(manouverToDo);
      if(train.direction === UP){
         if(manouverToDo === LEFT){
            train.direction = LEFT;
         } else if(manouverToDo === RIGHT){
            train.direction = RIGHT;
         }
    } else if(train.direction === DOWN){
         if(manouverToDo === LEFT){
            train.direction = RIGHT;
         } else if(manouverToDo === RIGHT){
            train.direction = LEFT;
         }
      } else if(train.direction === RIGHT){
        if(manouverToDo === LEFT){
            train.direction = UP;
         } else if(manouverToDo === RIGHT){
            train.direction = DOWN;
         }
      } else if(train.direction === LEFT){
         if(manouverToDo === LEFT){
            train.direction = DOWN;
         } else if(manouverToDo === RIGHT){
            train.direction = UP;
         }
      }
   } else if(track === DOWN_LEFT) {
      // => \
      if(train.direction === UP) {
         train.direction = LEFT;
      } else if(train.direction === DOWN) {
         train.direction = RIGHT;
      } else if(train.direction === RIGHT) {
         train.direction = DOWN;
      } else if(train.direction === LEFT) {
         train.direction = UP;
      } 
   } else if(track === DOWN_RIGHT) {
      // => /
      if(train.direction === UP) {
         train.direction = RIGHT;
      } else if(train.direction === DOWN) {
         train.direction = LEFT;
      } else if(train.direction === RIGHT) {
         train.direction = UP;
      } else if(train.direction === LEFT) {
         train.direction = DOWN;
      } 
   }
   
   //actually go to the next point:
   train.x = train.x  +  train.direction.x;
   train.y = train.y  +  train.direction.y
}


function checkCrash(train, trains){
   let index = trains.indexOf(train);
   for(let trainToCheckForCrachIndex in trains){
      if(index !== Number(trainToCheckForCrachIndex)){
         if(train.x === trains[trainToCheckForCrachIndex].x && train.y === trains[trainToCheckForCrachIndex].y){
           return Number(trainToCheckForCrachIndex);
         }
      }
   }
   return undefined;
}



