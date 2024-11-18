import { fetchTotalValuePerProduct } from "./adminStock/fetchTotalValue.js";
import { printTableProducts, printTableProductsWithZeroStock, printTableValueInStock } from "./adminStock/tablePrinter.js";
import { checkAuthForAdmin } from "./auth/verifyAuth.js";
import { configListItensForAdmin } from "./listenerConfig/menuAdapter.js";
import { fetchAllProductsFromAPI, fetchAllProductsWithZeroStock } from "./viewProduct/productLoader.js";

export async function main() {
    await checkAuthForAdmin();
    configListItensForAdmin();
    const products = await fetchAllProductsFromAPI();
    printTableProducts(products);
    const projections = await fetchTotalValuePerProduct();
    printTableValueInStock(projections);
    const zeroStockProducts = await fetchAllProductsWithZeroStock();
    printTableProductsWithZeroStock(zeroStockProducts);
}