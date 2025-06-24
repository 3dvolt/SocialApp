import React from "react";
import { AppButton, AppText, Spacer } from "@app/components";
import { View } from "react-native";
import ProgressIndicator from "./ProgressIndicator";

function UserFormStepTwo({ formData, onBack, onNext, onUpdate }) {
    return (
        <View>
            <ProgressIndicator step={2} total={3} />
            <Spacer value={20} />
            <AppText poppinsSemiBold size={18}>What describes you better?</AppText>
            <Spacer value={10} />
            {["Dancer", "DJ", "Choreographer", "Fan"].map((option) => (
                <AppButton
                    key={option}
                    onPress={() => onUpdate({ identity: option })}
                    style={formData.identity === option ? { opacity: 0.8 } : {}}
                >
                    {option}
                </AppButton>
            ))}
            <Spacer value={20} />
            <AppButton onPress={onNext}>Next</AppButton>
        </View>
    );
}

export default UserFormStepTwo