import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

const SwipList = ({ boxData }) => {
  console.log(boxData, "--box");
  const flatListRef = useRef(null);
  const extractedImages = [];
  if (boxData.length > 0) {
    for (let i = 0; i < boxData.length; i++) {
      console.log(boxData[i].path, "---parth");
      extractedImages.push(boxData[i].path);
    }
    // }
  }

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = currentIndex === extractedImages.length - 1 ? 0 : currentIndex + 1;
        const itemWidth = wp(90) + wp(2);
        const offset = nextIndex * itemWidth;
        flatListRef.current.scrollToOffset({ offset, animated: true });
        currentIndex = nextIndex;
      }
    }, 3000); // Change the delay according to your needs

    return () => clearInterval(timer);
  }, [extractedImages]); // Listen for changes in boxData

  const renderItem = ({ item, index }) => {

    console.log(item, "=== ", index);
    return (
      <View style={styles.imageContainer}>
        <FastImage
          source={{
            uri: item, priority: FastImage.priority.high,
          }} style={styles.image} resizeMode='cover' />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={extractedImages}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          getItemLayout={(_, index) => ({
            length: wp(90), // Adjust this value based on your image width
            offset: wp(90) * index, // Adjust this value based on your image width
            index,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  image: {
    width: wp(90),
    height: hp(23),
    backgroundColor: '#000',
    marginHorizontal: wp(1),
    borderRadius: wp(6),

  },
  contentContainer: {
    paddingHorizontal: wp(4),
    borderRadius: wp(4),
  },
});

export default SwipList;
