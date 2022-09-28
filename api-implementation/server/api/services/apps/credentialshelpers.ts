import _ = require("lodash");
import { ErrorResponseInternal } from "../../middlewares/error.handler";
import Credentials = Components.Schemas.Credentials;
import CredentialsArray = Components.Schemas.CredentialsArray;


class CredentialsHelpers {
    public upsertByConsumerKey(credentialsRequest: Credentials, existingCredentials: Credentials | CredentialsArray): CredentialsArray | Credentials {
        const isArray = Array.isArray(existingCredentials);
        if (isArray) {
            // patch the existing credentials in the array, or push request if not found
            const existingIdx = existingCredentials.findIndex(c => c.secret?.consumerKey == credentialsRequest.secret?.consumerKey);
            if (existingIdx > -1) {
                existingCredentials[existingIdx] = credentialsRequest;
            } else {
                existingCredentials.push(credentialsRequest);
            }
            return existingCredentials;
        } else if (existingCredentials.secret?.consumerKey == credentialsRequest.secret?.consumerKey) {
            return credentialsRequest
        } else {
            throw new ErrorResponseInternal(404, `Credentials ${credentialsRequest.secret?.consumerKey} not found.`);
        }
    }

    public findByConsumerKey(credentialsRequest: Credentials, existingCredentials: Credentials | CredentialsArray): Credentials {
        const isArray = Array.isArray(existingCredentials);
        if (isArray) {
            // patch the existing credentials in the array, or push request if not found
            const c = existingCredentials.find(c => c.secret?.consumerKey == credentialsRequest.secret?.consumerKey);
            return c;
        } else if (existingCredentials.secret?.consumerKey == credentialsRequest.secret?.consumerKey) {
            return existingCredentials;
        } else {
            throw new ErrorResponseInternal(404, `Credentials ${credentialsRequest.secret?.consumerKey} don't exist`);
        }
    }

    public deleteByConsumerKey(credentialsRequest: Credentials, existingCredentials: Credentials | CredentialsArray) {
        const isArray = Array.isArray(existingCredentials);
        if (isArray) {
            // remove credentials
            return _.remove(existingCredentials, c=> c.secret?.consumerKey != credentialsRequest.secret?.consumerKey);
        } else if (existingCredentials.secret?.consumerKey == credentialsRequest.secret?.consumerKey) {
            throw new ErrorResponseInternal(400, `Credentials ${credentialsRequest.secret?.consumerKey} can not be removed`);
        } else {
            throw new ErrorResponseInternal(404, `Credentials ${credentialsRequest.secret?.consumerKey} don't exist`);
        }
    }
}

export default new CredentialsHelpers();