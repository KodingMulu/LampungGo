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
      

    
},
];

}