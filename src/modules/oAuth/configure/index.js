import { isEmptyStr } from 'services/utils';

import defaultConfig from '../config';
import validateOAuth from './validateOAuth';

export default function configureOAuth(customConfig) {
    if (!customConfig || isEmptyStr(customConfig.origin)) {
        return {
            enabled: false,
        };
    }

    const config = {
        ...defaultConfig,
        ...customConfig,
        enabled: true,
    };

    validateOAuth(config);

    return config;
}
