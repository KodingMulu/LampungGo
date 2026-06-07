import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  ScrollView, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
export default function App() {
const categories = [
  { id: 1, name: 'Wisata Alam', icon: 'umbrella-beach', color: '#E8F4F8', iconColor: '#2B6CB0' },
  { id: 2, name: 'Kuliner', icon: 'soup', color: '#FEF3E2', iconColor: '#D9A74A', type: 'font-awesome' },
  { id: 3, name: 'Budaya', icon: 'theater-masks', color: '#FDF2F2', iconColor: '#C53030' },
  { id: 4, name: 'Penginapan', icon: 'office-building', color: '#F3F4F6', iconColor: '#4B5563', type: 'material' },
];

const recommendations = [
{
      id: 1,
      title: 'Pulau\nPahawang',
      rating: '4.8',
      image: require('./assets/pahawang.png'),
},

{
      id: 2,
      title: 'Way Kambas',
      rating: '4.7',
      image: require('./assets/waykambas.png'),
},
];

return (
    <SafeAreaView style={styles.container}>
      {/* MAIN CONTENT SCROLL VIEW */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}></ScrollView>

      {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Halo, Petualang!</Text>
          <Image 
            source={require('./assets/avatar.png')} // Ganti dengan avatar Anda
            style={styles.avatar} 
          />
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <TextInput 
            placeholder="Cari pantai, kuliner, budaya..." 
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
          />
          <Ionicons name="search-outline" size={22} color="#1A365D" />
        </View>

        {/* CATEGORIES SECTION */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((item) => (
            <TouchableOpacity key={item.id} style={styles.categoryCard}>
              <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
                {item.type === 'font-awesome' ? (
                  <FontAwesome5 name="hamburger" size={24} color={item.iconColor} />
                ) : item.type === 'material' ? (
                  <MaterialCommunityIcons name="office-building" size={24} color={item.iconColor} />
                ) : (
                  <FontAwesome5 name={item.icon} size={22} color={item.iconColor} />
                )}
              </View>
              <Text style={styles.categoryLabel}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* SECTION TITLE */}
        <Text style={styles.sectionTitle}>Rekomendasi Utama</Text>

        {/* CAROUSEL / RECOMMENDATION CARDS */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.recommendationList}
          snapToInterval={width * 0.65 + 16}
          decelerationRate="fast"
        >
          {recommendations.map((item) => (
            <ImageBackground 
              key={item.id} 
              source={item.image} 
              style={styles.recCard}
              imageStyle={{ borderRadius: 24 }}
            ></ImageBackground>
        
      );

}