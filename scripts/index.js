import { changeMenuIfAuthenticated, configHeaderListItens } from "./listenerConfig/menuAdapter.js";
import { loadAllProductsFromAPI } from "./viewProduct/productLoader.js";

export const BOARD_CARD_CLASS = "board__card";
export const BOARD_CARD_TITLE_CLASS = "car__title";
export const BOARD_CARD_IMAGE_CLASS = "card__image";
export const BOARD_CARD_PRICE_CLASS = "card__price";
export const BOARD_DISPLAY_IMAGE = "display__image"

export const API_URL = "http://localhost:8080";

export var lastSelectedProduct = null;

export function main() {
    changeMenuIfAuthenticated();
    configHeaderListItens();
    loadAllProductsFromAPI();
}