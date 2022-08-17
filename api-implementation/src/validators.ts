import { ErrorResponseInternal } from "../server/api/middlewares/error.handler";
import Attributes = Components.Schemas.Attributes;
import _ from 'lodash';
export interface SchemaValidator<T> {
    validate(value: T): boolean
}

export class AttributesValidator implements SchemaValidator<Attributes>{
    validate(value: Attributes): boolean {
        if (!value || value.length == 0) {
            return true;
        }
        // check that we have no null values
        if (value.filter(v => v == null).length > 0) {
            throw new ErrorResponseInternal(400, 'Supplied attributes array contains null values');
        }
        if (value.filter(v => v.name == null).length > 0) {
            throw new ErrorResponseInternal(400, 'Supplied attributes array contains null values');
        }
        // check that we have no duplicates
        const groups = _.groupBy(value, 'name');
        for (const k in groups) {
            const v = groups[k];
            if (v.length > 1) {
                throw new ErrorResponseInternal(400, `Duplicate attribute [${k}] in attributes`);
            }
        }
        return true;
    }


}