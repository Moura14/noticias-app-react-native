
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';

const DetalheNoticia = ({ route }) => {
  const { url } = route.params;

  return (
    <WebView
      source={{ uri: url }}
      startInLoadingState
      renderLoading={() => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    />
  );
};

export default DetalheNoticia;
