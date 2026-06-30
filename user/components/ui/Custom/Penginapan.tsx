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

export default function HomeScreen() {
  // Data Kategori dengan Badge "Baru" pada Penginapan
  const categories = [
    { id: 1, name: 'Wisata Alam', icon: 'umbrella-beach', color: '#E8F4F8', iconColor: '#2B6CB0', isNew: false },
    { id: 2, name: 'Kuliner', icon: 'soup', color: '#FEF3E2', iconColor: '#D9A74A', type: 'font-awesome', isNew: false },
    { id: 3, name: 'Budaya', icon: 'theater-masks', color: '#FDF2F2', iconColor: '#C53030', isNew: false },
    { id: 4, name: 'Penginapan', icon: 'office-building', color: '#EBF1FA', iconColor: '#1A365D', type: 'material', isNew: true },
  ];

  // Data Hotel Terbaik (Horizontal Scroll)
  const bestHotels = [
    {
      id: 1,
      name: 'Novotel Lampung',
      rating: '4.9',
      price: 'Rp 950.000',
      image: require('../../../assets/images/novotel.jpg'), // Sesuaikan nama file di folder assets Anda
    },
    {
      id: 2,
      name: 'Radisson Bandar\nLampung',
      rating: '4.8',
      price: 'Rp 950.000',
      image: require('../../../assets/images/radisson.jpg'),
    },
  ];

  // Data Hotel Terdekat (Vertical List)
  const nearbyHotels = [
    {
      id: 1,
      name: 'Swiss-Belhotel Lampung',
      rating: '4.6',
      distance: '0.8 KM',
      price: 'Rp 950.000',
      image: require('../../../assets/images/swissbel.jpg'),
    },
    {
      id: 2,
      name: 'Swiss-Belinn Lampung',
      rating: '4.6',
      distance: '1.2 KM',
      price: 'Rp 350.000',
      image: require('../../../assets/images/swissbelinn.jpg'),
    },
  ];

  // Data Rekomendasi Wisata di bagian bawah
  const recommendations = [
    { id: 1, title: 'Pulau Pahawang', image: require('../../../assets/images/pulaupahawang.jpg') },
    { id: 2, title: 'Taman Nasional Way Kambas', image: require('../../../assets/images/pulaupahawang.jpg') }, // Ganti sesuai file waykambas Anda
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Halo, Petualang!</Text>
          <Image 
            source={require('../../../assets/images/icon.png')} // Menggunakan icon bawaan sebagai avatar sementara
            style={styles.avatar} 
          />
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <TextInput 
            placeholder="Cari hotel, resort, guest house..." 
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
          />
          <Ionicons name="search-outline" size={22} color="#1A365D" />
        </View>

        {/* CATEGORIES SECTION */}
        <View style={{ height: 110 }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((item) => (
              <TouchableOpacity key={item.id} style={styles.categoryCard}>
                <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
                  {item.type === 'font-awesome' ? (
                    <FontAwesome5 name="hamburger" size={22} color={item.iconColor} />
                  ) : item.type === 'material' ? (
                    <MaterialCommunityIcons name="office-building" size={24} color={item.iconColor} />
                  ) : (
                    <FontAwesome5 name={item.icon} size={20} color={item.iconColor} />
                  )}
                  
                  {/* Badge "Baru" untuk kategori Penginapan */}
                  {item.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>Baru</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.categoryLabel}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* SECTION 1: HOTEL TERBAIK */}
        <Text style={styles.sectionTitle}>Hotel Terbaik di Lampung</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.horizontalListContainer}
          snapToInterval={176}
          decelerationRate="fast"
        >
          {bestHotels.map((hotel) => (
            <ImageBackground 
              key={hotel.id} 
              source={hotel.image} 
              style={styles.hotelCard}
              imageStyle={{ borderRadius: 20 }}
            >
              {/* Tombol Heart / Favorit */}
              <TouchableOpacity style={styles.heartButton}>
                <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Info Hotel Overlay */}
              <View style={styles.hotelCardOverlay}>
                <View style={styles.inlineRating}>
                  <Ionicons name="star" size={14} color="#D9A74A" />
                  <Text style={styles.ratingText}>{hotel.rating}</Text>
                </View>
                <Text style={styles.hotelName} numberOfLines={2}>{hotel.name}</Text>
                <Text style={styles.priceSub}>Mulai dari</Text>
                <Text style={styles.priceText}>{hotel.price} <Text style={{fontWeight: 'normal', fontSize: 10}}>/ malam</Text></Text>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>

        {/* SECTION 2: TERDEKAT DARI KAMU */}
        <Text style={styles.sectionTitle}>Terdekat dari Kamu</Text>
        <View style={styles.verticalListContainer}>
          {nearbyHotels.map((hotel) => (
            <TouchableOpacity key={hotel.id} style={styles.nearbyRow}>
              <ImageBackground source={hotel.image} style={styles.nearbyThumb} imageStyle={{ borderRadius: 12 }}>
                {/* Badge Jarak */}
                <View style={styles.distanceBadge}>
                  <Ionicons name="location" size={10} color="#FFFFFF" />
                  <Text style={styles.distanceText}>{hotel.distance}</Text>
                </View>
              </ImageBackground>
              
              <View style={styles.nearbyInfo}>
                <Text style={styles.nearbyName}>{hotel.name}</Text>
                <View style={[styles.inlineRating, { marginBottom: 8 }]}>
                  <Ionicons name="star" size={14} color="#D9A74A" />
                  <Text style={[styles.ratingText, { color: '#4B5563' }]}>{hotel.rating}</Text>
                </View>
                <View style={styles.priceBadge}>
                  <Text style={styles.priceBadgeText}>{hotel.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* SECTION 3: REKOMENDASI UTAMA */}
        <Text style={styles.sectionTitle}>Rekomendasi Utama</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.horizontalListContainer}
        >
          {recommendations.map((item) => (
            <ImageBackground key={item.id} source={item.image} style={styles.miniRecCard} imageStyle={{ borderRadius: 12 }}>
              <View style={styles.miniCardOverlay}>
                <Text style={styles.miniCardTitle} numberOfLines={1}>{item.title}</Text>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>

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
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 48,
    marginHorizontal: 24,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    paddingTop: 15,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  newBadge: {
    position: 'absolute',
    top: -8,
    right: -6,
    backgroundColor: '#2B6CB0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 12,
  },
  horizontalListContainer: {
    paddingHorizontal: 24,
  },
  hotelCard: {
    width: 160,
    height: 220,
    marginRight: 16,
    justifyContent: 'space-between',
    padding: 12,
  },
  heartButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 6,
    borderRadius: 20,
  },
  hotelCardOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 12,
  },
  inlineRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  hotelName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  priceSub: {
    color: '#E5E7EB',
    fontSize: 9,
    marginTop: 4,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  verticalListContainer: {
    paddingHorizontal: 24,
  },
  nearbyRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    alignItems: 'center',
  },
  nearbyThumb: {
    width: 90,
    height: 80,
    justifyContent: 'flex-end',
    padding: 6,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A365D',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  distanceText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  nearbyInfo: {
    flex: 1,
    marginLeft: 16,
  },
  nearbyName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  priceBadge: {
    backgroundColor: '#1A365D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  priceBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  miniRecCard: {
    width: 140,
    height: 70,
    marginRight: 12,
    justifyContent: 'flex-end',
  },
  miniCardOverlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 6,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  miniCardTitle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingBottom: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#1A365D',
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    top: -10,
    width: 35,
    height: 3,
    backgroundColor: '#1A365D',
    borderRadius: 2,
  }
});