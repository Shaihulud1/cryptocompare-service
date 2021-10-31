import { getCryptoCompareConfig } from '@app/services/crypto-compare';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';


@ValidatorConstraint({ async: true })
class IsActualCurrencyConstraints implements ValidatorConstraintInterface {
    public validate(tsyms: string, _args: ValidationArguments) {
        const { currencies } = getCryptoCompareConfig()
        return tsyms.split(",").every(item => currencies.indexOf(item) !== -1)
    }

    public defaultMessage(_args: ValidationArguments) {
        return 'tsyms parameter is not valid';
    }
}

export function IsActualCurrencies(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: 'isActualCurrency',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsActualCurrencyConstraints,
        });
    };
}
