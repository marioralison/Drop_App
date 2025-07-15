import { fetchBestArticle } from './api'

const bestArticle: string[] =  fetchBestArticle()

const bestArticles = bestArticle.map((name, index) => ({
    id: index,      
    name: name,
    selected: false
}))

export {
    bestArticles
}