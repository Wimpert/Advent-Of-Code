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

const LEFT = 'LEFT';
const STRAIGH = 'STRAIGH';
const RIGHT = 'ROGHT';

const UP = 'UP';
const DOWN = 'DOWN';




exports.solve = function(){


   const inputs =  utils.readFileIntoStringArray('./puzzle_13/example.txt');
   const tracks = [];
   const trains = [];

   for (let lineIndex in inputs){
      tracks[lineIndex] =  inputs[lineIndex].split('');
      for(let signIndex in tracks[lineIndex]){
         if(tracks[lineIndex][signIndex]=== TRAIN_LEFT) {
            tracks[lineIndex][signIndex] = '-';
            trains.push({x : signIndex, y: lineIndex, direction : LEFT, turns:[LEFT,STRAIGH,RIGHT]});
         } else if(tracks[lineIndex][signIndex]=== TRAIN_RIGHT){
            tracks[lineIndex][signIndex] = '-';
            trains.push({x : signIndex, y: lineIndex, direction : RIGHT, turns:[LEFT,STRAIGH,RIGHT]});
         } else if(tracks[lineIndex][signIndex]=== TRAIN_DOWN){
            tracks[lineIndex][signIndex] = '|';
            trains.push({x : signIndex, y: lineIndex, direction : DOWN, turns:[LEFT,STRAIGH,RIGHT]});
         } else if(tracks[lineIndex][signIndex]=== TRAIN_UP){
            tracks[lineIndex][signIndex] = '|';
            trains.push({x : signIndex, y: lineIndex, direction : UP, turns:[LEFT,STRAIGH,RIGHT]});
         }
      }
   }

   moveTrain(trains, tracks);

   printTracks(tracks);
   
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
   trains.sort((a,b) => {
      if(a.y !== b.y){
         return a.y-b.y;
      }
      return a.x-b.x;
   });

   for(let train of trains){
      console.log(train);
      moveTrain(train, tracks[train.y][train.x]);
   }
}

function moveTrain(train, track){

   if(track === VERTICAL_TRACK){
      if(train.direction === UP){
         train.y = train.y - 1;
      } else {
         train.y = train.y + 1;
      }
   } else if( track === HORIZONTAL_TRACK){
      if(train.direction === LEFT){
         train.x = train.x - 1;
      } else {
         train.x = train.x + 1;
      }
   } else if(track === CROSSING) {
      const manouverToDo = train.turn.shift();
      train.turn.printTracks(manouverToDo);
      if(train.direction === UP){
         if(manouverToDo === STRAIGH){
            train.y = train.y - 1;
         } else if(manouverToDo === LEFT){
            train.direction = LEFT;
            train.x =  train.x - 1;
         } else if(manouverToDo === RIGHT){
            train.direction = RIGHT;
            train.x =  train.x + 1;
         }
      } else if(train.direction === DOWN){
         if(manouverToDo === STRAIGH){
            train.y = train.y + 1;
         } else if(manouverToDo === LEFT){
            train.direction = RIGHT;
            train.x =  train.x + 1;
         } else if(manouverToDo === RIGHT){
            train.direction = LEFT;
            train.x =  train.x - 1;
         }
      } else if(train.direction === RIGHT){
         if(manouverToDo === STRAIGH){
            train.y = train.x + 1;
         } else if(manouverToDo === LEFT){
            train.direction = UP;
            train.x =  train.y - 1;
         } else if(manouverToDo === RIGHT){
            train.direction = DOWN;
            train.x =  train.y + 1;
         }
      } else if(train.direction === LEFT){
         if(manouverToDo === STRAIGH){
            train.y = train.x - 1 ;
         } else if(manouverToDo === LEFT){
            train.direction = DOWN;
            train.x =  train.y + 1;
         } else if(manouverToDo === RIGHT){
            train.direction = UP;
            train.x =  train.y - 1;
         }
      }
   } else if(track === DOWN_LEFT) {
      if(train.direction === UP) {

      } else if(train.direction === RIGHT) {

      }   
   } else if(track === DOWN_RIGHT) {
      if(train.direction === DOWN) {

      } else if(train.direction === LEFT) {

      }
   }

}





