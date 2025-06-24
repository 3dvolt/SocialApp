import {
    AppButton,
    AppText,
    Spacer,
} from "@app/components";
import {
    FlexContainer,
    MainContainer,
    PaddingContainer,
} from "@app/containers";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors, alert } from "@app/utils";
import React, { useState } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
    Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

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
    organizer?: string;
    categories?: string[];
    rules?: string[];
    contact?: {
        email: string;
        phone: string;
        website?: string;
    };
}

// Define your navigation types
type EventDetailsScreenProps = StackScreenProps<any, 'EventDetailsScreen'>;

function EventDetailsScreen({ navigation, route }: EventDetailsScreenProps): JSX.Element {
    const event: DanceEvent = route.params?.event;
    const [isRegistered, setIsRegistered] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    if (!event) {
        return (
            <MainContainer fillHeight>
                <PaddingContainer>
                    <AppText>Event not found</AppText>
                </PaddingContainer>
            </MainContainer>
        );
    }

    const handleRegistration = () => {
        if (isRegistered) {
            alert("Already Registered", "You are already registered for this event!");
            return;
        }

        // Show registration confirmation
        alert(
            "Confirm Registration",
            `Register for ${event.title}?\nFee: ${event.registrationFee}`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Register",
                    onPress: () => {
                        setIsRegistered(true);
                        alert("Success", "Registration successful! Check your email for details.");
                    }
                }
            ]
        );
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this amazing dance event: ${event.title}\nDate: ${event.date}\nLocation: ${event.location}\nAward: ${event.award}`,
                title: event.title,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Ionicons
                key={index}
                name={index < rating ? "star" : "star-outline"}
                size={20}
                color="#FFD700"
                style={{ marginRight: 2 }}
            />
        ));
    };

    const renderParticipantImages = (images: string[]) => {
        return (
            <View style={styles.participantContainer}>
                <AppText poppinsSemiBold size={16} style={styles.sectionTitle}>
                    Participants ({images.length})
                </AppText>
                <Spacer value={8} />
                <View style={styles.participantImages}>
                    {images.slice(0, 10).map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={[
                                styles.participantImage,
                                { marginLeft: index > 0 ? -10 : 0 }
                            ]}
                        />
                    ))}
                    {images.length > 10 && (
                        <View style={[styles.participantImage, styles.moreParticipants]}>
                            <AppText style={styles.moreText}>+{images.length - 10}</AppText>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <MainContainer fillHeight>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={{ uri: event.imageUri }}
                    style={styles.headerImage}
                    imageStyle={styles.headerImageStyle}
                >
                    <View style={styles.headerOverlay}>
                        <View style={styles.headerButtons}>
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={handleShare}
                            >
                                <Ionicons name="share-social" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                <PaddingContainer>
                    <Spacer value={20} />

                    <AppText poppinsBold size={28} style={styles.eventTitle}>
                        {event.title}
                    </AppText>

                    <Spacer value={8} />

                    <View style={styles.infoRow}>
                        <Ionicons name="calendar-outline" size={20} color={Colors.SkyBlue} />
                        <AppText poppinsRegular size={16} style={styles.infoText}>
                            {event.date}
                        </AppText>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={20} color={Colors.SkyBlue} />
                        <AppText poppinsRegular size={16} style={styles.infoText}>
                            {event.location}
                        </AppText>
                    </View>

                    <Spacer value={16} />

                    <View style={styles.prizeContainer}>
                        <View style={styles.prizeBox}>
                            <Ionicons name="trophy" size={24} color="#FFD700" />
                            <AppText poppinsBold size={20} style={styles.prizeText}>
                                {event.award}
                            </AppText>
                            <AppText poppinsRegular size={14} style={styles.prizeLabel}>
                                Prize Money
                            </AppText>
                        </View>
                        <View style={styles.prizeBox}>
                            <Ionicons name="card-outline" size={24} color={Colors.SkyBlue} />
                            <AppText poppinsBold size={20} style={styles.prizeText}>
                                {event.registrationFee}
                            </AppText>
                            <AppText poppinsRegular size={14} style={styles.prizeLabel}>
                                Registration
                            </AppText>
                        </View>
                    </View>

                    <Spacer value={24} />

                    <AppText poppinsSemiBold size={18} style={styles.sectionTitle}>
                        Description
                    </AppText>
                    <Spacer value={8} />
                    <AppText
                        poppinsRegular
                        size={16}
                        style={styles.description}
                        numberOfLines={showFullDescription ? undefined : 3}
                    >
                        {event.description}
                    </AppText>
                    <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
                        <AppText style={styles.readMore}>
                            {showFullDescription ? "Read Less" : "Read More"}
                        </AppText>
                    </TouchableOpacity>

                    <Spacer value={24} />

                    <AppText poppinsSemiBold size={18} style={styles.sectionTitle}>
                        User Feedback
                    </AppText>
                    <Spacer value={8} />
                    <View style={styles.ratingContainer}>
                        <View style={styles.ratingRow}>
                            {renderStars(event.rating)}
                            <AppText poppinsRegular size={16} style={styles.ratingText}>
                                ({event.rating}/5)
                            </AppText>
                        </View>
                        <AppText poppinsRegular size={14} style={styles.feedbackText}>
                            "{event.feedback}"
                        </AppText>
                    </View>

                    <Spacer value={24} />

                    {renderParticipantImages(event.participantImages)}

                    <Spacer value={32} />
                </PaddingContainer>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <FlexContainer direction="row" gap={12}>
                    <TouchableOpacity style={styles.favoriteButton}>
                        <Ionicons name="heart-outline" size={24} color={Colors.White} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <AppButton
                            onPress={handleRegistration}
                            style={[
                                styles.registerButton,
                                isRegistered && styles.registeredButton
                            ]}
                        >
                            {isRegistered ? "Registered ✓" : "Register Now"}
                        </AppButton>
                    </View>
                </FlexContainer>
            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Black || "#000000",
    },
    headerImage: {
        width: width,
        height: height * 0.4,
        justifyContent: "flex-start",
    },
    headerImageStyle: {
        resizeMode: "cover",
    },
    headerOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 50,
        padding: 20,
    },
    headerButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    headerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    eventTitle: {
        color: Colors.White || "#FFFFFF",
        lineHeight: 34,
    }
})