import { getTicketmasterImages } from './ticketmaster';

export const getTopEightImagesOne = (req, res) => {
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

export const getTopEightImagesTwo = (req, res) => {
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