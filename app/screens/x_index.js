import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '@/app/screens/HomeScreen';
import ProfileScreen from '@/app/screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <Drawer.Navigator>
            <Text>Test</Text>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}