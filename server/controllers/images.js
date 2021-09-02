import { getTicketmasterImages } from './ticketmaster';

export const getTopEightConcertsOne = (req, res) => {
    const batchOne = ['the weeknd', 'maroon 5', 'harry styles', 'elton john'];
    const firstImageSet = batchOne.map(item => getTicketmasterImages(item));
    Promise.all(firstImageSet)
    .then(data => {
        console.log('top eight event images 1-4 call successful')
        res.send(data)
    })
    .catch(err => {
        console.log('error in first image batch call', err);
        res.send(500);
    })
}

export const getTopEightConcertsTwo = (req, res) => {
    const batchTwo = ['guns n roses', 'luke combs', 'korn', 'eagles'];
    const secondImageSet = batchTwo.map(item => getTicketmasterImages(item));
    Promise.all(secondImageSet)
    .then(data => {
        console.log('top eight event images 5-8 call successful')
        res.send(data)
    })
    .catch(err => {
        console.log('error in second image batch call', err);
        res.send(500);
    })
}

export const getTopEightSportsOne = (req, res) => {
    const batchTwo = ['New York Yankees', 'Los Angeles Dodgers', 'Dallas Cowboys', 'Milwaukee Bucks'];
    const secondImageSet = batchTwo.map(item => getTicketmasterImages(item));
    Promise.all(secondImageSet)
    .then(data => {
        console.log('top eight event images 5-8 call successful')
        res.send(data)
    })
    .catch(err => {
        console.log('error in second image batch call', err);
        res.send(500);
    })
}

export const getTopEightSportsTwo = (req, res) => {
    const batchTwo = ['Boston Red Sox', 'Los Angeles Lakers', 'New York Knicks', 'Miami Heat'];
    const secondImageSet = batchTwo.map(item => getTicketmasterImages(item));
    Promise.all(secondImageSet)
    .then(data => {
        console.log('top eight event images 5-8 call successful')
        res.send(data)
    })
    .catch(err => {
        console.log('error in second image batch call', err);
        res.send(500);
    })
}

export const getTopEightFestivalsOne = (req, res) => {
    const batchTwo = ['Coachella', 'EDC Vegas', 'Lollapalooza', 'SXSW'];
    const secondImageSet = batchTwo.map(item => getTicketmasterImages(item));
    Promise.all(secondImageSet)
    .then(data => {
        console.log('top eight event images 5-8 call successful')
        res.send(data)
    })
    .catch(err => {
        console.log('error in second image batch call', err);
        res.send(500);
    })
}

export const getTopEightFestivalsTwo = (req, res) => {
    const batchTwo = ['Pitchfork Music Festival', 'Austin City Limits', 'Ultra Music Festival', 'Governors Ball Music Festivals'];
    const secondImageSet = batchTwo.map(item => getTicketmasterImages(item));
    Promise.all(secondImageSet)
    .then(data => {
        console.log('top eight event images 5-8 call successful')
        res.send(data)
    })
    .catch(err => {
        console.log('error in second image batch call', err);
        res.send(500);
    })
}

export const getTopEightTheatreOne = (req, res) => {
    const batchTwo = ['Joe Rogan', 'Christmas Spectacular', 'Bill Burr', 'Sebastian Maniscalco'];
    const secondImageSet = batchTwo.map(item => getTicketmasterImages(item));
    Promise.all(secondImageSet)
    .then(data => {
        console.log('top eight event images 5-8 call successful')
        res.send(data)
    })
    .catch(err => {
        console.log('error in second image batch call', err);
        res.send(500);
    })
}

export const getTopEightTheatreTwo = (req, res) => {
    const batchTwo = ['John Mulaney', 'Hamilton', 'Dave Chappelle', 'Impractical Jokers'];
    const secondImageSet = batchTwo.map(item => getTicketmasterImages(item));
    Promise.all(secondImageSet)
    .then(data => {
        console.log('top eight event images 5-8 call successful')
        res.send(data)
    })
    .catch(err => {
        console.log('error in second image batch call', err);
        res.send(500);
    })
}

export const getSingleEventImage = (req, res) => {
    const keyword = req.query.keyword;
    return getTicketmasterImages(keyword)
    .then(data => {
        console.log('single image call successful');
        res.send(data);
    })
    .catch(err => {
        console.log('error in single image call', err);
        res.send(500);
    })
}