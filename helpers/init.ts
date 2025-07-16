import { fetchBestArticle } from './api'
import { IBestUser } from './data.type';

const bestArticle: string[] =  fetchBestArticle()

const bestArticles = bestArticle.map((name, index) => ({
    id: index,      
    name: name,
    selected: false
}))

const dataVendeurs: IBestUser[] = [
    { id: '1', nom: 'Mike Thomas', ville: 'Antananarivo, Madagascar', imageSource: null, note: 4.6 },
    { id: '2', nom: 'Sarah Dubois', ville: 'Paris, France', imageSource: null, note: 4.8 },
    { id: '3', nom: 'John Williams', ville: 'New York, USA', imageSource: null, note: 4.5 },
    { id: '4', nom: 'Alice Dupont', ville: 'Bruxelles, Belgique', imageSource: null, note: 4.7 }
];

export {
    bestArticles,
    dataVendeurs
}