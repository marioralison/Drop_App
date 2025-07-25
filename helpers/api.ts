import Toast from "react-native-toast-message";
import { getValueFor, save } from "./store.access";
import { Dictionnaire, IBestUser, IComment, IProduct, IPublication, IUser, IUserLogin, UserRole } from "./data.type";
import { decodeHtmlEntities, formatBestUser, formatComment, formatPostReactedByUser, formatPubs } from "./library";

const DROP_API_URL: string = "http://192.168.88.21:8080";

const fetchBestArticle = (): string[] => ['Pantalon',"Menteau","Jeans","Art","Chaussure","Pull","Capuche","Casquette","Chemise","Lunette"]

const signupUser = async (user: IUser): Promise<boolean> => {
    try {
        const newUser = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            tel: user.tel,
            pays: user.pays,
            role: user.role,
            product_preference: user.preference_product
        }
        const res = await fetch(DROP_API_URL+"/signup",{
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        if (!res.ok){
            Toast.show({
                type: "error",
                text2: data.message
            })
            return false;
        }
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "inscription réussi"
        })
        save("id",`${data.id}`);
        save("token",`${data.token}`);
        return true;
    } catch (error: any) {
        throw new error;
    }
}

const loginUser = async (user: IUserLogin): Promise<boolean> => {
    try {
        const res = await fetch(DROP_API_URL+"/login",{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await res.json();

        if (!res.ok){
            Toast.show({
                type: "error",
                text2: data.message
            })
            return false;
        }
        save("id",`${data.id}`);
        save("token",`${data.token}`);
        return true;
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "internal client error"
        })
        throw error;
    }
}

const authentificationUser = async (): Promise<Pick<IUser, "id" | "role" | "email"> | null> => {
    try {
        const id = await getValueFor("id");
        if (!id) return null;
        const res = await fetch(DROP_API_URL+"/auth",{
            method: "POST",
            credentials: "include"
        });
        const data = await res.json();

        if (!res.ok) return null
        const currentUser: Pick<IUser,"id" | "role" | "email"> = data as Pick<IUser,"id" | "role" | "email">
        return currentUser;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: error+""
        })
        throw error
    }
}

const getInfoById = async (token: string,id: string, saveThis: boolean = true): Promise<Omit<IUser, "password" | "confirmPassword"> | null> => {
    try {
        const res = await fetch(DROP_API_URL+`/user?id_user=${id}`,{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        const data = await res.json();

        if (!res.ok) {
            Toast.show({
                type: "error",
                text1: data.message+""
            });
            return null;
        }
        const user: Omit<IUser, "password" | "confirmPassword"> = data as Omit<IUser, "password" | "confirmPassword">;
        if (saveThis) await save("infoUser",JSON.stringify(user));
        return {...user, profile_url: (user.profile_url)? decodeHtmlEntities(user.profile_url) : null};
    } catch (error) {
        throw error;
    }
}

export interface IArticleTmp {
    id: number;
    type: string; // tu peux aussi utiliser un type enum: 'ARTICLE' | ...
    description: string;
    unit_price: number;
    stock: number;
    create_at: string; // ou `Date` si tu le convertis
    image_url: string;
    id_user: number;
    _count: {
      comment: number;
      reaction: number;
    };
    user: {
      firstname: string;
      lastname: string;
      region: string;
      pays: string;
      profile_url: string | null;
    };
}

const getPubs = async (count: number): Promise<Omit<IPublication,"onCommentPress" | "checkComment">[] | [] | null> => {
    try {
        const res = await fetch(DROP_API_URL+`/posts/${count}`,{
            method: "GET",
        });
        const data = await res.json();

        if (!res.ok) {
            Toast.show({
                type: "error",
                text1: data.message+""
            });
            return null;
        };
        const pubs: IArticleTmp[] = data as IArticleTmp[];
        return formatPubs(pubs);
    } catch (error) {
        Toast.show({
            type: "error",
            text1: error+""
        })
        throw error
    }
}

export interface IUserProfileTmp {
  id: number;
  firstname: string;
  lastname: string;
  region: string;
  pays: string;
  profile_url: string;
}

const getSomeUser = async (role: UserRole, start: number, end: number): Promise<IBestUser[] | [] | null> => {
    try {
        if (start > end) throw new Error(" the start must belower than end");
        const res = await fetch(DROP_API_URL+`/users/${role}/${start}/${end}`,{
            method: "GET",
        })
        const data = await res.json();
        if (!res.ok) {
            Toast.show({
                type: "error",
                text1: data.message+""
            })
            return null;
        }
        const users: IUserProfileTmp[] = data as IUserProfileTmp[];
        return formatBestUser(users);
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "error on get some user"
        })
        throw error
    }
}

const likeOrInlikePost = async (token: string, id_post: number): Promise<boolean> => {
    try {
        const res = await fetch(DROP_API_URL+`/post/reaction?id_post=${id_post}`,{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
        })
        const data = await res.json();
        if (!res.ok) {
            Toast.show({
                type: "error",
                text1: data.message
            })
            return false;
        }
        return true;
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "internal client error"
        })
        throw error
    }
}

export interface IPostReactedByUser {
    id_post: number
}

const getPostReactedByUser = async (id_user: number): Promise<Dictionnaire<number, boolean> | null> => {
    try {
        const res = await fetch(DROP_API_URL+`/post/?id_user=${id_user}`,{
            method: "GET"
        })
        const data = await res.json();

        if (!res.ok) {
            Toast.show({
                type: "error",
                text1: data.message
            })
            return null;
        }
        const notFormated: IPostReactedByUser[] = data as IPostReactedByUser[];
        return formatPostReactedByUser(notFormated)
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "internal client error"
        })
        throw error
    }
}

export interface ICommentTmp {
  id: number;
  content: string;
  date: Date; 
  user: Pick<IUser,"firstname" | "lastname" | "profile_url">;
}

const getAllComment = async (id_post: number, is_desc: boolean | undefined ): Promise<IComment[]> => {
    try {

        const res = await fetch(DROP_API_URL+`/comment/all/?id_post=${id_post}&is_desc=${is_desc}`,{
            method: "GET"
        })
        const data = await res.json();

        if (!res.ok) {
            Toast.show({
                type: "error",
                text1: data.message
            })
            return [];
        }
        const dataNotFormated: ICommentTmp[] = data as ICommentTmp[];
        return formatComment(dataNotFormated);
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "internal client error"
        })
        throw error
    }
}

const commentAPost = async (token: string, id_post: number, comment: { content: string }): Promise<boolean> => {
    try {
        const res = await fetch(DROP_API_URL+`/post/comment/?id_post=${id_post}`,{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        const data = await res.json();
        if (!res.ok) {
            Toast.show({
                type: "error",
                text1: data.message
            })
            return false;
        }
        return true;
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "internal client error"
        })
        throw error
    }
}

const getLocalProduct = async (country: string): Promise<IProduct[]> => {
    try {
        const res = await fetch(DROP_API_URL+`/posts/product/local/${country}`,{
            method: "GET",
        })
        const data = await res.json();
        if (!res.ok) {
            Toast.show({
                type: "error",
                text1: data.message
            })
            return [];
        }
        const product: IProduct[] = data as IProduct[];
        const decodedProduct: IProduct[] = product.map((p) => ({
            ...p, 
            description: decodeHtmlEntities(p.description),
            image_url: (p.image_url)? decodeHtmlEntities(p.image_url) : "",
            user: {
                ...p.user,
                profile_url: (p.user.profile_url) ? decodeHtmlEntities(p.user.profile_url) : null,
            } 
        }))
        return decodedProduct;
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "internal client error"
        })
        throw error
    }
}

const postAnnoce = async (annonce: string, token: string): Promise<boolean> => {
    const newAnnonce = {
        type: "SIMPLE_POST",
        description: annonce
    }
    try {
        const res = await fetch(DROP_API_URL+"/post/new",{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newAnnonce)
        })
        const data = await res.json();
        if (res.status != 202) {
            Toast.show({
                type: "error",
                text1: data.message
            })
            return false;
        }
        return true;
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "internal client error"
        })
        throw error
    }
}

export {
    signupUser,
    loginUser,
    fetchBestArticle,
    authentificationUser,
    getInfoById,
    getPubs,
    getSomeUser,
    likeOrInlikePost,
    getPostReactedByUser,
    getAllComment,
    getLocalProduct,
    commentAPost,
    postAnnoce
}
