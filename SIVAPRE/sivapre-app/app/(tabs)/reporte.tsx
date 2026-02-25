import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const tiposLugar = ['Vivienda', 'Vía Pública', 'Terreno Abandonado', 'Mercado', 'Colegio', 'Otro'];
const tiposObjeto = ['Llantas', 'Baldes', 'Plantas', 'Botellas', 'Canales', 'Otro'];
const opcionesLarvas = ['Sí, claramente', 'No estoy seguro', 'No'];
const opcionesDengue = ['Sí', 'No lo sé', 'No'];

export default function Reporte() {
    const [tipoLugar, setTipoLugar] = useState('');
    const [tipoObjeto, setTipoObjeto] = useState('');
    const [larvas, setLarvas] = useState('');
    const [dengueCercano, setDengueCercano] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [fotoUri, setFotoUri] = useState<string | null>(null);
    const [ubicacionObtenida, setUbicacionObtenida] = useState(false);

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

            <Text style={styles.pageTitle}>Nuevo Reporte</Text>
            <Text style={styles.pageSubtitle}>Completa el formulario en menos de 60 segundos</Text>

            {/* Foto */}
            <Text style={styles.sectionLabel}>1. Evidencia fotográfica</Text>
            <TouchableOpacity style={styles.photoBox}>
                {fotoUri ? (
                    <Image source={{ uri: fotoUri }} style={styles.photoPreview} />
                ) : (
                    <View style={styles.photoPlaceholder}>
                        <Ionicons name="camera-outline" size={36} color={Colors.textLight} />
                        <Text style={styles.photoText}>Toca para tomar una foto</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Ubicación */}
            <Text style={styles.sectionLabel}>2. Ubicación del criadero</Text>
            <TouchableOpacity
                style={[styles.locationButton, ubicacionObtenida && styles.locationButtonActive]}
                onPress={() => setUbicacionObtenida(true)}
            >
                <Ionicons
                    name={ubicacionObtenida ? 'location' : 'location-outline'}
                    size={20}
                    color={ubicacionObtenida ? Colors.white : Colors.primary}
                />
                <Text style={[styles.locationText, ubicacionObtenida && styles.locationTextActive]}>
                    {ubicacionObtenida ? '✓ Ubicación capturada automáticamente' : 'Capturar mi ubicación GPS'}
                </Text>
            </TouchableOpacity>

            {/* Tipo de lugar */}
            <Text style={styles.sectionLabel}>3. Tipo de lugar</Text>
            <View style={styles.chipGroup}>
                {tiposLugar.map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[styles.chip, tipoLugar === item && styles.chipActive]}
                        onPress={() => setTipoLugar(item)}
                    >
                        <Text style={[styles.chipText, tipoLugar === item && styles.chipTextActive]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tipo de objeto */}
            <Text style={styles.sectionLabel}>4. Tipo de objeto</Text>
            <View style={styles.chipGroup}>
                {tiposObjeto.map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[styles.chip, tipoObjeto === item && styles.chipActive]}
                        onPress={() => setTipoObjeto(item)}
                    >
                        <Text style={[styles.chipText, tipoObjeto === item && styles.chipTextActive]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Presencia de larvas */}
            <Text style={styles.sectionLabel}>5. ¿Observas larvas?</Text>
            <View style={styles.chipGroup}>
                {opcionesLarvas.map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[styles.chip, larvas === item && styles.chipActive]}
                        onPress={() => setLarvas(item)}
                    >
                        <Text style={[styles.chipText, larvas === item && styles.chipTextActive]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Dengue cercano */}
            <Text style={styles.sectionLabel}>6. ¿Conoces casos de dengue cerca?</Text>
            <View style={styles.chipGroup}>
                {opcionesDengue.map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[styles.chip, dengueCercano === item && styles.chipActive]}
                        onPress={() => setDengueCercano(item)}
                    >
                        <Text style={[styles.chipText, dengueCercano === item && styles.chipTextActive]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Comentarios */}
            <Text style={styles.sectionLabel}>7. Comentarios adicionales (opcional)</Text>
            <TextInput
                style={styles.textArea}
                placeholder="Describe lo que observas..."
                placeholderTextColor={Colors.textLight}
                multiline
                numberOfLines={4}
                value={comentarios}
                onChangeText={setComentarios}
            />

            {/* Botón enviar */}
            <TouchableOpacity style={styles.submitButton}>
                <Ionicons name="send-outline" size={18} color={Colors.white} />
                <Text style={styles.submitButtonText}>ENVIAR REPORTE</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    pageTitle: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 24,
        color: Colors.text,
        marginBottom: 4,
    },
    pageSubtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        color: Colors.textLight,
        marginBottom: 28,
    },
    sectionLabel: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 13,
        color: Colors.text,
        marginBottom: 10,
        marginTop: 8,
    },
    photoBox: {
        backgroundColor: Colors.surface,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        height: 180,
        marginBottom: 20,
        overflow: 'hidden',
    },
    photoPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    photoText: {
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        color: Colors.textLight,
    },
    photoPreview: {
        width: '100%',
        height: '100%',
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 20,
        backgroundColor: Colors.surface,
    },
    locationButtonActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    locationText: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: Colors.primary,
    },
    locationTextActive: {
        color: Colors.white,
    },
    chipGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        backgroundColor: Colors.surface,
    },
    chipActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    chipText: {
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        color: Colors.textLight,
    },
    chipTextActive: {
        color: Colors.white,
        fontFamily: 'Montserrat-ExtraBold',
    },
    textArea: {
        backgroundColor: Colors.surface,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: Colors.text,
        textAlignVertical: 'top',
        marginBottom: 28,
        minHeight: 100,
    },
    submitButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 16,
        borderRadius: 14,
    },
    submitButtonText: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 15,
        color: Colors.white,
        letterSpacing: 1,
    },
});