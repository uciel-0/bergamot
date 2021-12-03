import { getTicketmasterEventsNearYou } from "./ticketmaster";
import { getStubhubEventsNearYou } from "./stubhub";
import { getSeatgeekEventsNearYou } from "./seatgeek";
import {calcCrow} from '../utils/locationUtils';
import { normalizeLocalDate, formatLocalDate, formatTime, normalizeUTCDate } from "../utils/dateUtils";

export const getEventsNearYou = (req) => {
    const { lat, long, city, region, keyword } = req.query;
    const ticketmaster = getTicketmasterEventsNearYou(keyword, lat, long);
    const stubhub = getStubhubEventsNearYou(keyword, city, region);
    const seatgeek = getSeatgeekEventsNearYou(keyword, lat, long)
    return Promise.all([ticketmaster, stubhub, seatgeek])
    .then(data => {
        const ticketmaster = data[0];
        const stubhub = data[1];
        const seatgeek = data[2];
        // prepare the data 
        ticketmaster.forEach(e => {
            e.eventNearYou = true;
            // copypasted from search.js
            e.source = 'ticketmaster';
            e.sourceUrl = 'https://ticketmaster.com';
            e.status = e.dates.status.code;
            // combine the local date and time fields to create a local dateTime string - if no localtime, use start of day (00:00:00)
            e.datetime_local = normalizeLocalDate(e.dates.start.localDate + 'T' + (e.dates.start.localTime || '00:00:00'), e.dates.timezone);
            // if the datetime field exists, its already in UTC, use that one. Otherwise, get the UTC time from our computed datetime_local
            e.datetime_utc = e.dates.start.dateTime ? normalizeUTCDate(e.dates.start.dateTime) : normalizeUTCDate(e.datetime_local);
            e.date = formatLocalDate(e.datetime_local);
            e.time = e.dates.start.noSpecificTime ? 'No Specific Time' : formatTime(e.datetime_local);
            e.venueName = e._embedded.venues[0].name;
            e.venueCity = e._embedded.venues[0].city.name + ', ' + e._embedded.venues[0].state.stateCode;
            e.isPriceEstimated = false;
            e.name = e.name.trim();
    
            if (e.priceRanges) {
              e.priceBeforeFees = e.priceRanges[0].min;
              e.priceAfterFees = Math.round(e.priceRanges[0].min * 1.3);
              e.isPriceEstimated = true;
            } else {
              e.priceBeforeFees = null;
              e.priceAfterFees = null;
            }
        });
        // use stubhub event lat/long to determine distance from user 
        stubhub.forEach(e => {
            const venueLat = e.venue.latitude;
            const venueLong = e.venue.longitude;
            e.distance = calcCrow(lat, long, venueLat, venueLong);
            e.units = 'MILES';
            e.eventNearYou = true;
            // copypased from search.js
            e.source = 'stubhub';
            e.sourceUrl = 'https://stubhub.com';
            e.status = null;
            e.datetime_local = e.eventDateLocal;
            e.datetime_utc = normalizeUTCDate(e.eventDateUTC);
            e.date = formatLocalDate(e.eventDateLocal);
            e.time = !e.hideEventTime ? formatTime(e.eventDateUTC) : '';
            e.venueName = e.venue.name;
            e.venueCity = e.venue.city + ', ' + e.venue.state;
            e.priceBeforeFees = e.ticketInfo.minListPrice;
            e.priceAfterFees = e.ticketInfo.minPrice;
            e.isPriceEstimated = false;
            e.url = "https://www.stubhub.com/" + e.webURI;
            e.name = e.name.trim();
        });
        // use seatgeek event lat/long to determine distance from user
        seatgeek.forEach(e => {
            const venueLat = e.venue.location.lat;
            const venueLong = e.venue.location.lon;
            e.distance = calcCrow(lat, long, venueLat, venueLong);
            e.units = 'MILES';
            e.eventNearYou = true;
            // copy pasted from search.js
            e.source = 'seatgeek';
            e.sourceUrl = 'https://seatgeek.com';
            e.status = null;
            e.datetime_utc = e.date_tbd ? null : normalizeUTCDate(e.datetime_utc);
            e.datetime_local = e.datetime_tbd ? null : normalizeLocalDate(e.datetime_local, e.venue.timezone);
            e.date = e.date_tbd ? null : formatLocalDate(e.datetime_local);
            e.time = e.datetime_tbd ? null : formatTime(e.datetime_local);
            e.venueName = e.venue.name;
            e.venueCity = e.venue.display_location;
            e.name = e.title.trim();
            e.priceBeforeFees = e.stats.lowest_sg_base_price;
            e.priceAfterFees = e.stats.lowest_price;
            e.isPriceEstimated = false;
        });
        const events = [...ticketmaster, ...stubhub, ...seatgeek];
        // sort the entire set by distance from the user
        // then, of those 3 closest events, sort by date
        events.sort((a,b) => a.distance - b.distance);
        return events.slice(0, 3);
    })
    .catch(err => {
        console.log('error in events near you call', err);
        return []
    })
}