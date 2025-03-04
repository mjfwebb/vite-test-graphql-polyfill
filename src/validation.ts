import { Neo4jGraphQL } from "@neo4j/graphql";
import { GraphQLError } from "graphql";

export const isNotNullish = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};

export const validateTypeDefinitions = async (
  skipValidation: boolean,
  typeDefs: string,
  isFederationEnabled?: boolean
): Promise<GraphQLError[] | null> => {
  try {
    if (skipValidation) {
      return null;
    }

    const options = {
      typeDefs,
      driver: undefined,
      validate: true,
      features: {
        filters: {
          String: {
            MATCHES: false,
          },
          ID: {
            MATCHES: false,
          },
        },
      },
      debug: false,
    };
    const neoSchema = new Neo4jGraphQL(options);

    if (isNotNullish(isFederationEnabled) && isFederationEnabled) {
      // TODO: figure out a way to validate federation subgraph in the frontend.
      return null;
    }

    await neoSchema.getSchema();
    return null;
  } catch (error) {
    const err = error as GraphQLError;
    return Array.isArray(err) ? err : [err];
  }
};
