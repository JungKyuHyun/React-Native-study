import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function Empty() {
  return (
    <View style={styles.block}>
      <Image
        source={require('../assets/images/young_and_happy.png')} // 내부 이미지 사용 방법
        // source={{uri: 'https://via.placeholder.com/150'}} // 외부 이미지 사용 방법
        style={styles.image}
        // resizeMode="cover" // 기본값
        // resizeMode="center"
        // resizeMode="contain"
        // resizeMode="repeat"
        // resizeMode="stretch"
      />
      <Text style={styles.description}>할일이 없습니다!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 240,
    height: 179,
    marginBottom: 16,
    // ResizeMode test시에 주석 풀고 테스트
    // backgroundColor: 'gray',
  },
  description: {
    fontSize: 24,
    color: '#9e9e9e',
  },
});

export default Empty;
