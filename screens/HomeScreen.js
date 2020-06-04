import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

export const HomeScreen = ({ navigation }) => {

  const navigateDemographics = () => {
    navigation.navigate('Demographics');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='React Native Project' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateDemographics}>Open Demographics</Button>
      </Layout>
    </SafeAreaView>
  );
};