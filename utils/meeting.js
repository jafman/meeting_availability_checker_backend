/*
const compareShedules = (freeBusy_1, freeBusy_2) => {
  const freeBusy_1_array = freeBusy_1.calendars[email_1].busy;
  const freeBusy_2_array = freeBusy_2.calendars[email_2].busy;
  const freeBusy_1_array_length = freeBusy_1_array.length;
  const freeBusy_2_array_length = freeBusy_2_array.length;
  let i = 0;
  let j = 0;
  let conflict = false;
  while (i < freeBusy_1_array_length && j < freeBusy_2_array_length) {
    const freeBusy_1_start = freeBusy_1_array[i].start;
    const freeBusy_1_end = freeBusy_1_array[i].end;
    const freeBusy_2_start = freeBusy_2_array[j].start;
    const freeBusy_2_end = freeBusy_2_array[j].end;
    if (freeBusy_1_start < freeBusy_2_start) {
      i++;
    } else if (freeBusy_1_start > freeBusy_2_start) {
      j++;
    } else {
      conflict = true;
      break;
    }
  }
  return conflict;
}
*/