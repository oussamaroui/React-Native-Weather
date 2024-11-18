import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WHeader from '@/components/WHeader'


const TabOneScreen = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" />
      <WHeader />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

})

export default TabOneScreen;
