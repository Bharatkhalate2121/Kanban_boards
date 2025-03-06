import React from "react";
import { createContext, useState } from "react";

const ctx=createContext({});
function useData() {
    const [data, setData] = useState([{ id: 1, name: "Project 1", createdAt: "2021-09-01", updatedAt: "2021-09-01", st: 0 },
    { id: 2, name: "Project 2", createdAt: "2021-09-01", updatedAt: "2021-09-01", st: 0 },
    { id: 3, name: "Project 3", createdAt: "2021-09-01", updatedAt: "2021-09-01", st: 0 },
    { id: 4, name: "Project 4", createdAt: "2021-09-01", updatedAt: "2021-09-01", st: 0 },
    { id: 5, name: "Project 5", createdAt: "2021-09-01", updatedAt: "2021-09-01", st: 0 },

    ]);


    const [cardData, setCardData] = useState([
        {
            projectId: 1,
            column: [{
                columnId: 1,
                title: "To Do 1",
                cards: [
                    {
                        cardId: 1,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    },

                ]
            },
            {
                columnId: 2,
                title: "To Do 2",
                cards: [
                    {
                        cardId: 1,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    },
                    {
                        cardId: 2,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                ]
            },
            {
                columnId: 3,
                title: "To Do 3",
                cards: [
                    {
                        cardId: 1,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    },
                    {
                        cardId: 2,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                ]
            },
            {
                columnId: 4,
                title: "To Do 4",
                cards: [
                    {
                        cardId: 1,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    },
                    {
                        cardId: 2,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                ]
            }]
        },
        {
            projectId: 2,
            column: [{
                columnId: 1,
                title: "To Do 1",
                cards: [
                    {
                        cardId: 1,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    },

                ]
            },
            {
                columnId: 2,
                title: "To Do 2",
                cards: [
                    {
                        cardId: 1,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    },
                    {
                        cardId: 2,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                ]
            },
            {
                columnId: 3,
                title: "To Do 3",
                cards: [
                    {
                        cardId: 1,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    },
                    {
                        cardId: 2,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                ]
            },
            {
                columnId: 4,
                title: "To Do 4",
                cards: [
                    {
                        cardId: 1,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    },
                    {
                        cardId: 2,
                        title: "Bharat",
                        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                ]
            }]
        }
    ]);




    return { data, setData, cardData, setCardData }
}



export  {ctx, useData };


