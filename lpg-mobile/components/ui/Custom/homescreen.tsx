
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';

const wisataLampung = [
    { id: '1', name: 'Pulau Pahawang', location: 'Pesawaran, Lampung', image: 'https://picsum.photos/400/200?random=1' },
    { id: '2', name: 'Taman Nasional Way Kambas', location: 'Lampung Timur', image: 'https://picsum.photos/400/200?random=2' },
    { id: '3', name: 'Teluk Kiluan', location: 'Tanggamus, Lampung', image: 'https://picsum.photos/400/200?random=3' },
    { id: '4', name: 'Menara Siger', location: 'Bakauheni, Lampung Selatan', image: 'https://picsum.photos/400/200?random=4' },
];

export default function HomeScreen() { 
    const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardLocation}>{item.location}</Text>
</View>
 </TouchableOpacity>
 );


return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Jelajah Lampung</Text>
      <FlatList
        data={wisataLampung}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F9FC' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', margin: 20, color: '#333' },
    listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
});