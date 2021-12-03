import { getTicketmasterImages } from './ticketmaster';

export const getArrayOfImages = (req, res) => {
    const batch = req.query.subjects.split(',');
    const secondImageSet = batch.map(item => getTicketmasterImages(item));
    Promise.all(secondImageSet)
    .then(data => {
        console.log('images call successful')
        res.send(data)
    })
    .catch(err => {
        console.log('error in image batch call', err);
        res.send(500);
    })  
}