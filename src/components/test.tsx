import { graphql } from "gatsby"

const query = graphql`
    fragment Test on Query {
        ... on BadSyntax
    }
`
