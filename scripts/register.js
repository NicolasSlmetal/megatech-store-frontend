import { configureAddressNumberInput, handleCEPInput } from "./register/addressLoader.js";
import { configureButtonAction } from "./register/buttonConfigurer.js";
import { configureEmailInput } from "./register/emailVerification.js";
import { configureFirstPasswordInput, configureSecondPasswordInput } from "./register/passwordVerification.js";
import { configurePersonalDataInputs } from "./register/personalData.js";

export function main() {
    configurePersonalDataInputs();
    handleCEPInput();
    configureEmailInput();
    configureFirstPasswordInput();
    configureSecondPasswordInput();
    configureAddressNumberInput();
    configureButtonAction();
}