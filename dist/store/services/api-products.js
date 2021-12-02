import apiInterceptor from '../../interceptor/api-interceptor'
const PRODUCTS_API = {

    products: {

        getTopBanner: (data) => apiInterceptor({
            url: '/top-banner',
            method: 'get',
            data: data,
            headers: {
                "Content-Type": "application/json",
                // "AUTH_TOKEN_X": true,
                // "AUTH_ROLE":true
            },
        }),
        getHomeSlider: (param1, param2) => apiInterceptor({
            url: `/products/home-slider/${param1}/${param2}`,
            method: 'get',
            data: null,
            // headers: {
            //     "Content-Type": "application/json",
            //     "AUTH_TOKEN_X": true,
            //     "AUTH_ROLE":true
            // },
        }),
        getTopBestSellers: (param1, param2) => apiInterceptor({
            url: `/sales`,
            method: 'get',
            data: null,
            // headers: {
            //     "Content-Type": "application/json",
            //     "AUTH_TOKEN_X": true,
            //     "AUTH_ROLE":true
            // },
        }),
        getProdById: (param1) => apiInterceptor({
            url: `/products/product/${param1}`,
            method: 'get',
            data: null,
        }),
        getProdFreqBougthTogether: (param1) => apiInterceptor({
            url: `/products/frequently-bought-together/${param1}`,
            method: 'get',
            data: null,
        }),
        getDealsHotToDay: (param1, param2) => apiInterceptor({
            url: `/products/deals-hot-today`,
            method: 'get',
            // data:null,
            // headers: {
            //     "Content-Type": "application/json",
            //     "AUTH_TOKEN_X": true,
            //     "AUTH_ROLE":true
            // },
        }),
        bestSelerItems: (param1, param2) => apiInterceptor({
            url: `/products/best-seller-items-from-category/${param1}`,
            method: 'get',
            // data,
            // headers: {
            //     "Content-Type": "application/json",
            //     "AUTH_TOKEN_X": true,
            //     "AUTH_ROLE":false
            // },
        }),
        bestSellerItemsBySubCategory: (param1, param2) => apiInterceptor({
            url: `/products/best-seller-items-by-subcategory/${param1}`,
            method: 'get',
            // data,
            // headers: {
            //     "Content-Type": "application/json",
            //     "AUTH_TOKEN_X": true,
            //     "AUTH_ROLE":false
            // },
        }),
        bestSellerBySubCategoryProduct: (param1, param2) => apiInterceptor({
            url: `/products/best-seller-by-subcategory-product/${param1}`,
            method: 'get',
        }),
        recommendItems: (param1, param2) => apiInterceptor({
            url: `/products/recommended-items-from-category/${param1}`,
            method: 'get',
        }),
        recommendBySubCategoryItems: (param1, param2) => apiInterceptor({
            url: `/products/recommended-items-by-subcategory/${param1}`,
            method: 'get',
        }),
        recommendItemsBySubCategoryProduct: (param1, param2) => apiInterceptor({
            url: `/products/recommended-items-by-subcategory-product/${param1}`,
            method: 'get',
        }),
        productListFromCat: (param1, param2) => apiInterceptor({
            url: `/products/product-list-from-category/${param1}`,
            method: 'get',
        }),
        productListByRootSubCat: (param1, param2) => apiInterceptor({
            url: `/products/product-list-by-subcategory/${param1}`,
            method: 'get',
        }),
        productListBySubCat: (param1, param2) => apiInterceptor({
            url: `/products/product-list-by-subcategory-product/${param1}`,
            method: 'get',
        }),
        productSameBrand: (param1) => apiInterceptor({
            url: `/products/same-brand/${param1}`,
            method: 'get',
        }),
        getProdsRelateds: (param1) => apiInterceptor({
            url: `/products/relateds/${param1}`,
            method: 'get',
            data: null,
        }),
        getProdsCustomerWhoAlsoBought: (param1) => apiInterceptor({
            url: `/products/customer-also-bought/${param1}`,
            method: 'get',
            data: null,
        }),
        setProdViewed: (param1) => apiInterceptor({
            url: `/products/set-product-viewed/${param1}`,
            method: 'patch',
            data: null,
        }),
        // getById: (id)=>apiInterceptor({
        //     url:`/pricing-plan-table/${id}`,
        //     method:'get',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "AUTH_TOKEN_X": false
        //     },
        // }),
    }
}

export default PRODUCTS_API;