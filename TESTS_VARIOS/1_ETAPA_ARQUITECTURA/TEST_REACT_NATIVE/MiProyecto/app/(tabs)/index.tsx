import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  Image as RNImage,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useGPS } from '@/hooks/useGPS';
import { enviarReporte, ReporteCiudadano } from '@/services/reporteService';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Función para generar UUID simple
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const TIPOS_LUGAR = [
  { label: 'Vivienda', value: 'vivienda' },
  { label: 'Parcialarios', value: 'parcialarios' },
  { label: 'Vía Pública', value: 'via_publica' },
  { label: 'Terreno Abandonado', value: 'terreno_abandonado' },
];

const TIPOS_OBJETO = [
  { label: 'Llantas', value: 'llantas' },
  { label: 'Plantas', value: 'plantas' },
  { label: 'Tachos', value: 'tachos' },
  { label: 'Otro', value: 'otro' },
];

const OPCIONES_SI_NO = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
];

const OPCIONES_DENGUE = [
  { label: 'Sí', value: 'si' },
  { label: 'Hace poco', value: 'hace_poco' },
  { label: 'No', value: 'no' },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { location, loading: gpsLoading, error: gpsError, getCurrentLocation } = useGPS();
  const [sending, setSending] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [fotoUrl, setFotoUrl] = useState<string>('');

  // Campos del formulario
  const [tipoLugar, setTipoLugar] = useState('vivienda');
  const [tiposObjeto, setTiposObjeto] = useState<string[]>([]);
  const [observaLarvas, setObservaLarvas] = useState('no');
  const [conocimientoDengue, setConocimientoDengue] = useState('no');
  const [comentarios, setComentarios] = useState('');

  const isDark = colorScheme === 'dark';

  const handleSelectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      setFotoUrl(result.assets[0].uri); // Por ahora usamos la URI local
    }
  };

  const handleCameraPhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      setFotoUrl(result.assets[0].uri);
    }
  };

  const toggleTipoObjeto = (value: string) => {
    setTiposObjeto((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleEnviarReporte = async () => {
    // Validaciones
    if (!location) {
      Alert.alert('Error', 'Por favor obtén tu ubicación GPS primero');
      return;
    }

    if (!fotoUrl) {
      Alert.alert('Error', 'Por favor selecciona una foto');
      return;
    }

    if (tiposObjeto.length === 0) {
      Alert.alert('Error', 'Por favor selecciona al menos un tipo de objeto');
      return;
    }

    // Preparar datos del reporte
    const ahora = new Date();
    const fechaReporte = ahora.toISOString().split('T')[0];
    const horaReporte = ahora.toTimeString().split(' ')[0];

    const reporte: ReporteCiudadano = {
      id_reporte_app: generateUUID(),
      latitud: location.latitude,
      longitud: location.longitude,
      fecha_reporte: fechaReporte,
      hora_reporte: horaReporte,
      foto_url: fotoUrl,
      tipo_lugar_criadero: tipoLugar,
      tipo_objeto_criadero: tiposObjeto,
      observa_larvas: observaLarvas,
      conocimiento_dengue_cercano: conocimientoDengue,
      comentarios_adicionales: comentarios,
      estado_reporte: 'pendiente',
    };

    try {
      setSending(true);
      const response = await enviarReporte(reporte);
      Alert.alert('✓ Éxito', `Reporte enviado. ID: ${response.id_db}`);
      
      // Limpiar formulario
      setPhotoUri(null);
      setFotoUrl('');
      setTipoLugar('vivienda');
      setTiposObjeto([]);
      setObservaLarvas('no');
      setConocimientoDengue('no');
      setComentarios('');
    } catch (error) {
      Alert.alert('Error', `No se pudo enviar el reporte: ${error}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          Reporte SIVAPRE
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Dengue - Reportes Ciudadanos
        </Text>
      </View>

      {/* SECCIÓN: UBICACIÓN GPS */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          📍 Ubicación Exacta
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={getCurrentLocation}
          disabled={gpsLoading}
        >
          {gpsLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Obtener Ubicación GPS</Text>
          )}
        </TouchableOpacity>

        {gpsError && (
          <Text style={[styles.errorText, { color: '#d32f2f' }]}>
            ⚠️ {gpsError}
          </Text>
        )}

        {location && (
          <View style={[styles.card, { backgroundColor: isDark ? '#333' : '#f5f5f5' }]}>
            <Text style={[styles.cardText, { color: isDark ? '#fff' : '#000' }]}>
              Latitud: {location.latitude.toFixed(6)}
            </Text>
            <Text style={[styles.cardText, { color: isDark ? '#fff' : '#000' }]}>
              Longitud: {location.longitude.toFixed(6)}
            </Text>
          </View>
        )}
      </View>

      {/* SECCIÓN: FOTO */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          📸 Foto del Criadero
        </Text>

        {photoUri && (
          <RNImage source={{ uri: photoUri }} style={styles.photoPreview} />
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.halfButton]} onPress={handleCameraPhoto}>
            <Text style={styles.buttonText}>Cámara</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.halfButton]} onPress={handleSelectPhoto}>
            <Text style={styles.buttonText}>Galería</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SECCIÓN: TIPO DE LUGAR */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          🏠 ¿Dónde se encuentra el criadero?
        </Text>
        {TIPOS_LUGAR.map((tipo) => (
          <TouchableOpacity
            key={tipo.value}
            style={[
              styles.radioButton,
              tipoLugar === tipo.value && styles.radioButtonSelected,
              { backgroundColor: isDark ? '#333' : '#f5f5f5' },
            ]}
            onPress={() => setTipoLugar(tipo.value)}
          >
            <View
              style={[
                styles.radioCircle,
                tipoLugar === tipo.value && styles.radioCircleSelected,
              ]}
            />
            <Text style={[styles.radioLabel, { color: isDark ? '#fff' : '#000' }]}>
              {tipo.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SECCIÓN: TIPO DE OBJETO */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          💧 ¿Qué tipo de objeto es el sitio con agua?
        </Text>
        <Text style={[styles.description, { color: isDark ? '#aaa' : '#666' }]}>
          Selecciona todos los que apliquen
        </Text>
        {TIPOS_OBJETO.map((tipo) => (
          <TouchableOpacity
            key={tipo.value}
            style={[
              styles.checkbox,
              tiposObjeto.includes(tipo.value) && styles.checkboxSelected,
              { backgroundColor: isDark ? '#333' : '#f5f5f5' },
            ]}
            onPress={() => toggleTipoObjeto(tipo.value)}
          >
            <View
              style={[
                styles.checkboxBox,
                tiposObjeto.includes(tipo.value) && styles.checkboxBoxSelected,
              ]}
            >
              {tiposObjeto.includes(tipo.value) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={[styles.checkboxLabel, { color: isDark ? '#fff' : '#000' }]}>
              {tipo.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SECCIÓN: LARVAS */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          🦟 ¿Observas larvas en el agua?
        </Text>
        {OPCIONES_SI_NO.map((opcion) => (
          <TouchableOpacity
            key={opcion.value}
            style={[
              styles.radioButton,
              observaLarvas === opcion.value && styles.radioButtonSelected,
              { backgroundColor: isDark ? '#333' : '#f5f5f5' },
            ]}
            onPress={() => setObservaLarvas(opcion.value)}
          >
            <View
              style={[
                styles.radioCircle,
                observaLarvas === opcion.value && styles.radioCircleSelected,
              ]}
            />
            <Text style={[styles.radioLabel, { color: isDark ? '#fff' : '#000' }]}>
              {opcion.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SECCIÓN: DENGUE */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          🏥 ¿Conoces casos de Dengue cercanos?
        </Text>
        {OPCIONES_DENGUE.map((opcion) => (
          <TouchableOpacity
            key={opcion.value}
            style={[
              styles.radioButton,
              conocimientoDengue === opcion.value && styles.radioButtonSelected,
              { backgroundColor: isDark ? '#333' : '#f5f5f5' },
            ]}
            onPress={() => setConocimientoDengue(opcion.value)}
          >
            <View
              style={[
                styles.radioCircle,
                conocimientoDengue === opcion.value && styles.radioCircleSelected,
              ]}
            />
            <Text style={[styles.radioLabel, { color: isDark ? '#fff' : '#000' }]}>
              {opcion.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SECCIÓN: COMENTARIOS */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          📝 Comentarios Adicionales (Opcional)
        </Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: isDark ? '#333' : '#f5f5f5',
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? '#555' : '#ddd',
            },
          ]}
          placeholder="Escriba cualquier detalle adicional..."
          placeholderTextColor={isDark ? '#888' : '#999'}
          multiline
          numberOfLines={4}
          value={comentarios}
          onChangeText={setComentarios}
        />
      </View>

      {/* BOTÓN DE ENVÍO */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.submitButton, sending && styles.submitButtonDisabled]}
          onPress={handleEnviarReporte}
          disabled={sending}
        >
          {sending ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <Text style={styles.submitButtonText}>Enviar Reporte</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#1976d2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 12,
    marginBottom: 12,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  cardText: {
    fontSize: 13,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  halfButton: {
    flex: 1,
  },
  photoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ddd',
  },
  radioButtonSelected: {
    borderColor: '#1976d2',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 12,
  },
  radioCircleSelected: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ddd',
  },
  checkboxSelected: {
    borderColor: '#1976d2',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxSelected: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 12,
    marginTop: 8,
  },
});
