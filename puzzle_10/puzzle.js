const utils =  require('../utils/utils')


exports.solve = function(){
   const inputs =  utils.readFileIntoStringArray('./puzzle_10/input.txt');
   const points = [];
   for(let input of inputs){
      input = input.replace('position=<','').replace('> velocity=<',', ').replace('>','');
      const [x,y, velX, velY] = input.split(', ').map(string => Number(string));
      
      const point = {x,y,velX,velY};
      //console.log(point);
      points.push(point);
   }

   let previousSurface = Number.MAX_SAFE_INTEGER;
   let currentSurface;
   let found = false;
   let ticks = 0;
   while(!found){
      ticks++;
      movePoints(points);
     
      // 
      const boundaries = findBoundaries(points);
      currentSurface = getSurface(boundaries);
      console.log(ticks, currentSurface);
      
      if(currentSurface >= previousSurface){
         found = true;
         unDoMovePoints(points);
         printPoints(points);
      }
      previousSurface = currentSurface;
      
   }
   return ticks-1;

}


function movePoints(points){
   for (let point of points){
      point.x = point.x + point.velX;
      point.y = point.y + point.velY;
   }
}

function printPoints(points){
  points.sort((a,b) => {
     if(a.y !== b.y){
        return a.y - b.y;
     } else {
        return a.x - b.x;
     }
  });
  console.log(points);
  let currY = Number.MIN_SAFE_INTEGER;
  let line = '';
  let previousP= {};
  for(let point of points){
      if(   !(previousP.x === point.x && previousP.y=== point.y)){
        //console.log('it');
     if(point.y !== currY){
        //console.log(point.y , currY);
        //then print:
        console.log(line);
        line = '';
        currY = point.y;
     } 
     line = appendToString(line, point);
     //console.log('after app',line)
     }
     previousP = point;
  }
  console.log(line);
}

function unDoMovePoints(points){
   for (let point of points){
      point.x = point.x - point.velX;
      point.y = point.y - point.velY;
   }
}

function findBoundaries(points){
   const returnVal = {minX : Number.MAX_SAFE_INTEGER, minY : Number.MAX_SAFE_INTEGER, maxX: Number.MIN_SAFE_INTEGER, maxY: Number.MIN_SAFE_INTEGER};
   for (let point of points){
      returnVal.minX = Math.min(point.x, returnVal.minX);
      returnVal.minY = Math.min(point.y, returnVal.minY);
      returnVal.maxX = Math.max(point.x, returnVal.maxX);
      returnVal.maxY = Math.max(point.x, returnVal.maxY);
   }
   return returnVal;
}

function getSurface(recangle){
   return (recangle.maxX - recangle.minX) * (recangle.maxY - recangle.minY);
}

function appendToString(string, point){
   const numberOfDots =  point.x - string.length;
//console.log('----------------------', numberOfDots, string.length, point.x);
   for(let i = 0 ; i < numberOfDots; i++){
      string = string + ' ';
   }
   string = string + "#";
   return string;
}