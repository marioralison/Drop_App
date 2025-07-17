
import { getValueFor } from "./store.access";
import { Dictionnaire, IBestUser, IComment, IPublication, IUser } from "./data.type";
import { IArticleTmp, ICommentTmp, IPostReactedByUser, IUserProfileTmp } from "./api";
import Toast from "react-native-toast-message";


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

function formatPubs(pubs: IArticleTmp[] | []): Omit<IPublication, "onCommentPress" | "checkComment">[] | []  {
  const somePubs: Omit<IPublication, "onCommentPress" | "checkComment">[] = []
  pubs.forEach((e,i) => {
    const tmp: Omit<IPublication, "onCommentPress" | "checkComment"> = {
        id: e.id,
        type: e.type,
        nomUtilisateur: e.user.firstname+" "+e.user.lastname,
        villeUtilisateur: e.user.region+", "+e.user.pays,
        datePublication: formatDateTime(e.create_at).date+"",
        heurePublication: formatDateTime(e.create_at).time+"",
        textePublication: e.description,
        imagePublicationSource: (e.image_url)? decodeHtmlEntities(e.image_url) : null,
        note: 4.9,
        nombreReactions: e._count.reaction,
        prix: e.unit_price+"",
        nombreCommentaires: e._count.comment,
        imageUtilisateurSource: (e.user.profile_url)? decodeHtmlEntities(e.user.profile_url) : null
    }
    somePubs.push(tmp);
  })
  return somePubs;
}

function formatComment(comments: ICommentTmp[] | []): IComment[] | [] {
  const formatedComment: IComment[] = [];
  comments.forEach((e,i) => {
    const tmp: IComment = {
      id: e.id,
      content: e.content,
      datePublication: formatDateTime(e.date+"").date+"",
      heurePublication: formatDateTime(e.date+"").time,
      user: {
        ...e.user,
        profile_url: (e.user.profile_url)? decodeHtmlEntities(e.user.profile_url) : null
      }
    }
    formatedComment.push(tmp);
  })
  return formatedComment;
}

function formatBestUser(someUser: IUserProfileTmp[] | []): IBestUser[] | [] {
  const usersFormated: IBestUser[] = [];
  someUser.forEach((e,i) => {
    const tmp: IBestUser = {
      id: e.id+"",
      nom: e.firstname+" "+e.lastname,
      ville: e.region+", "+e.pays,
      imageSource: (e.profile_url)? decodeHtmlEntities(e.profile_url) : null,
      note: 4.9
    }
    usersFormated.push(tmp);
})
  return usersFormated;
}

function formatPostReactedByUser(postReactedByUser: IPostReactedByUser[]): Dictionnaire<number, boolean> {
  const formated: Dictionnaire<number, boolean> = new Dictionnaire<number, boolean>();
  postReactedByUser.forEach((e,i) => {
    formated.addValue(e.id_post,true);
  })
  return formated;
}

function decodeHtmlEntities(text: string,ref: number = 0): string {
  const entities: { [key: string]: string } = {
    '&#x2F;': '/',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };

  if (!text){
    throw new Error("ref "+ref);
  }
  const url: string = text.replace(/&#x2F;|&amp;|&lt;|&gt;|&quot;|&#39;/g, match => entities[match] || match);
  return url;
}

export {
    checkRequiredPropriety,
    addPreferedArticle,
    getLocalValue,
    formatDateTime,
    formatPubs,
    formatBestUser,
    formatPostReactedByUser,
    formatComment,
    decodeHtmlEntities
}