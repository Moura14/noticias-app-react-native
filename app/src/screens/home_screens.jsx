import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NewsRepository from '../api/news_repository';

const HomeScreen = ({navigation}) => {
  const [termo, setTermo] = useState('');
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);


   const noticiasEspecificas = async () => {
      if(!termo) return;
      try{
        setCarregando(true);
        setErro(null)
        const response = await NewsRepository.noticiasEspecificas(termo);

        if(response.length === 0){
          setErro('Nenhuma notícia encontrada.')
          setNoticias([])
        }else{
            setNoticias(response)
            setErro(null);
        }

        
        console.log(response)
      }catch(error){
        console.log('Erro ao buscar notícias: ', error.response || error)
      }finally{
        setCarregando(false)
      }
    }
    

  useEffect(() => {

   

    const buscarDados = async () => {
      try {
        const dados = await NewsRepository.getTopHeadLines();
        setNoticias(dados);
      } catch (e) {
        setErro('Não foi possível carregar as notícias. Tente novamente mais tarde');
        console.log(e);
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);




  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <View style={styles.inputWrapper}>
        <TextInput style={styles.input}
              placeholder='Pesquisar...'
              value={termo}
              onChangeText={setTermo}
              onSubmitEditing={noticiasEspecificas}
              >
              </TextInput>
      </View>
      </View>

      {carregando ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color="#0000ff" />
      </View>
    ) : erro ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{erro}</Text>
      </View>
    ) :
      <FlatList
        data={noticias}
        keyExtractor={(item, index) => item.url + index}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={() => navigation.navigate("DetalheNoticia", {url: item.url})}
          style={styles.card}>
            <Image source={{ uri: item.urlToImage }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },

  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    
  },

  input: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: 200,
    padding: 10
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;