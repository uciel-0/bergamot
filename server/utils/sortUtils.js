// On = Exists in whole and filterd set, Off = Does not exist in whole set, Greyed = Exists in set but not fitlered set  
export const vendorShadingState = (vendor, existsInWholeSet, existsInFilteredSet, vendorFilterState, isVendorFilterCall, isStatusFilterCall, isSliderCall, isCalendarCall) => {
  let shadingState = '';
  // RETURNS CHECKED, UNCHECKED, GREYED, OFF
  if (existsInWholeSet && existsInFilteredSet) {
    shadingState = 'CHECKED';
  } else if (existsInWholeSet && !existsInFilteredSet) {
    shadingState = 'UNCHECKED';
  } else if (!existsInFilteredSet) {
    shadingState = 'OFF';
  }
  console.log('vendorShadingState for', vendor, 'existsInWholeSet:', existsInWholeSet , 'shadingState:', shadingState, 'isStatusFilterCall:', isStatusFilterCall);
  return shadingState;
}

export const statusShadingState = (stateName, existsInSet, statusFilterFromFrontEnd) => {
  let shadingState = '';
  if (existsInSet) {
    shadingState = 'CHECKED';
  } else if (statusFilterFromFrontEnd === 'UNCHECKED') {
    shadingState = 'UNCHECKED';
  } else {
    shadingState = 'OFF'
  }
  console.log('status shading state for', stateName, existsInSet, statusFilterFromFrontEnd)
  return shadingState;
}
