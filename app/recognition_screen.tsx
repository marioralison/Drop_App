import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecognitionScreen() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nous avons besoin de votre permission pour utiliser la caméra</Text>
        <Button onPress={requestPermission} title="Accorder la permission" />
      </View>
    );
  }

  const takePictureAndRecognize = async () => {
    if (cameraRef.current && !isLoading) {
      setIsLoading(true);
      setResult('');
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true });

        if (!photo) {
            throw new Error('Photo non capturée');
        }
        
        const response = await fetch('http://10.95.73.195:5000/recognize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: `data:image/jpeg;base64,${photo.base64}`,
          }),
        });

        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }

        const data = await response.json();

        setResult(data.recognized ? 'Visage reconnu !' : data.message || 'Visage non reconnu.');

        if (data.recognized) {
            setTimeout(() => {
                router.push('/(tab)/wallet');
            }
            , 1000);
        }
        
      } catch (error) {
        console.error(error);
        setResult('Erreur de connexion au serveur.');
        
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePictureAndRecognize} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.text}>Reconnaître</Text>
          )}
        </TouchableOpacity>
      </View>
      {result ? <Text style={styles.resultText}>{result}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 64,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 50,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  resultText: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});