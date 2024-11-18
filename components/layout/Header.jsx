// Header.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
    return (
        <View className="bg-gray-800 p-4 flex-row justify-between items-center">
            <Text className="text-white text-xl font-bold">My App</Text>
            <TouchableOpacity onPress={toggleSidebar}>
                {/* <Menu size={24} color="white" /> */}
                <Text>HOH</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Header;
