import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SwipeCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSwipeRight = async (cardIndex) => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      const token = userInfo ? JSON.parse(userInfo).token : null;
      if (!token) {
        setError('Please log in to add items to your wishlist.');
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const product = products[cardIndex];
      await axios.post(`${API_URL}/api/wishlist/${product._id}`, {}, config);
    } catch (error) {
      setError(error.message);
    }
  };

  const renderCard = (card) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: card.image }} style={styles.image} />
        <Text style={styles.text}>{card.name}</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Swiper
      cards={products}
      renderCard={renderCard}
      onSwipedRight={handleSwipeRight}
      cardIndex={0}
      backgroundColor={'#4FD0E9'}
      stackSize={3}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});

export default SwipeCard;
