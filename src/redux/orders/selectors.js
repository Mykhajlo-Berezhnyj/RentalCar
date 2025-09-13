export const selectOrders = (state) => state.orders.items;

export const selectLoading = (state) => state.orders.isLoading;

export const selectError = (state) => state.orders.error;
