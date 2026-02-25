import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const filtros = ['Todos', 'Enviado', 'En Revisión', 'Verificado', 'Resuelto'];

const estadoColor: Record<string, string> = {
    Enviado: Colors.info,
    'En Revisión': Colors.warning,
    Verificado: Colors.accent,
    Resuelto: Colors.success,
};

const estadoIcono: Record<string, string> = {
    Enviado: 'time-outline',
    'En Revisión': 'search-outline',
    Verificado: 'checkmark-circle-outline',
    Resuelto: 'checkmark-done-circle-outline',
};

const reportesMock = [
    { id: '1', tipo_lugar: 'Vivienda', tipo_objeto: 'Baldes', estado: 'Resuelto', fecha: '20 Feb 2026', direccion: 'Jr. Los Pinos 234, SJL' },
    { id: '2', tipo_lugar: 'Vía Pública', tipo_objeto: 'Llantas', estado: 'En Revisión', fecha: '18 Feb 2026', direccion: 'Av. Próceres 890, SJL' },
    { id: '3', tipo_lugar: 'Terreno Abandonado', tipo_objeto: 'Botellas', estado: 'Enviado', fecha: '15 Feb 2026', direccion: 'Ca. Las Flores 12, Ate' },
    { id: '4', tipo_lugar: 'Mercado', tipo_objeto: 'Canales', estado: 'Verificado', fecha: '10 Feb 2026', direccion: 'Mercado Central, Ate' },
    { id: '5', tipo_lugar: 'Vivienda', tipo_objeto: 'Plantas', estado: 'Resuelto', fecha: '05 Feb 2026', direccion: 'Jr. Huáscar 567, VES' },
];

export default function MisReportes() {
    const router = useRouter();
    const [filtroActivo, setFiltroActivo] = useState('Todos');

    const reportesFiltrados = filtroActivo === 'Todos'
        ? reportesMock
        : reportesMock.filter((r) => r.estado === filtroActivo);

    return (
        <View style={styles.container}>

            {/* Header stats */}
            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statNum}>{reportesMock.length}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={[styles.statNum, { color: Colors.success }]}>
                        {reportesMock.filter(r => r.estado === 'Resuelto').length}
                    </Text>
                    <Text style={styles.statLabel}>Resueltos</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={[styles.statNum, { color: Colors.warning }]}>
                        {reportesMock.filter(r => r.estado === 'En Revisión').length}
                    </Text>
                    <Text style={styles.statLabel}>En Revisión</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={[styles.statNum, { color: Colors.secondary }]}>
                        {reportesMock.filter(r => r.estado === 'Enviado').length}
                    </Text>
                    <Text style={styles.statLabel}>Enviados</Text>
                </View>
            </View>

            {/* Filtros */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtroScroll}
                contentContainerStyle={styles.filtroContainer}
            >
                {filtros.map((filtro) => (
                    <TouchableOpacity
                        key={filtro}
                        style={[styles.filtroChip, filtroActivo === filtro && styles.filtroChipActive]}
                        onPress={() => setFiltroActivo(filtro)}
                    >
                        <Text style={[styles.filtroText, filtroActivo === filtro && styles.filtroTextActive]}>
                            {filtro}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Lista */}
            <FlatList
                data={reportesFiltrados}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyBox}>
                        <Ionicons name="document-outline" size={48} color={Colors.textLight} />
                        <Text style={styles.emptyText}>No hay reportes en esta categoría</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push(`/reporte-detalle/${item.id}`)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.cardLeft}>
                            <View style={[styles.iconBox, { backgroundColor: estadoColor[item.estado] + '20' }]}>
                                <Ionicons
                                    name={estadoIcono[item.estado] as any}
                                    size={22}
                                    color={estadoColor[item.estado]}
                                />
                            </View>
                        </View>
                        <View style={styles.cardContent}>
                            <View style={styles.cardTopRow}>
                                <Text style={styles.cardTitulo}>{item.tipo_lugar} · {item.tipo_objeto}</Text>
                                <View style={[styles.estadoBadge, { backgroundColor: estadoColor[item.estado] }]}>
                                    <Text style={styles.estadoText}>{item.estado}</Text>
                                </View>
                            </View>
                            <Text style={styles.cardDireccion}>
                                <Ionicons name="location-outline" size={12} color={Colors.textLight} /> {item.direccion}
                            </Text>
                            <Text style={styles.cardFecha}>{item.fecha}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 8,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 10,
        paddingVertical: 10,
    },
    statNum: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 22,
        color: Colors.white,
    },
    statLabel: {
        fontFamily: 'Inter-Regular',
        fontSize: 11,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 2,
    },
    filtroScroll: {
        maxHeight: 56,
        marginVertical: 12,
    },
    filtroContainer: {
        paddingHorizontal: 20,
        gap: 8,
        alignItems: 'center',
    },
    filtroChip: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        backgroundColor: Colors.surface,
    },
    filtroChipActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    filtroText: {
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        color: Colors.textLight,
    },
    filtroTextActive: {
        fontFamily: 'Montserrat-ExtraBold',
        color: Colors.white,
    },
    lista: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 14,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    cardLeft: {
        marginRight: 12,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: {
        flex: 1,
        gap: 4,
    },
    cardTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    cardTitulo: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 13,
        color: Colors.text,
        flex: 1,
    },
    estadoBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    estadoText: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 10,
        color: Colors.white,
    },
    cardDireccion: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        color: Colors.textLight,
    },
    cardFecha: {
        fontFamily: 'Inter-Regular',
        fontSize: 11,
        color: Colors.textLight,
    },
    emptyBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        gap: 12,
    },
    emptyText: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: Colors.textLight,
    },
});