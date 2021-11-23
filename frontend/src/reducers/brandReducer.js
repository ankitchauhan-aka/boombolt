import {
    BRAND_LIST_REQUEST,
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAIL,
    HOME_BRAND_LIST_REQUEST,
    HOME_BRAND_LIST_SUCCESS,
    HOME_BRAND_LIST_FAIL,
  } from "../constants/brandConstants";
  
  export const brandListReducer = (state = { brands: [] }, action) => {
    switch (action.type) {
      case BRAND_LIST_REQUEST:
        return { bloading: true, brands: [] };
      case BRAND_LIST_SUCCESS:
        return {
          ...state,
          bloading: false,
          brands: action.payload.finalBrands,
          minPrice: action.payload.minPriceRange,
          maxPrice: action.payload.maxPriceRange,
          minAll: action.payload.minAll,
          maxAll: action.payload.maxAll,
          // pages: action.payload.pages,
          // page: action.payload.page,
        };
      case 'BRAND_SELECTED':   
        return {
          ...state,
          brandsSelected: action.payload
        }
      case BRAND_LIST_FAIL:
        return { bloading: false, berror: action.payload };
      default:
        return state;
    }
  };
  export const homeBrandListReducer = (state = { homeBrandsListing: [] }, action) => {
    switch (action.type) {
      case HOME_BRAND_LIST_REQUEST:
        return { bloading: true, homeBrandsListing: [] };
      case HOME_BRAND_LIST_SUCCESS:
        return {
          bloading: false,
          homeBrandsListing: action.payload,
          // pages: action.payload.pages,
          // page: action.payload.page,
        };
      case HOME_BRAND_LIST_FAIL:
        return { bloading: false, berror: action.payload };
      default:
        return state;
    }
  };
  