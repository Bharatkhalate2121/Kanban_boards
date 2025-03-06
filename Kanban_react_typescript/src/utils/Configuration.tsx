import { createContext, useState } from "react";

// Define types for project and card structure
interface Card {
    cardId: number;
    title: string;
    content: string;
}

interface Column {
    columnId: number;
    title: string;
    cards: Card[];
}

interface Project {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    st: number;
}

interface ProjectData {
    projectId: number;
    column: Column[];
}

// Define the context type
interface ContextProps {
    data: Project[];
    setData: React.Dispatch<React.SetStateAction<Project[]>>;
    cardData: ProjectData[];
    setCardData: React.Dispatch<React.SetStateAction<ProjectData[]>>;
}


const ctx = createContext<ContextProps | null>(null);
function useData(): ContextProps {
    const [data, setData] = useState<Project[]>([
        { id: 1, name: "Project 1", createdAt: "2021-09-01", updatedAt: "2021-09-01", st: 0 },
        { id: 2, name: "Project 2", createdAt: "2021-09-01", updatedAt: "2021-09-01", st: 0 },
    ]);

    const [cardData, setCardData] = useState<ProjectData[]>([
        {
            projectId: 1,
            column: [
                {
                    columnId: 1,
                    title: "To Do 1",
                    cards: [{ cardId: 1, title: "Bharat", content: "Example content." }]
                },
                {
                    columnId: 2,
                    title: "To Do 2",
                    cards: [
                        { cardId: 1, title: "Bharat", content: "Example content." },
                        { cardId: 2, title: "Bharat", content: "Example content." }
                    ]
                }
            ]
        },
        {
            projectId: 2,
            column: [
                {
                    columnId: 1,
                    title: "To Do 1",
                    cards: [{ cardId: 1, title: "Bharat", content: "Example content." }]
                },
                {
                    columnId: 2,
                    title: "To Do 2",
                    cards: [
                        { cardId: 1, title: "Bharat", content: "Example content." },
                        { cardId: 2, title: "Bharat", content: "Example content." }
                    ]
                }
            ]
        }
    ]);

    return { data, setData, cardData, setCardData };
}

export { useData, ctx }; export type { ProjectData };

