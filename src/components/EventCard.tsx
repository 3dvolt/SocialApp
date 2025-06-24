import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
} from "react-native";
import { AppText, Spacer } from "@app/components";
import { Colors } from "@app/utils";
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

interface EventCardProps {
    event: DanceEvent;
    onPress: (event: DanceEvent) => void;
    onBackPress?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
                                                        event,
                                                        onPress,
                                                        onBackPress
                                                    }) => {
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

    return (
        <TouchableOpacity
            style={styles.eventCard}
            onPress={() => onPress(event)}
        >
            <ImageBackground
                source={{ uri: event.imageUri }}
                style={styles.eventImage}
                imageStyle={styles.eventImageStyle}
            >
                <View style={styles.eventOverlay}>
                    {onBackPress && (
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={onBackPress}
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            </ImageBackground>

            <View style={styles.eventContent}>
                <AppText poppinsBold size={24} style={styles.eventTitle}>
                    {event.title}
                </AppText>

                <AppText poppinsRegular size={16} style={styles.eventDate}>
                    {event.date}
                </AppText>

                <Spacer value={8} />

                <AppText poppinsBold size={18} style={styles.award}>
                    Award {event.award}
                </AppText>

                <Spacer value={8} />

                <View style={styles.participationRow}>
                    <AppText poppinsRegular size={14} style={styles.participationText}>
                        How to participate?
                    </AppText>
                </View>

                <AppText poppinsBold size={16} style={styles.registrationFee}>
                    {event.registrationFee} online registration
                </AppText>

                <Spacer value={16} />

                <AppText poppinsRegular size={14} style={styles.feedbackTitle}>
                    User feedback
                </AppText>

                <View style={styles.ratingRow}>
                    {renderStars(event.rating)}
                    <AppText poppinsRegular size={14} style={styles.feedbackText}>
                        {event.feedback}
                    </AppText>
                </View>

                <Spacer value={12} />

                {renderParticipantImages(event.participantImages)}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    eventCard: {
        marginBottom: 30,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: Colors.Black || "#000000",
        marginHorizontal: 20,
    },
    eventImage: {
        width: width - 40,
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