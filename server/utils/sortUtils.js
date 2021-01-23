    // On = Exists in whole and filterd set, Off = Does not exist in whole set, Greyed = Exists in set but not fitlered set  
    export const vendorShadingState = (existsInWholeSet, existsInFilteredSet, vendorFilterState) => {
        let shadingState = '';
        if (existsInWholeSet && existsInFilteredSet) {
          shadingState = 'ON';
        } else if (vendorFilterState === 'FILTERED') {
          shadingState = 'FILTERED'
        } else if (existsInWholeSet && !existsInFilteredSet) {
          shadingState = 'GREYED';
        } else if (!existsInWholeSet) {
          shadingState = 'OFF';
        }
        return shadingState;
      }
      // HIGH and LOW of whole set need to be sent with every cache call 
      // EARLIEST and LATEST of whole set need to be sent with every cache call 
      // these variables will go into the components in their range props 
      // filtration state indicators 