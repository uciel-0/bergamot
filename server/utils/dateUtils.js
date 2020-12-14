import moment from 'moment-timezone';

export const groupByDay = (data) => {
  // array of objects 
  let groupedData = {};
  let eventsOnSameDay = [];
  // pool similar dates into one key
  data.forEach((e) => {
    const date = e.date;
    const event = e;
    if (!groupedData[date]) {
      eventsOnSameDay = [];
      groupedData[date] = eventsOnSameDay;
      eventsOnSameDay.push(event);
    } else if (groupedData[date]) {
      eventsOnSameDay.push(event);
    }
  });
  // clean up this data to be sent to the front end
  const finalArray = [];
  for (const date in groupedData) {
    finalArray.push({
      date, 
      events: groupedData[date]
    })
  }
  return finalArray;
}
  
export const normalizeDate = (date) => {
  if (date) {
    let dateObject = new Date(date);
    const offset = dateObject.getTimezoneOffset();
    dateObject = new Date(dateObject.getTime() + (offset*60*100))
    return reformatDate(dateObject);
  } else return false;
}

export const reformatDate = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '-' + day + '-' + year;
}
// for UTC dates, to bring them to local time zone
export const formatDate = (date) =>  date ? moment.utc(date).local().format('ddd, MMM D, YYYY') : null;

// for dates that are already local 
export const formatLocalDate = (date) => date ? moment(date).format('ddd, MMM D, YYYY') : null;

export const normalizeUTCDate = (utcDate) => {
  return utcDate ? moment.utc(utcDate).format() : null;
}

export const normalizeLocalDate = (localDate, timezone) => {
  if (timezone) {
    return localDate ? moment.tz(localDate, timezone).format() : null;
  } else return localDate ? moment(localDate).format() : null;
}

// normalizing the dates also means attaching the appropriate timezone offset the local dates 
// ticketmasater can use dates.timezone field 
// stubhub can use 
// seatgeek can use venue.timezone

export const formatTime = (dateTime) => dateTime ? moment(dateTime).format('hh:mm A') : null; 
