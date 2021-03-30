// On = Exists in whole and filterd set, Off = Does not exist in whole set, Greyed = Exists in set but not fitlered set  
export const vendorShadingState = (vendor, existsInWholeSet, existsInFilteredSet, vendorFilterState, isVendorFilterCall, isStatusFilterCall, isSliderCall, isCalendarCall) => {
  let shadingState = '';
  // RETURNS CHECKED, UNCHECKED, GREYED
  if (existsInFilteredSet) {
    shadingState = 'CHECKED';
  } else if (isVendorFilterCall && !existsInFilteredSet) {
    shadingState = 'UNCHECKED';
  } else if (isStatusFilterCall && !existsInFilteredSet) {
    shadingState = 'GREYED';
  } else if (isSliderCall && !existsInFilteredSet) {
    shadingState = 'GREYED';
  } else if (isCalendarCall && !existsInFilteredSet) {
    shadingState = 'GREYED';
  } else if (!existsInWholeSet) {
    shadingState = 'GREYED';
  } 
  // console.log('vendorShadingState for', vendor, 'existsInWholeSet:', existsInWholeSet , 'existsInFilteredSet:', existsInFilteredSet ,'shadingState:', shadingState);
  return shadingState;
}

export const statusShadingState = (stateName, existsInSet, statusFilterFromFrontEnd) => {
  let shadingState = '';
  if (existsInSet) {
    shadingState = 'CHECKED';
  } else if (statusFilterFromFrontEnd === 'UNCHECKED') {
    shadingState = 'UNCHECKED';
  } else {
    shadingState = 'GREYED'
  }
  // console.log('status shading state for', stateName, existsInSet, statusFilterFromFrontEnd)
  return shadingState;
}

export const sortDatesChronologically = set => set.sort((a, b) => new Date(a.date) - new Date(b.date));

export const determineIfVendorExistsInSet = (set, vendor) => set.reduce((result, e) => e.source === vendor ? true : result, false);

export const sortByPriceAndGroupByDay = (set, direction) => {
  console.log(10101010, 'sortByPriceAndGroupByDay', direction)
  const output = [];
  let dataSortedByPrice = [];
  
  if (direction === 'PRICE_ASCENDING') {
    dataSortedByPrice = set.sort((a,b) => a.priceBeforeFees - b.priceBeforeFees);
  } else dataSortedByPrice = set.sort((a,b) => b.priceBeforeFees - a.priceBeforeFees);

  const createAndPushDateChunk = (e) => {
    const dateChunk = {date: '', events: []}
     // assign a date to dateChunk 
     dateChunk.date = e.date;
     // push the event to this events object 
     dateChunk.events.push(e);
     // push the dateChunk to output
     output.push(dateChunk);
  }
  
  dataSortedByPrice.forEach(event => {
    const lastItemInOutput = output.slice(-1)[0];
    // if the final item in output does not exist
    if (!lastItemInOutput) {
      createAndPushDateChunk(event);
    } else { // if there is a lastItemInOuput
      // compare the date of lastItemInOuput to this event's date
      if (lastItemInOutput.date === event.date) {
        // if they are the same, push the event to events 
        lastItemInOutput.events.push(event);
      } else { // if they are not the same 
        createAndPushDateChunk(event);
      }
    }
  });
  console.log('output from sortByPriceAndGroupByDay:', output);
  return output;
}