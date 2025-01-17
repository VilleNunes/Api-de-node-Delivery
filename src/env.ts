import z from "zod"

const schemaEnv = z.object({
  DATABASE_URL: z.string(),
  NODE_SECRETS: z.string(),
  NODE_ENV: z.string(),
});

export const env = schemaEnv.parse(process.env);