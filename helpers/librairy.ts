import { bestArticle } from "./init";
import { IUser } from "./users.type";


const bestArticles = bestArticle.map((name, index) => ({
        id: index,      
        name: name,
        selected: false
}))

const checkRequiredPropriety = (user: Omit<IUser,"id">): boolean => {
    if (!user.firstname && !user.lastname && !user.region && !user.country && !user.phone && !user.email && !user.password) return false;
    if (user.password != user.confirmPassword) return false;
    return true;
}

const addPreferedArticle = (articles: {id: number,name: string,selected: boolean}[],user: IUser): IUser => {
    const selectedArtcles = articles.filter((article) => article.selected).map((article) => article.name);
    const newUser = {...user,preference_product: JSON.stringify(selectedArtcles)}
    return newUser;
}


export {
    bestArticles,
    checkRequiredPropriety,
    addPreferedArticle
}