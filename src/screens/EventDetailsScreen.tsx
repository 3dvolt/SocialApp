import {
    AppText,
    Spacer,
} from "@app/components";
import {
    MainContainer,
} from "@app/containers";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomScreensParamsList } from "@app/types";
import { Colors } from "@app/utils";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
    RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface DanceEvent {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    imageUri: string;
    award: string;
    registrationFee: string;
    rating: number;
    feedback: string;
    participantImages: string[];
}

type Props = BottomTabScreenProps<BottomScreensParamsList, "EventsScreen">;

function EventsScreen({ navigation }: Props): JSX.Element {
    const [events, setEvents] = useState<DanceEvent[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    // Mock data - replace with actual API call
    const mockEvents: DanceEvent[] = [
        {
            id: "1",
            title: "ALL STYLES BATTLE",
            date: "14 June 2025",
            location: "Milano, Italy",
            description: "The ultimate dance battle featuring all dance styles. Compete with the best dancers from around the world!",
            imageUri: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400",
            award: "500€",
            registrationFee: "20€",
            rating: 5,
            feedback: "The last year was crazy!! Can't wait for this here common everybody!",
            participantImages: [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                "https://images.unsplash.com/photo-1494790108755-2616b612b691?w=100",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
            ]
        },
        {
            id: "2",
            title: "STREET DANCE CHAMPIONSHIP",
            date: "28 June 2025",
            location: "Roma, Italy",
            description: "Street dance competition with categories for breaking, popping, and locking. Show your street style!",
            imageUri: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400",
            award: "300€",
            registrationFee: "15€",
            rating: 4,
            feedback: "Amazing energy and great organization. The competition was fierce!",
            participantImages: [
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
            ]
        },
        {
            id: "3",
            title: "LATIN DANCE FESTIVAL",
            date: "05 July 2025",
            location: "Napoli, Italy",
            description: "Celebrate Latin rhythms with salsa, bachata, and reggaeton competitions. Bring the heat!",
            imageUri: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
            award: "400€",
            registrationFee: "25€",
            rating: 5,
            feedback: "Incredible atmosphere! The music and dancing were absolutely perfect.",
            participantImages: [
                "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100",
            ]
        }
    ];

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        // Replace with actual API call
        setEvents(mockEvents);
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadEvents();
        setRefreshing(false);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Ionicons
                key={index}
                name={index < rating ? "star" : "star-outline"}
                size={16}
                color="#FFD700"
                style={{ marginRight: 2 }}
            />
        ));
    };

    const renderParticipantImages = (images: string[]) => {
        return (
            <View style={styles.participantContainer}>
                {images.slice(0, 5).map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={[
                            styles.participantImage,
                            { marginLeft: index > 0 ? -10 : 0 }
                        ]}
                    />
                ))}
                {images.length > 5 && (
                    <View style={[styles.participantImage, styles.moreParticipants]}>
                        <AppText style={styles.moreText}>+{images.length - 5}</AppText>
                    </View>
                )}
            </View>
        );
    };

    const renderEventCard = ({ item }: { item: DanceEvent }) => (
        <TouchableOpacity
            style={styles.eventCard}
            onPress={() => {
                // Navigate to event details
                console.log("Navigate to event:", item.id);
            }}
        >
            <ImageBackground
                source={{ uri: item.imageUri }}
                style={styles.eventImage}
                imageStyle={styles.eventImageStyle}
            >
            </ImageBackground>

            <View style={styles.eventContent}>
                <AppText poppinsBold size={24} style={styles.eventTitle}>
                    {item.title}
                </AppText>

                <AppText poppinsRegular size={16} style={styles.eventDate}>
                    {item.date}
                </AppText>

                <Spacer value={8} />

                <AppText poppinsBold size={18} style={styles.award}>
                    Award {item.award}
                </AppText>

                <Spacer value={8} />

                <View style={styles.participationRow}>
                    <AppText poppinsRegular size={14} style={styles.participationText}>
                        How to participate?
                    </AppText>
                </View>

                <AppText poppinsBold size={16} style={styles.registrationFee}>
                    {item.registrationFee} online registration
                </AppText>

                <Spacer value={16} />

                <AppText poppinsRegular size={14} style={styles.feedbackTitle}>
                    User feedback
                </AppText>

                <View style={styles.ratingRow}>
                    {renderStars(item.rating)}
                    <AppText poppinsRegular size={14} style={styles.feedbackText}>
                        {item.feedback}
                    </AppText>
                </View>

                <Spacer value={12} />

                {renderParticipantImages(item.participantImages)}
            </View>
        </TouchableOpacity>
    );

    return (
        <MainContainer fillHeight>
            <View style={styles.container}>
                <FlatList
                    data={events}
                    renderItem={renderEventCard}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            tintColor={Colors.White}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Black || "#000000",
    },
    listContainer: {
        paddingVertical: 20,
    },
    eventCard: {
        marginBottom: 30,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: Colors.Black || "#000000",
    },
    eventImage: {
        width: width,
        height: 300,
        justifyContent: "flex-start",
    },
    eventImageStyle: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    eventOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    eventContent: {
        padding: 20,
    },
    eventTitle: {
        color: Colors.White || "#FFFFFF",
        lineHeight: 28,
    },
    eventDate: {
        color: Colors.White || "#FFFFFF",
        opacity: 0.8,
    },
    award: {
        color: Colors.White || "#FFFFFF",
    },
    participationRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    participationText: {
        color: Colors.White || "#FFFFFF",
        opacity: 0.7,
    },
    registrationFee: {
        color: Colors.White || "#FFFFFF",
    },
    feedbackTitle: {
        color: Colors.White || "#FFFFFF",
        opacity: 0.7,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 8,
    },
    feedbackText: {
        color: Colors.White || "#FFFFFF",
        marginLeft: 8,
        flex: 1,
        lineHeight: 20,
    },
    participantContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    participantImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.White || "#FFFFFF",
    },
    moreParticipants: {
        backgroundColor: Colors.SkyBlue || "#87CEEB",
        justifyContent: "center",
        alignItems: "center",
    },
    moreText: {
        color: Colors.White || "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
    },
});

export default EventsScreen;