import { loadPurchasesByProduct } from "./adminPurchase/purchaseLoader.js";
import { printPurchases } from "./adminPurchase/purchasePrinter.js";
import { checkAuthForAdmin } from "./auth/verifyAuth.js";
import { configListItensForAdmin } from "./listenerConfig/menuAdapter.js";

export async function main() {
    configListItensForAdmin();
    const purchases = await loadPurchasesByProduct();
    printPurchases(purchases);
}