const utils =  require('../utils/utils');
const Deque = require("double-ended-queue");



// I added a rotate method for fun since that's what circles do
Deque.prototype.rotate = function (val) {
	if (val > 0){
		for (let i = 0 ; i < val ; i++){
			this.unshift(this.pop());
		}
	} else if (val < 0){
		val = Math.abs(val);
		for (let i = 0 ; i < val ; i++){
			this.push(this.shift());
		}
	}
	return;	
}

// THE SOLUTION
exports.solve = function (input) {

   const inputs =  utils.readFileIntoStringArray('./puzzle_9/input.txt');
   
   for(let input of inputs ){

   const playerCount = Number(input.split('-')[0]); 
   const lastMarble = Number(input.split('-')[1]);
   const expected = Number(input.split('-')[2]);

	//const inputArray = input.split(" ");
	//const playerCount = parseInt(inputArray[0])
	//const lastMarble = parseInt(inputArray[6]);
	//const expected = typeof inputArray[11] === "undefined" ? inputArray[11] : parseInt(inputArray[11]);
	
	const scores = new Array(playerCount).fill(0);

	let highestScore = 0;

	let circle = new Deque(lastMarble);
	circle.push(0);
	
	for (let i = 1; i < lastMarble; i++) {
		if(i % 23 === 0){
			circle.rotate(7);
			scores[i % playerCount] += i + circle.pop();
			circle.rotate(-1);
			if(scores[i % playerCount] > highestScore){
				highestScore = scores[i % playerCount];
			}
		} else {
			circle.rotate(-1);
			circle.push(i);
		}
	}
	
	let result;
	if ( typeof expected === "undefined" ){
		result = "N/A";
	} else {
		result = expected === highestScore ? "PASS" : "FAIL";
	}
	return {
		playerCount: playerCount, 
		lastMarble: lastMarble, 
		expected: expected, 
		actual: highestScore,
		result: result
   };	
}
}


// exports.solve = function(){
//    const inputs =  utils.readFileIntoStringArray('./puzzle_9/input.txt');
//    for(let input of inputs ){
//       const numberOfPlayers = Number(input.split('-')[0]);
//       //console.log(numberOfPlayers, input.split('-'));
//       const numberOfMarbles = Number(input.split('-')[1]);


//    let currentMarblePosition = 0;
//    let currentPlayer = 1;
//    let players = {};


//    // console.log(getPositionToRemove([0,1,2,3,4,5,6,7], 6));


//    let marbles = [0];

//    for(let marble = 1 ; marble <= numberOfMarbles; marble++){

//       if(marble%10000 === 0){
//          console.log(marble);
//       }     
//       if(marble%23 === 0){
//          // oops, special case:
//          const positionToRemove = getPositionToRemove(marbles,currentMarblePosition);
//          if(!players[currentPlayer]){
//             players[currentPlayer] = marble + marbles[positionToRemove];
//          } else {
//             players[currentPlayer] = players[currentPlayer] + marble + marbles[positionToRemove];
//          }
//          marbles.delete(positionToRemove);
//          currentMarblePosition = positionToRemove;
//          //console.log(currentMarblePosition, marbles.length);
//          if(currentMarblePosition === marbles.length){
//             console.log('yeet');
//             currentMarblePosition = 0;
//          }

//       } else {
//           currentMarblePosition = movePositionPointer(marbles, currentMarblePosition);
//           marbles.insert(currentMarblePosition, marble);
        
//       }

//       currentPlayer++;
//       if(currentPlayer > numberOfPlayers){
//          currentPlayer = 1;
//       }


      
//    } 
//    // print(marbles);
//    console.log(getHighScore(players));


//    //console.log('pos',currentMarblePosition);
// }
   
//    return ;
// }


//  function print(arr){
//     console.log(arr.reduce((acc, el) => {
//       return acc = acc + ' ' + el;
//     }, '' ));
//  }

//  function movePositionPointer(marbles, currentPosition){
//     if(currentPosition === marbles.length-1){
//       return 1;
//     } else if(currentPosition === marbles.length-2){
//       return marbles.length;
//     }
//     return currentPosition + 2 ;
//  }

//  function getPositionToRemove(marbles, currentMarblePosition){
//     if(currentMarblePosition < 7){
//        //console.log(marbles.length-1)
//        return marbles.length-(7-currentMarblePosition);
//     } 
//     return currentMarblePosition-7;
//  }

//  function getHighScore(players){
//     let returnValue = 0;
//     for (let player of Object.keys(players)){
//       returnValue = Math.max(returnValue, players[player]);
//     }
//     return returnValue;
//  }

//   Array.prototype.insert = function ( index, item ) {
//     insertOne( this,index, item );
//   };

//    Array.prototype.delete = function ( index ) {
//       spliceOne(this, index);
//    };

//    var spliceOne = function(arr, index) {
//       var len=arr.length;
//       if (!len) { return }
//       while (index<len) { 
//             arr[index] = arr[index+1]; index++ }
//       arr.length--;
// };

// var insertOne = function(arr, index, item) {
//    var len=arr.length;
//    if (!len) { return }
//    let pos = arr.length;
//    while(pos !== index){
//       arr[pos] = arr[pos-1];
//       pos--;
//    }
//    arr[index] = item;
// };