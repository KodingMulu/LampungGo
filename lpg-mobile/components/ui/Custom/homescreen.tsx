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
            >
              
              <View style={styles.cardGradient}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#D9A74A" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>

        {/* PAGINATION DOTS */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

      </ScrollView>

      {/* BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#1A365D" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          <View style={styles.activeIndicator} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="map-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Jelajah</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Simpan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    marginHorizontal: 24,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    marginTop: 25,
    height: 100,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
  },  
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 24,
    marginTop: 15,
    marginBottom: 15,
  },
  recommendationList: {
    paddingHorizontal: 24,
  },
  recCard: {
    width: width * 0.58,
    height: width * 0.78,
    marginRight: 16,
    justifyContent: 'flex-end',
  },
  cardGradient: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
    flex: 1,
    paddingRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
        
      
