import React from 'react';
import { StyleSheet } from 'react-native';
import TestLogin from '../components/TestLogin';

export default function LinksScreen() {
  return (
    <TestLogin />
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
