import React from "react";
import { AppButton, AppText, Spacer } from "@app/components";
import { TextInput, View } from "react-native";
import { styles } from "./styles";

function UserFormStepOne({ formData, onNext, onUpdate }) {
    return (
        <View>
            <AppText poppinsSemiBold size={18}>what’s your name?</AppText>
            <TextInput
                style={styles.input}
                placeholder="Type your name"
                value={formData.name}
                onChangeText={(text) => onUpdate({ name: text })}
            />
            <Spacer value={15} />
            <AppText poppinsSemiBold size={18}>When is your B-day?</AppText>
            <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                value={formData.birthday}
                onChangeText={(text) => onUpdate({ birthday: text })}
            />
            <Spacer value={15} />
            <AppText poppinsSemiBold size={18}>What’s your gender?</AppText>
            {["Male", "female", "other"].map((option) => (
                <AppButton
                    key={option}
                    onPress={() => onUpdate({ gender: option })}
                    style={formData.gender === option ? styles.selected : {}}
                >
                    {option}
                </AppButton>
            ))}
            <Spacer value={20} />
            <AppButton onPress={onNext}>Next</AppButton>
        </View>
    );
}

export default UserFormStepOne