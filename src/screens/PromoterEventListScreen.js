import React from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import EventBanner from '../components/EventBanner'

const PromoterEventListScreen = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <StatusBar barStyle={'dark-content'} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    {
                        tempEventsList.map(({ key, title, venueName, image }) => (
                            <EventBanner
                                key={key}
                                title={title}
                                onPress={() => navigation.navigate('PromoterInbox')}
                                venueName={venueName}
                                image={image} />
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default PromoterEventListScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    safeArea: {
        flex: 1
    }
})


const tempEventsList = [
    {
        key: 1,
        title: '20% Off!',
        venueName: "Harry's",
        image: "https://us.123rf.com/450wm/anton345/anton3451611/anton345161100032/68970620-happy-hour-new-vintage-headline-sign-design-with-a-banner-ribbon-for-text-vector-graphic-.jpg?ver=6"
    },
    {
        key: 2,
        title: 'Ladies Night',
        venueName: "Escape",
        image: "https://penji.co/wp-content/uploads/2019/04/the-break-free-bar-promotion.jpg"
    },
    {
        key: 3,
        title: 'Buy 2 get 1 free',
        venueName: "After8",
        image: "https://scontent.frgn3-1.fna.fbcdn.net/v/t1.0-9/1511351_799473976779158_2312664901347705447_n.jpg?_nc_cat=108&_nc_sid=2d5d41&_nc_ohc=BFb397z07VYAX-5hPY-&_nc_ht=scontent.frgn3-1.fna&oh=b597db719d2baddfbfb770c410bbf9b8&oe=5F758C32"
    },
    {
        key: 4,
        title: 'Free beer if team A wins',
        venueName: '50th Street',
        image: "https://upserve.com/media/sites/2/Superbowl-Refresh-Blog-Post-1100x600.jpg"
    }
]