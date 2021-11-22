export function getEnvVariable(key: string) {
  const envVariable = process.env[key];

  if (!envVariable) throw new Error(`process.env.${key} has not been set.`);

  return envVariable;
}
