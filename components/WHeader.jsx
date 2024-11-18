import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Picker } from '@react-native-picker/picker';
import axios from 'react-native-axios';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function WeatherHeader() {
    const [fontsLoaded] = useFonts({
        'Montserrat-SemiBold': require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    });

    const [weatherData, setWeatherData] = useState([]);
    const [selectedCity, setSelectedCity] = useState('Rabat');
    const [selectedCityWeather, setSelectedCityWeather] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const cityNames = ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier', 'Agadir', 'Tantan', 'Oujda'];

                const weatherDataPromises = cityNames.map((city) =>
                    axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city},MA&appid=5c0ae0614da0915d5c2020202869acb7`
                    )
                );

                const responses = await Promise.all(weatherDataPromises);
                const citiesWeatherList = responses.map((response) => ({
                    name: response.data.name,
                    temp: response.data.main.temp,
                    weather: response.data.weather[0].description,
                    icon: response.data.weather[0].icon,
                    country: response.data.sys.country,
                    humidity: response.data.main.humidity,
                    pressure: response.data.main.pressure,
                    windSpeed: response.data.wind.speed,
                    visibility: response.data.visibility,
                    feelsLike: response.data.main.feels_like,
                }));

                setWeatherData(citiesWeatherList);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    useEffect(() => {
        if (selectedCity) {
            const cityWeather = weatherData.find((city) => city.name === selectedCity);
            setSelectedCityWeather(cityWeather);
        }
    }, [selectedCity, weatherData]);

    if (!fontsLoaded) {
        return null;
    }

    const weatherDetails = [
        { key: 'You Feel', value: selectedCityWeather?.feelsLike ? `${Math.round(selectedCityWeather.feelsLike - 273.15)}°` : 'N/A' },
        { key: 'Humidity', value: selectedCityWeather?.humidity || 'N/A' },
        { key: 'Pressure', value: selectedCityWeather?.pressure || 'N/A' },
        { key: 'Wind Speed', value: selectedCityWeather?.windSpeed || 'N/A' },
        { key: 'Visibility', value: selectedCityWeather?.visibility || 'N/A' },
        { key: 'Feels Like', value: selectedCityWeather?.feelsLike || 'N/A' },
    ];

    return (
        <ImageBackground
            source={require('@/assets/images/bg.jpg')}
            style={styles.container}
        >
            <LinearGradient
                colors={['#00000075', 'transparent']}
                style={styles.gradientOverlay}
            />
            <View style={styles.nav}>
                <Text style={styles.logo}>Ouss Weather</Text>
                <Picker
                    selectedValue={selectedCity}
                    onValueChange={(itemValue) => setSelectedCity(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select City" value="" />
                    {weatherData.map((city, index) => (
                        <Picker.Item key={index} label={city.name} value={city.name} />
                    ))}
                </Picker>
            </View>
            <View style={{ marginTop: 10 }}>
                {
                    selectedCity && selectedCityWeather && selectedCityWeather.country &&
                    <Text style={styles.selectedCity}>
                        {selectedCity} &#x2022; {selectedCityWeather.country}
                    </Text>
                }
                {selectedCityWeather && (
                    <View style={styles.weatherInfo}>
                        <Text style={styles.temp}>
                            {Math.round(selectedCityWeather.temp - 273.15)}°
                        </Text>
                        <View style={styles.weatherDescriptionContainer}>
                            <Image
                                source={{
                                    uri: `https://openweathermap.org/img/wn/${selectedCityWeather.icon}@2x.png`,
                                }}
                                style={styles.weatherIcon}
                            />
                            <Text style={styles.weatherDescription}>
                                {selectedCityWeather.weather}
                            </Text>
                        </View>
                    </View>
                )}
            </View>

            {/* Weather Details */}

            <View style={styles.detailsContainer}>
                {weatherDetails.map((detail, index) => (
                    <BlurView key={index} intensity={10} tint="dark" style={styles.details}>
                        <Text style={styles.detailsKey}>{detail.key}</Text>
                        <Text style={styles.detailsValue}>{detail.value}</Text>
                    </BlurView>
                ))}
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        height: '40%',
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
    },
    logo: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        marginLeft: 15
    },
    picker: {
        width: '50%',
        color: 'white',
    },
    selectedCity: {
        color: 'white',
        zIndex: 2,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        textAlign: 'center',
    },
    weatherInfo: {
        marginTop: 4,
        display: 'flex',
        alignItems: 'center',
        zIndex: 2,
    },
    temp: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 70,
    },
    weatherDescriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -20
    },
    weatherDescription: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: 30,
        paddingTop: 6
    },
    weatherIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginTop: 50,
    },
    details: {
        width: '40%',
        height: '40%',
        marginBottom: 10,
        aspectRatio: 1 / 1,
        backgroundColor: '#09090935',
        borderWidth: 2,
        borderRadius: 25,
        borderColor: '#ffffff90',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsKey: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
    },
    detailsValue: {
        color: 'white',
        fontSize: 40,
        fontFamily: 'Montserrat-SemiBold',
    }
});
