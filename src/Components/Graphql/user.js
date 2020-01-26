import gql from "graphql-tag";

const GET_USER_INFO = gql`
    query user($login: String!)
    {
        user(login: $login) {
            id,
            name,
            login,
            avatarUrl,
            url,
            bio,
            company,
            email,
            isViewer,
            viewerIsFollowing
        }
    }

`;

export default GET_USER_INFO;

