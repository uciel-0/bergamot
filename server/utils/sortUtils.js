// On = Exists in whole and filterd set, Off = Does not exist in whole set, Greyed = Exists in set but not fitlered set  
export const vendorShadingState = (vendor, existsInWholeSet, existsInFilteredSet, vendorFilterState, isStatusFilterCall, isSliderCall, isCalendarCall) => {
  let shadingState = '';
  if ((existsInWholeSet && existsInFilteredSet) || (existsInWholeSet && isStatusFilterCall && vendorFilterState === 'GREYED')) {
    shadingState = 'ON';
  } else if ((existsInWholeSet && !existsInFilteredSet && isStatusFilterCall) || (existsInWholeSet && !existsInFilteredSet && isSliderCall) || (existsInWholeSet && !existsInFilteredSet && isCalendarCall) || vendorFilterState === 'GREYED') {
    shadingState = 'GREYED';
  } else if ((existsInWholeSet && !existsInFilteredSet) || vendorFilterState === 'FILTERED') {
    shadingState = 'FILTERED'
  } else if (!existsInWholeSet) {
    shadingState = 'OFF';
  }
  console.log('vendorShadingState for', vendor, shadingState, 'isStatusFilterCall', isStatusFilterCall);
  return shadingState;
}

export const statusShadingState = (stateName, existsInSet, statusFilterFromFrontEnd) => {
  let shadingState = '';
  if ((existsInSet && statusFilterFromFrontEnd === 'FILTERED') || statusFilterFromFrontEnd === 'FILTERED') {
    shadingState = 'FILTERED';
  } else if (!existsInSet && statusFilterFromFrontEnd === 'OFF' ) {
    shadingState = 'OFF';
  } else if (existsInSet) {
    shadingState = 'ON'
  }
  console.log('status shading state for', stateName, existsInSet, statusFilterFromFrontEnd)
  return shadingState;
}
