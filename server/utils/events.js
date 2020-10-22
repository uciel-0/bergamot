import * as React from 'react';
import {ResultsGroup} from './Results'

const Data = () => {
    const [cards, setCards] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [cardsPerPage, setCardsPerPage] = React.useState(14);

    React.useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            const res = await ResultsGroup;
            setCards(res.Data);
            setLoading(false);
        }

        fetchCards();
    },[])

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfLastCard,indexOfLastCard);

    return (
        
    )
}