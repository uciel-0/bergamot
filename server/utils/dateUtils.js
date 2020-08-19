import moment from 'moment';

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

  export const formatDate = (date) => date ?  moment.utc(date).local().format('ddd MM D YYYY') : null
  
  
 