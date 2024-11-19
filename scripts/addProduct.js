import { configureAddProductButton } from "./addProduct/registerButton.js";
import { configureInputs } from "./addProduct/validateFields.js";
import { checkAuthForAdmin } from "./auth/verifyAuth.js";
import { configListItensForAdmin } from "./listenerConfig/menuAdapter.js";

export async function main() {
    configureInputs();
    configureAddProductButton();
    configListItensForAdmin();
}