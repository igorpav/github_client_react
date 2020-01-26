import gql from "graphql-tag";

const GET_VIEWER_INFO = gql`
    {
        viewer {
            name,
            isViewer,
            login,
            avatarUrl,
            url,
            bio,
            email,
            company,
            repositories (first: 5) {
                edges {
                    node {
                        id,
                        name,
                        isPrivate,
                        description,
                        pushedAt,
                        createdAt,
                        url
                    }
                }
            }
        }
    }
`;

export default GET_VIEWER_INFO;

