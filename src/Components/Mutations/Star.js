import gql from "graphql-tag";

export const ADD_STAR_REPOS = gql`
    mutation addStar($id: ID!){
        addStar(input: {starrableId : $id}) {
            starrable {
                id
            }
        }
    }
`;

export const REMOVE_STAR_REPOS = gql`
mutation addStar($id: ID!){
    removeStar(input: {starrableId : $id}) {
        starrable {
            id
        }
    }
}
`;
