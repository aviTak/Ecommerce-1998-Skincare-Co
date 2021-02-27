import { gql } from '@apollo/client';

// Product

const getProductsQuery = gql`
    query($search: String, $last: Int, $cursor: String, $gender: String){
        products(search: $search, last: $last, cursor: $cursor, gender: $gender){
            id
            name
            photo
            item {
                price
            }
            available
        }
    }
`;

const getProductQuery = gql`
    query($id: ID!){
        product(id: $id){
            id
            name
            item {
                price
                size
            }
            photo
            gender
            summary
            available
        }
    }
`;



// Testimonial

const getTestimonialsQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        testimonials(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            name
            summary
        }
    }
`;



// Slide

const getSlidesQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        slides(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            heading
            caption
            photo
        }
    }
`;



// Home

const getConfirmQuery = gql`
    query{
        home{        
            tagline
            summary
        }
    }
`;




// About

const getAboutQuery = gql`
    query{
        about{
            heading
            yourInfo
            disclaimerInfo
        }
    }
`;



// Social

const getSocialQuery = gql`
    query{
        social{
            facebook
            instagram
            twitter
        }
        footer{
            privacy
        }
    }
`;



// Contact

const getContactQuery = gql`
    query{
        contact{
            heading
            info
        }
    }
`;


// Accept Payment

const acceptPaymentQuery = gql`
    query($orderId: String!){
        acceptPayment(orderId: $orderId){
            message
        }
    }
`;



// Cart No

const cartQuery = gql`
    query{
        cartNo @client
    }
`;



export { 
    getSlidesQuery,
    getAboutQuery,
    getTestimonialsQuery,
    getSocialQuery,
    getContactQuery,
    getConfirmQuery,
    acceptPaymentQuery,
    cartQuery,
    getProductQuery,
    getProductsQuery
};

