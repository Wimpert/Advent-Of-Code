const utils =  require('../utils/utils')

const DEPENDANT_ON_INDEX = 5;
const DEPENDCY_INDEX = 36;


exports.solve = function(){
   const graphs =  utils.readFileIntoStringArray('./puzzle_7/input.txt');
   let result = 0;

   let {mustBeDoneBefore, comesAfter, allJobs , finishedJobs} = createDepencies(graphs);

   comesAfter = sortProps(comesAfter);
   mustBeDoneBefore = sortProps(mustBeDoneBefore);

   allJobs = [... allJobs].sort()

   const numberOfCoworkers = 5;
   
   const durations = allJobs.map((job,index) => {
      return{id:job,duration:(60+index+1)};
   });

   const jobQueue = {}
   for (let i =0 ; i < numberOfCoworkers ; i++){
      jobQueue[i]=undefined;
   }
   
   fillJobQueueWihtAllInDependantUnfinishedJob(comesAfter, finishedJobs, jobQueue, durations);
  
   let totalNumberOfJobs = allJobs.length;

   let duration = 0;


   while(finishedJobs.length !== totalNumberOfJobs){

      workOnJobs(jobQueue);
      duration++;

      
      for(let position in jobQueue){
         if(jobQueue[position] && jobQueue[position].workToBeDone === 0){
            //done, move to finished:
            finishedJobs.push(jobQueue[position].id);
            //free position:
            jobQueue[position] = undefined;
         }
      }

      for(let job in comesAfter){
         //job can not be done yet:
         if(finishedJobs.indexOf(job) === -1){
            let allDone = comesAfter[job].reduce((allDone, jobAfterCurrent) => {
               if(allDone){
                  allDone = finishedJobs.indexOf(jobAfterCurrent) !== -1;
                  // console.log('alldone', allDone);
               }
               return allDone;
            }, true);
            
            if(allDone){
               // this is our next job, is free to start
               //console.log('all done', allDone,'for job', job);
               if(!jobQueueHasJob(jobQueue,job) && findFirstEmptySpotInJobQueue(jobQueue)){
                  jobQueue[findFirstEmptySpotInJobQueue(jobQueue)] = getJobDurationsFromDurations(job, durations);
               }
            }
         }
      }

      let tries = 0;
      while(findFirstEmptySpotInJobQueue(jobQueue) && tries < numberOfCoworkers){
         fillJobQueueWihtAllInDependantUnfinishedJob(comesAfter, finishedJobs,jobQueue, durations);
         tries++;
      }
   }
   
   return "result: " + duration;
}


function jobQueueHasJob(jobQueue, jobId){
   for(let position in jobQueue){
      if(jobQueue[position] && jobQueue[position].id === jobId){
         return true;
      }
   }
   return false;
}


function sortProps(object){
   const returnVal =  {};
   for(let key of Object.keys(object).sort()){
      returnVal[key] = object[key];
   }
   return returnVal;
}

function fillJobQueueWihtAllInDependantUnfinishedJob(comesAfter, finishedJobs, jobQueue, durations){
   for(let job of durations){
      let emptySpot = findFirstEmptySpotInJobQueue(jobQueue);
      if(emptySpot && !comesAfter[job.id] && finishedJobs.indexOf(job.id) === -1  ){
         if(!jobQueueHasJob(jobQueue,job.id)){
            jobQueue[emptySpot] = {id:job.id,workToBeDone:job.duration};
         }
      }
   }
}

function getJobString(jobs){
   return jobs.reduce((acc,job) => {
      return acc+job;
   }, '');
}

function findFirstEmptySpotInJobQueue(jobQueue){
   for (let spot in jobQueue){
      if(!jobQueue[spot]){
         return spot;
      }
   }
   return undefined;
}

function getJobDurationsFromDurations(jobId, durations){
   for (let duration of durations){
      if(duration.id === jobId){
         return {id:jobId, workToBeDone: duration.duration};
      }
   }
}

function workOnJobs(jobQueue){
   for (let position in jobQueue){
      if(jobQueue[position]){
         jobQueue[position] = {...jobQueue[position], workToBeDone : jobQueue[position].workToBeDone-1};
      }
   }
}


function createDepencies(graphs){
   return graphs.reduce((acc, graph) => {
      let comesAfter =  graph.charAt(DEPENDCY_INDEX);
      let mustBeDone =  graph.charAt(DEPENDANT_ON_INDEX);
      
      if(!acc.mustBeDoneBefore[mustBeDone]){
         acc.mustBeDoneBefore[mustBeDone] = [];
      }
      acc.mustBeDoneBefore[mustBeDone].push(comesAfter);
      acc.mustBeDoneBefore[mustBeDone].sort();
      if(!acc.comesAfter[comesAfter]){
         acc.comesAfter[comesAfter] = [];
      }
      acc.comesAfter[comesAfter].push(mustBeDone);
      acc.comesAfter[comesAfter].sort();
      acc.allJobs.add(mustBeDone);
      acc.allJobs.add(comesAfter);
      return acc;
   },{mustBeDoneBefore:{}, comesAfter:{}, allJobs: new Set(), finishedJobs: []})
   
}