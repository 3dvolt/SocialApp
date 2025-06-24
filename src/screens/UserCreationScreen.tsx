import React, { useState } from "react";
import { MainContainer, PaddingContainer } from "@app/containers";
import { UserFormStepOne, UserFormStepTwo, UserFormStepThree } from "../components";

export default function UserCreationScreen() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        birthday: "",
        gender: "",
        identity: "",
        about: "",
    });

    const goToNext = () => setStep((prev) => Math.min(prev + 1, 3));
    const goToPrevious = () => setStep((prev) => Math.max(prev - 1, 1));

    const updateForm = (data: Partial<typeof formData>) =>
        setFormData((prev) => ({ ...prev, ...data }));

    return (
        <MainContainer fillHeight>
            <PaddingContainer>
                {step === 1 && (
                    <UserFormStepOne
                        formData={formData}
                        onNext={goToNext}
                        onUpdate={updateForm}
                    />
                )}
                {step === 2 && (
                    <UserFormStepTwo
                        formData={formData}
                        onNext={goToNext}
                        onBack={goToPrevious}
                        onUpdate={updateForm}
                    />
                )}
                {step === 3 && (
                    <UserFormStepThree
                        formData={formData}
                        onBack={goToPrevious}
                        onSubmit={() => {
                            console.log("Form submitted", formData);
                        }}
                        onUpdate={updateForm}
                    />
                )}
            </PaddingContainer>
        </MainContainer>
    );
}
