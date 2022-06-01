const moment = require('moment');
const MEETING_DURATION = 30; // minutes
const RESOLUTION = 5; // minutes

/* ALGORITHM:
  * 1. Create a time line starting from start time and ending at end time
  * 2. The time line is separated into intervals called ticks of length 5 minutes
  * 3. Each tick is represented by an array element in the timeline array
  * 4. A tick can be either busy or free
  * 5. Add the busy_1 intervals to the timeline and mark them as busy
  * 6. Add the busy_2 intervals to the timeline and mark them as busy
  * 7. Look for a free interval in the timeline up to the meeting duration
  * 8. Return the first free interval found
  * 9. If no free interval is found, return null
*/
const compareShedules = (busy_1, busy_2, start, end) => {

  const timeline = [];
  const timeStart = moment.utc(start);
  const timeEnd = moment.utc(end);
  let tickCount = Math.abs(timeStart.diff(timeEnd, 'minutes')) / RESOLUTION;
  tickCount = Math.ceil(tickCount);
  let currentTimeStart = timeStart.clone();
  // build the timeline
  for(let i = 0; i < tickCount; i++){
    timeline.push({
      status: 'free',
      start: currentTimeStart.clone(),
      end: currentTimeStart.clone().add(RESOLUTION, 'minutes')
    });
    currentTimeStart.add(RESOLUTION, 'minutes');
  }
  
  // mark busy intervals in the timeline
  busy_1.forEach(interval => {
    const startTime = moment.utc(interval.start);
    const endTime = moment.utc(interval.end);
    let startTick = Math.abs(startTime.diff(timeStart, 'minutes')) / RESOLUTION;
    startTick = Math.floor(startTick);
    let tickCount = Math.abs(endTime.diff(startTime, 'minutes')) / RESOLUTION;
    tickCount = Math.ceil(tickCount);
    for(let i = startTick; i < startTick + tickCount; i++){
      timeline[i].status = 'busy';
    }
  });

  busy_2.forEach(interval => {
    const startTime = moment.utc(interval.start);
    const endTime = moment.utc(interval.end);
    let startTick = Math.abs(startTime.diff(timeStart, 'minutes')) / RESOLUTION;
    startTick = Math.floor(startTick);
    let tickCount = Math.abs(endTime.diff(startTime, 'minutes')) / RESOLUTION;
    tickCount = Math.ceil(tickCount);
    for(let i = startTick; i < startTick + tickCount; i++){
      timeline[i].status = 'busy';
    }
  });

  // find a free interval in the timeline up to the meeting duration
  let freeInterval = null;
  let freeSlotCount = 0;
  let startIndex = -1;
  let endIndex = -1;
  for(let i = 0; i < timeline.length; i++){
    if(timeline[i].status === 'free'){
      if(startIndex === -1){
        startIndex = i;
      }
      freeSlotCount++;
      if(freeSlotCount * RESOLUTION >= MEETING_DURATION){
        endIndex = i;
        freeInterval = {
          start: timeline[startIndex].start,
          end: timeline[endIndex].end
        }
        break;
      }
    } else {
      freeSlotCount = 0;
      startIndex = -1;
    }
  }
  return freeInterval;

}

module.exports = { compareShedules };
