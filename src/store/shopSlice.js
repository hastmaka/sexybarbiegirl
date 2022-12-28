import {createSlice} from '@reduxjs/toolkit';
import {create, getAll, getById} from "../helper/FirestoreApi";

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        product: [],
        newProduct: [],
        trending: [],
        review: [],
        filter: {},
        activeFilter: {},
        //to reset filters
        priceRange: [],
        color: [],
        size: [],
        category: [],
        uploadPercent: 0,
        //full-detail product
        singleProduct: {},

        shopState: {loaded: false, loading: false},
        fullDetailState: {loaded: false, loading: false},
        addProductState: {loaded: false, loading: false},

        productState: {loaded: false, loading: false},
        filterState: {loaded: false, loading: false},
        reviewState: {loaded: false, loading: false},

        singleProductState: {loaded: false, loading: false},

    },
    reducers: {
        setFilter(state, {payload}) {
            let property = payload.property
            if(['color', 'size', 'category'].includes(property)) {
                let active = false;
                state.filter[property].map(filter => {
                    if (filter.name === payload[property]) {
                        if (payload.checked) active = true;
                        filter.checked = payload.checked
                    }
                })

                state.activeFilter = {
                    ...state.activeFilter,
                    [property]: active
                }

            } else {
                return {
                    ...state,
                    filter: {
                        ...state.filter,
                        [property]: payload[property]
                    },
                    activeFilter: {
                        ...state.activeFilter,
                        [property]: true
                    }
                }
            }
        },
        removeFilter(state, {payload}) {
            if(payload === 'availability') {
                let temp = {...state.filter}
                delete temp[payload];
                return {
                    ...state,
                    filter: {...temp}
                }
            } else {
                return {
                    ...state,
                    filter: {
                        ...state.filter,
                        [payload]: state[payload]
                    }
                }
            }
        },
        removeAllFilter(state) {
            return {
                ...state,
                filter: {
                    priceRange: [...state.priceRange],
                    color: [...state.color],
                    size: [...state.size],
                    category: [...state.category]
                }
            }
        },
        setSingleProduct(state, {payload}) {
            state.singleProduct = {...payload}
            state.singleProductState.loaded = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, {meta}) => {
            switch (meta.arg.collection) {
                case 'products':
                    state.productState.loading = true;
                    break;
                case 'filters':
                    state.filterState.loading = true;
                    break;
                case 'reviews':
                    state.reviewState.loading = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(getAll.fulfilled, (state, { payload, meta }) => {
            // debugger
            switch (meta.arg.collection) {
                case 'products':
                    // debugger
                    state.product = payload;
                    state.newProduct =
                    state.productState.loading = false;
                    state.productState.loaded = true;
                    break;
                case 'filters':
                    let min = Math.floor(Math.min(payload[0].priceRange[0])),
                        max = Math.round(Math.max(payload[0].priceRange[1]))
                    state.filter.priceRange = [min, max];
                    state.priceRange = [min, max];
                    state.filter.color = payload[0].color;
                    state.filter.size = payload[0].size;
                    state.filter.category = payload[0].category;
                    state.color = payload[0].color;
                    state.size = payload[0].size;
                    state.category = payload[0].category;
                    state.filterState.loading = false;
                    state.filterState.loaded = true;
                    break;
                case 'reviews':
                    state.review = payload;
                    state.reviewState.loaded = true;
                    state.reviewState.loading = false;
                    break;
                default:
                    return
            }
        });
        builder.addCase(getAll.rejected, (state, {meta}) => {
            debugger
            state.message = meta;
            state.shopState.loaded = false;
        });

        builder.addCase(getById.pending, (state, {meta}) => {
            switch (meta.arg.collection) {
                case 'products':
                    state.singleProductState.loading = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(getById.fulfilled, (state, {payload, meta}) => {
            switch (meta.arg.collection) {
                case 'products':
                    state.singleProduct = payload[0];
                    state.singleProductState.loading = false;
                    state.singleProductState.loaded = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(getById.rejected, (state, {meta}) => {
            debugger
            state.message = meta;
            state.singleProductState.loaded = false;
        });

        builder.addCase(create.pending, (state, {meta}) => {
            switch (meta.arg.collection) {
                case 'products':
                    debugger
                    break;
                case 'reviews':
                    state.reviewState.loading = true;
                    break;
                default:
                    return
            }
            state.addProductState.loading = true;
        });
        builder.addCase(create.fulfilled, (state, {meta, payload}) => {
            switch (meta.arg.collection){
                case 'products':
                    debugger
                    state.addProductState.loading = false;
                    state.addProductState.loaded = true;
                    break;
                case 'reviews':
                    state.review = [...state.review, {...meta.arg.data, id: payload}];
                    //update product total_review local
                    const targetProductIndex = [...state.product].findIndex(item => item.id === meta.arg.data.product_id);
                    state.product[targetProductIndex].statistic.total_review ++;
                    state.reviewState.loaded = true;
                    state.reviewState.loading = false;
                    break;
                default:
                    return
            }
        });
        builder.addCase(create.rejected, (state, {meta}) => {
            debugger
            state.message = meta;
            state.addProductState.loaded = false;
        });
    }
});

export const shopSliceActions = shopSlice.actions;
export default shopSlice.reducer;