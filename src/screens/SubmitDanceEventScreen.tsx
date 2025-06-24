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
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomScreensParamsList } from "@app/types";
import { Colors, alert } from "@app/utils";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

type Props = BottomTabScreenProps<BottomScreensParamsList, "SubmitDanceEventScreen">;

function SubmitDanceEventScreen({ navigation }: Props): JSX.Element {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [location, setLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);

  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleLocationSearch = async (query: string) => {
    setLocation(query);
    if (!query) {
      setLocationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const suggestions = response.data.map((item: any) => item.display_name);
      setLocationSuggestions(suggestions.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission Denied", "We need media library permissions.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!title || !date || !location || !description || !imageUri) {
      alert("Missing fields", "Please complete all fields and upload an image.");
      return;
    }

    // Simulated submission logic
    console.log({
      title,
      date,
      location,
      description,
      imageUri,
    });

    alert("Success", "Dance event submitted!");
    navigation.navigate("HomeScreen");
  };

  return (
      <MainContainer fillHeight>
        <PaddingContainer>
          <Spacer value={20} />
          <AppText poppinsSemiBold size={20}>Create New Dance Event</AppText>
          <Spacer value={20} />

          <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Event Title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={Colors.SkyBlue}
            />

            <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.input}
            >
              <AppText>{date.toDateString()}</AppText>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={handleDateChange}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={handleLocationSearch}
                placeholderTextColor={Colors.SkyBlue}
            />
            {locationSuggestions.length > 0 && (
                <View style={styles.suggestions}>
                  <FlatList
                      data={locationSuggestions}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                          <TouchableOpacity
                              onPress={() => {
                                setLocation(item);
                                setLocationSuggestions([]);
                              }}
                          >
                            <AppText style={styles.suggestionItem}>{item}</AppText>
                          </TouchableOpacity>
                      )}
                  />
                </View>
            )}

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                placeholderTextColor={Colors.SkyBlue}
            />

            <AppButton onPress={pickImage}>
              {imageUri ? "Change Image" : "Upload Image"}
            </AppButton>

            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={styles.imagePreview}
                    resizeMode="cover"
                />
            )}
          </View>

          <Spacer value={20} />
          <FlexContainer>
            <AppButton onPress={handleSubmit}>Submit Event</AppButton>
          </FlexContainer>
        </PaddingContainer>
      </MainContainer>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LightGrey,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: Colors.Black,
    backgroundColor: Colors.White,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  suggestions: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    borderColor: Colors.LightGrey,
    borderWidth: 1,
  },
  suggestionItem: {
    paddingVertical: 6,
    color: Colors.SkyBlue,
  },
  imagePreview: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default SubmitDanceEventScreen;
