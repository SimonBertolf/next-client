import dotenv from 'dotenv';
import { production } from './production';
import { staging } from './staging';
import { development } from './development';
import { local } from './local';
import { defaults } from './defaults';

dotenv.config();

export const { VUE_APP_OPS_ENV = 'local' } = process.env;

const getEnvironment = (opsEnv: string) => {
  if (opsEnv === 'local') {
    return { ...defaults, ...local };
  }
  if (opsEnv === 'development') {
    return { ...defaults, ...development };
  }
  if (opsEnv === 'staging') {
    return { ...defaults, ...staging };
  }
  if (opsEnv === 'production') {
    return { ...defaults, ...production };
  }
  return defaults;
};

export const environment = getEnvironment(VUE_APP_OPS_ENV);

// export { environment }
