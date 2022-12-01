import { gql } from "@apollo/client";

export const GET_USER = gql`
    query ($email: String!){
        getUser (email: $email){
            id
            name
        }
    }
`

export const GET_RECORD_FROM_USER = gql`
    query($userId: Float!){
        getRecordsFromUser(userId: $userId){
            id
            userId
            createdAt
        } getById (id: $userId){
            id
            name
        }
}
`

export const GET_RECORDS = gql`
   query{
        getRecords{
            id
            userId
            createdAt
            user{
                id
                name
            }
    }
}
`

export const CREATE_RECORD = gql`
   mutation($userId: Float!){
        createRecord(userId: $userId){
            id
            userId
            createdAt
        }
    }
`


