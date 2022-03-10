import { generate } from '../contents';

generate().catch((ex) => {
  const { stack, message } = ex as Error;
  console.error('Error generating contents', stack || message);
});