const base_url = "https://newsapi.org/v2/";

export default {
  principaisManchetes: `${base_url}top-headlines?country=us`,
  noticiasEspecificas: (termo) => 
    `${base_url}everything?q=${encodeURIComponent(termo)}&language=pt`
};