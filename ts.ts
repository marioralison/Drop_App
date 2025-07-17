
enum UserRole {
    SELLER="SELLER",
    BUYER="BUYER"
}

interface IUserLogin {
    email: string;
    password: string;
    role: UserRole
}

interface IUser extends IUserLogin {
    id: number;
    firstname: string;
    lastname: string;
    tel: string;
    region: string;
    pays: string;
    preference_product: string | null;
    adress: string | null;
    profile_url: string | null;
    code_postal: string | null;
    confirmPassword: string;
}

interface ICommentTmp {
  id: number;
  content: string;
  date: Date; 
  user: Pick<IUser,"firstname" | "lastname" | "profile_url">;
}

interface IComment {
    id: number;
    content: string;
    datePublication: string;
    heurePublication: string; 
    user: Pick<IUser,"firstname" | "lastname" | "profile_url">;
}

const DROP_API_URL: string = "http://localhost:8080";

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

function formatComment(comments: ICommentTmp[] | []): IComment[] | [] {
  const formatedComment: IComment[] = [];
  comments.forEach((e,i) => {
    // Toast.show({
    //   type:"info",
    //   text1: e.id+" profil: "+e.user.profile_url
    // })
    const tmp: IComment = {
      id: e.id,
      content: e.content,
      datePublication: formatDateTime(e.date+"").date+"",
      heurePublication: formatDateTime(e.date+"").time,
      user: {
        firstname: e.user.firstname,
        lastname: e.user.lastname,
        profile_url: e.user.profile_url
      }
    }
    formatedComment.push(tmp);
  })
  return formatedComment;
}

const getAllComment = async (id_post: number, is_desc: boolean | undefined ): Promise<IComment[]> => {
    try {

        const res = await fetch(DROP_API_URL+`/comment/all/?id_post=${id_post}&is_desc=${is_desc}`,{
            method: "GET"
        })
        const data = await res.json();

        if (!res.ok) {

            return [];
        }
        const dataNotFormated: ICommentTmp[] = data as ICommentTmp[]; 
        console.log(dataNotFormated);
        return formatComment(dataNotFormated);
    } catch (error) {
        throw error
    }
}

getAllComment(8,false);