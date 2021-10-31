import { getCryptoCompareConfig } from '@app/services/crypto-compare';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';


@ValidatorConstraint({ async: true })
class IsActualCryptosConstraints implements ValidatorConstraintInterface {
    public validate(fsyms: string, _args: ValidationArguments) {
        const { cryptos } = getCryptoCompareConfig()
        return fsyms.split(",").every(item => cryptos.indexOf(item) !== -1)
    }

    public defaultMessage(_args: ValidationArguments) {
        return 'fsyms parameter is not valid';
    }
}

export function IsActualCryptos(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: 'isActualCryptos',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsActualCryptosConstraints,
        });
    };
}
