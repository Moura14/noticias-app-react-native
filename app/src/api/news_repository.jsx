import axios from 'axios';
import Constants from 'expo-constants';
import endpoints from '../utils/endpoint';


const API_KEY = Constants.expoConfig.extra.apiKey


const NewsRepository = {



    async getTopHeadLines(){
        try{
            const response = await axios.get(`${endpoints.principaisManchetes}&apiKey=${API_KEY}` );
            console.log(response.data)
            return response.data.articles
        }catch (error){
            console.log('Erro ao buscar principais manchestes: ', error.response)
            console.log(endpoints.principaisManchetes)
            console.log('Chave de API lida:', API_KEY);
            throw error;
        }
    },

    async noticiasEspecificas(termo){
        try{

            const url = `${endpoints.noticiasEspecificas(encodeURIComponent(termo))}&apiKey=${API_KEY}`
            const response = await axios.get(url)
            console.log(response.data.status)
            return response.data.articles
        }catch(error){
            console.log('Erro ao buscar noticias especificas', error.response)
            throw error
        }
    }
}

export default NewsRepository;