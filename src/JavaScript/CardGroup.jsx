import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function CardGroup() {
    let cardType = ["Pasado", "Presente", "Futuro"]
    let [selectedCards, setSelectedCards] = useState([])
    let api = `https://6388b6e5a4bb27a7f78f96a5.mockapi.io/sakura-cards`
    let navigate = useNavigate()

    function getRandomInt(max) {
        return Math.floor(Math.random() * (max - 1))
    }

    

    function changeImg(arr) {
        let newArr = []
        arr.forEach(element => {
            element.clowCard = (!element.clowCard)? element.sakuraCard : element.clowCard;
            newArr.push(element)
        });
        return newArr
    }

    useEffect(() => {
        function compareNumbers(randomInt, dataArr, data) {
            return dataArr.includes(data[randomInt]) ? compareNumbers(getRandomInt(data.length), dataArr, data) : randomInt
        }
        (async function getData() {
            let response = await fetch(api)
            let data = await response.json()
            let dataArr = []
            for (let i = 0; i < 3; i++) {
                let randomInt = getRandomInt(data.length)
                dataArr.push(data[compareNumbers(randomInt, dataArr, data)])
            }
            dataArr = changeImg(dataArr)
            setSelectedCards(dataArr)
        })()
    }, [api])

    useEffect(() => {
        window.onload = function() {
            navigate("/")
        };
    }, [navigate]);


    return (
        <div className='main-cardGroup'>
            {selectedCards.map((item, index) =>
                <React.Fragment key={index}>
                    <Card item={item} name={item.spanishName} meaning={item.meaning} image={item.clowCard} cardType={cardType[index]} />
                </React.Fragment>
            )}

        </div>
    )
}

export default CardGroup
