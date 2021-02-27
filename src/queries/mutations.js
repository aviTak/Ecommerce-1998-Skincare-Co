import { gql } from '@apollo/client';

// Pay Now

const payNowMutation = gql`
    mutation($productIds: [InputProduct]!, $instruct: String, $coupon: String){
        payNow(productIds: $productIds, instruct: $instruct, coupon: $coupon){
            created
            message
        }
    }
`; 



// Feedback

const addFeedbackMutation = gql`
    mutation($name: String!, $email: String!, $message: String!){
        addFeedback(name: $name, email: $email, message: $message){
            created
            message
        }
    }
`;




// User

const addUserMutation = gql`
    mutation($email: String!){
       addUser(email: $email){
           created
           message
       }
    }
`;


export {
    addUserMutation,
    addFeedbackMutation,
    payNowMutation
};

