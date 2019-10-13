const fs = require("fs-extra")
const { generate } = require("@graphql-codegen/cli")
const { printSchema } = require("graphql")

exports.createPagesStatefully = async options => {
  const { store } = options

  await Promise.all([
    fs.outputFile("schema.graphql", printSchema(store.getState().schema)),
  ])

  try {
    await generate(
      {
        schema: "schema.graphql",
        documents: [
          "./node_modules/gatsby-transformer-*/**/*.js",
          "./src/!(graphql)/**/*.{ts,tsx}",
        ],
        config: { namingConvention: { enumValues: "keep" } },
        generates: {
          "./src/graphql/types.ts": {
            plugins: ["typescript", "typescript-operations"],
          },
          //   './src/graphql/definitions.ts': { plugins: ['codegen-graphql-to-gql'] },
          //   './src/graphql/fragment-types.json': { plugins: ['fragment-matcher'] },
        },
        pluckConfig: {
          modules: [
            {
              name: "gatsby",
              identifier: "graphql",
            },
          ],
        },
      },
      true
    )
  } catch (err) {
    console.error("not called")
  }
}
