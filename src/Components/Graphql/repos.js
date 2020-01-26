import gql from "graphql-tag";

const REPOS_QUERY = gql`
    query repos($title: String!) {
        search(query: $title, type: REPOSITORY, first: 8) {
            nodes {
                ... on Repository {
                    id,
                    name,
                    url,
                    viewerHasStarred,
                    description,
                    
                    owner {
                        login
                        url
                        avatarUrl
                    }
                }
            }
        }
    }
`;

export default REPOS_QUERY;
