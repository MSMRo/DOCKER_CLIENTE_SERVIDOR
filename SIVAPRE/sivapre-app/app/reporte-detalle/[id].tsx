//[id].tsx
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const reportesMock: Record<string, any> = {
    '1': { id: '1', tipo_lugar: 'Vivienda', tipo_objeto: 'Baldes', estado: 'Resuelto', fecha: '20 Feb 2026', direccion: 'Jr. Los Pinos 234, SJL', larvas: 'Sí, claramente', dengue_cercano: 'No lo sé', comentarios: 'Había varios baldes con agua estancada en el patio.' },
    '2': { id: '2', tipo_lugar: 'Vía Pública', tipo_objeto: 'Llantas', estado: 'En Revisión', fecha: '18 Feb 2026', direccion: 'Av. Próceres 890, SJL', larvas: 'No estoy seguro', dengue_cercano: 'Sí', comentarios: '' },
    '3': { id: '3', tipo_lugar: 'Terreno Abandonado', tipo_objeto: 'Botellas', estado: 'Enviado', fecha: '15 Feb 2026', direccion: 'Ca. Las Flores 12, Ate', larvas: 'No', dengue_cercano: 'No', comentarios: 'Terreno con mucha basura acumulada.' },
    '4': { id: '4', tipo_lugar: 'Mercado', tipo_objeto: 'Canales', estado: 'Verificado', fecha: '10 Feb 2026', direccion: 'Mercado Central, Ate', larvas: 'Sí, claramente', dengue_cercano: 'Sí', comentarios: 'Canales bloqueados con agua acumulada.' },
    '5': { id: '5', tipo_lugar: 'Vivienda', tipo_objeto: 'Plantas', estado: 'Resuelto', fecha: '05 Feb 2026', direccion: 'Jr. Huáscar 567, VES', larvas: 'No estoy seguro', dengue_cercano: 'No', comentarios: '' },
};

const estadoColor: Record<string, string> = {
    Enviado: Colors.info,
    'En Revisión': Colors.warning,
    Verificado: Colors.accent,
    Resuelto: Colors.success,
};

export default function ReporteDetalle() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const reporte = reportesMock[id as string];

    if (!reporte) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.notFoundText}>Reporte no encontrado</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

            {/* Back */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color={Colors.primary} />
                <Text style={styles.backText}>Mis Reportes</Text>
            </TouchableOpacity>

            {/* Estado */}
            <View style={styles.estadoRow}>
                <Text style={styles.pageTitle}>Reporte #{reporte.id}</Text>
                <View style={[styles.estadoBadge, { backgroundColor: estadoColor[reporte.estado] }]}>
                    <Text style={styles.estadoText}>{reporte.estado}</Text>
                </View>
            </View>
            <Text style={styles.fecha}>{reporte.fecha}</Text>

            {/* Foto placeholder */}
            <View style={styles.fotoBox}>
                <Ionicons name="image-outline" size={48} color={Colors.textLight} />
                <Text style={styles.fotoText}>Foto del criadero</Text>
            </View>

            {/* Detalles */}
            <Text style={styles.sectionTitle}>Detalles del hallazgo</Text>

            <View style={styles.card}>
                <View style={styles.row}>
                    <Ionicons name="location-outline" size={18} color={Colors.primary} />
                    <View style={styles.rowContent}>
                        <Text style={styles.rowLabel}>Dirección</Text>
                        <Text style={styles.rowValue}>{reporte.direccion}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <Ionicons name="home-outline" size={18} color={Colors.primary} />
                    <View style={styles.rowContent}>
                        <Text style={styles.rowLabel}>Tipo de lugar</Text>
                        <Text style={styles.rowValue}>{reporte.tipo_lugar}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <Ionicons name="cube-outline" size={18} color={Colors.primary} />
                    <View style={styles.rowContent}>
                        <Text style={styles.rowLabel}>Tipo de objeto</Text>
                        <Text style={styles.rowValue}>{reporte.tipo_objeto}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <Ionicons name="eye-outline" size={18} color={Colors.primary} />
                    <View style={styles.rowContent}>
                        <Text style={styles.rowLabel}>¿Observaste larvas?</Text>
                        <Text style={styles.rowValue}>{reporte.larvas}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <Ionicons name="alert-circle-outline" size={18} color={Colors.primary} />
                    <View style={styles.rowContent}>
                        <Text style={styles.rowLabel}>¿Dengue cercano?</Text>
                        <Text style={styles.rowValue}>{reporte.dengue_cercano}</Text>
                    </View>
                </View>
                {reporte.comentarios ? (
                    <>
                        <View style={styles.divider} />
                        <View style={styles.row}>
                            <Ionicons name="chatbox-outline" size={18} color={Colors.primary} />
                            <View style={styles.rowContent}>
                                <Text style={styles.rowLabel}>Comentarios</Text>
                                <Text style={styles.rowValue}>{reporte.comentarios}</Text>
                            </View>
                        </View>
                    </>
                ) : null}
            </View>

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
    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundText: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: Colors.textLight,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 20,
    },
    backText: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: Colors.primary,
    },
    estadoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    pageTitle: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 24,
        color: Colors.text,
    },
    estadoBadge: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 8,
    },
    estadoText: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 12,
        color: Colors.white,
    },
    fecha: {
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        color: Colors.textLight,
        marginBottom: 20,
    },
    fotoBox: {
        backgroundColor: Colors.surface,
        borderRadius: 14,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        gap: 8,
    },
    fotoText: {
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        color: Colors.textLight,
    },
    sectionTitle: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 16,
        color: Colors.text,
        marginBottom: 12,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 14,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        paddingVertical: 10,
    },
    rowContent: {
        flex: 1,
    },
    rowLabel: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 12,
        color: Colors.textLight,
        marginBottom: 2,
    },
    rowValue: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: Colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
    },
});