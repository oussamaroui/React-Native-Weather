// // App.jsx
// import React, { useState } from 'react';
// import { View, Text, SafeAreaView } from 'react-native';
// import Header from './Header';
// import Sidebar from './Sidebar';

// const Layout = () => {
//     const [isSidebarVisible, setIsSidebarVisible] = useState(false);

//     const toggleSidebar = () => {
//         setIsSidebarVisible(!isSidebarVisible);
//     };

//     const closeSidebar = () => {
//         setIsSidebarVisible(false);
//     };

//     return (
//         <SafeAreaView className="flex-1 bg-white">
//             {/* Sidebar */}
//             <Sidebar isVisible={isSidebarVisible} onClose={closeSidebar} />

//             {/* Main Content Area */}
//             <View className="flex-1">
//                 {/* Header */}
//                 <Header toggleSidebar={toggleSidebar} />

//                 {/* Main Content */}
//                 <View className="p-4 bg-gray-100">
//                     <Text className="text-3xl font-bold">Welcome to My App</Text>
//                     <Text className="mt-4 text-lg">This is the main content area.</Text>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default Layout;
