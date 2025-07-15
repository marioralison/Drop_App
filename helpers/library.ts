
import { getValueFor } from "./store.access";
import { IUser } from "./user.type";


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

const getLocalValue = async (key: string): Promise<string | null> => {
    try {
        const token = await getValueFor(key);
        return (token) ? token: null;
    } catch (error) {
        console.error("Error on getToken",error);
        return null
    }
}

export {
    checkRequiredPropriety,
    addPreferedArticle,
    getLocalValue
}