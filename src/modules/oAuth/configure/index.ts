import { isEmptyStr } from 'services/utils';
import type { PetrusConfig, PetrusCustomConfig } from 'types';

import { defaultOAuthConfig } from '../config';
import { validateOAuth } from './validateOAuth';

export function configure(customConfig: PetrusCustomConfig['oAuth']): PetrusConfig['oAuth'] {
    if (!customConfig || isEmptyStr(customConfig.origin)) {
        return {
            ...defaultOAuthConfig,
            enabled: false,
        } as const;
    }

    const config = {
        ...defaultOAuthConfig,
        ...customConfig,
        enabled: true,
    };

    validateOAuth(config);

    return config;
}
