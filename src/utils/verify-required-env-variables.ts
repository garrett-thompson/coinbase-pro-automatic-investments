export function verifyRequiredEnvVariables(envVars: string[]) {
  const missingVars: string[] = [];

  envVars.forEach((v) => {
    if (process.env[v] === undefined) missingVars.push(v);
  });

  if (missingVars.length > 0) {
    const message = `The following environment variables must be defined before you can run this program: ${missingVars.join(
      ', '
    )}`;
    throw new Error(message);
  }
}
