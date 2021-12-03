//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (adjusted for miles)
export const calcCrow = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = toRad(lat2-lat1);
    const dLon = toRad(lon2-lon1);
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1Rad) * Math.cos(lat2Rad); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c;
    return parseFloat((d * 0.621371).toFixed(2)); // converts to miles
}

// Converts numeric degrees to radians
export const toRad = (value) => value * Math.PI / 180;
