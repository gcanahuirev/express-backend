import { z } from 'zod';

const envVariables = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .optional()
    .default('development'),
  PORT: z.string().optional().default('3000'),
  MONGO_URI: z.string(),
  DATABASE_URL: z.string(),
});

envVariables.parse(process.env);

export default envVariables;
