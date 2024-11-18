import { changeMenuIfAuthenticated, configHeaderListItens } from "./listenerConfig/menuAdapter.js";

export function main() {
    changeMenuIfAuthenticated();
    configHeaderListItens();
}