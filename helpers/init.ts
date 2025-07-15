import { fetchBestArticle } from './api'
import { IPublication } from './data.type'

const bestArticle: string[] =  fetchBestArticle()

const bestArticles = bestArticle.map((name, index) => ({
    id: index,      
    name: name,
    selected: false
}))

const publications: IPublication[] = [
    {
        id: 1,
        nomUtilisateur: "Lisa Moore",
        villeUtilisateur: "Californie, USA",
        datePublication: "02 Janv",
        heurePublication: "14:30 pm",
        textePublication: "Chaussure en cuir, fabriqué en tissu fin",
        imagePublicationSource: require("../app/assets/images/shoes.png"),
        note: 4.6,
        nombreReactions: 24,
        prix: "$45.32",
        nombreCommentaires: 15,
        imageUtilisateurSource: require("../app/assets/icons/userWoman.png"),
    },
    {
        id: 2,
        nomUtilisateur: "John Doe",
        villeUtilisateur: "New York, USA",
        datePublication: "15 Mai",
        heurePublication: "09:00 am",
        textePublication: "Superbe tasse à café en céramique",
        imagePublicationSource: require("../app/assets/images/agraffeuse.png"),
        note: 4.9,
        nombreReactions: 35,
        prix: "$12.99",
        nombreCommentaires: 8,
        imageUtilisateurSource: require("../app/assets/icons/user.png"),
    }
]

export {
    bestArticles,
    publications
}