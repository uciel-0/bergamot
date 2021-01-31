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