import gql from "graphql-tag";

export const FOLLOW_USER = gql`
    mutation ($userId: ID!) {
        followUser(input: {userId: $userId}) {
            clientMutationId,
            user {
                viewerIsFollowing
            }
        }
    }
`;

export const UNFOLLOW_USER = gql`
    mutation unfollowUser($userId: ID!) {
        unfollowUser(input: {userId: $userId}) {
            clientMutationId,
            user {
                viewerIsFollowing
            }
        }
    }
`
