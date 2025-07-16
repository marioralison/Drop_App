import { fetchBestArticle } from './api'
import { IBestUser } from './data.type';

const bestArticle: string[] =  fetchBestArticle()

const bestArticles = bestArticle.map((name, index) => ({
    id: index,      
    name: name,
    selected: false
}))

export {
    bestArticles,
}