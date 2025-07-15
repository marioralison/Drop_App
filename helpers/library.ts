
import { getValueFor } from "./store.access";
import { IUser } from "./data.type";


const checkRequiredPropriety = (user: Omit<IUser,"id">): boolean => {
    if (!user.firstname && !user.lastname && !user.region && !user.pays && !user.region && !user.email && !user.password) return false;
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

function formatDateTime(isoString: string) {
  const date = new Date(isoString);

  // Format de la date : "15 mai 2000"
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Format de l'heure : "09:00 am"
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return { date: formattedDate, time: formattedTime };
}


export {
    checkRequiredPropriety,
    addPreferedArticle,
    getLocalValue,
    formatDateTime
}