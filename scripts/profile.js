import { changeMenuIfAuthenticated, configHeaderListItens } from "./listenerConfig/menuAdapter.js";
import { checkAuth } from "./profile/checkAuth.js";
import { configureEditButton } from "./profile/configEditButton.js";
import { loadCustomerById, printCustomerInfo } from "./profile/profileLoader.js";
import { fetchPurchaseHistoryOfCustomer, printPurchaseHistoryOrderingByDate } from "./profile/purchaseLoader.js";

export function main() {
    checkAuth().then(async () => {
        changeMenuIfAuthenticated();
        configHeaderListItens();
        const customer = await loadCustomerById();
        printCustomerInfo(customer);
        const purchaseHistory = await fetchPurchaseHistoryOfCustomer(customer.id);
        printPurchaseHistoryOrderingByDate(purchaseHistory);
        configureEditButton();
    });
}