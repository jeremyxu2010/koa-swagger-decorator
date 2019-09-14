/**
 * All other regular column types.
 */
export type PropertyType = "string" | "number" | "boolean" | "array" | "object";

/**
 *
 */
export class PropertyOptions {
    type: PropertyType;
    required?: boolean;
    example?: any;
    description?: string;
    items?: PropertyOptions;
    properties?: any;
}

function deepClone(source: any) {
    if (!source || typeof source !== 'object') {
        return;
    }
    const targetObj: any = source.constructor === Array ? [] : {};
    for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}

export function swaggerClass(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (target.swaggerDocument == undefined) target.swaggerDocument = {};
        if (target.swaggerClass == undefined) target.swaggerClass = target;
        if (target.swaggerClass != target) {
            target.swaggerClass = target;
            target.swaggerDocument = deepClone(target.swaggerDocument);
        }
    };
}

export function swaggerProperty(options?: PropertyOptions): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (target.constructor.swaggerDocument == undefined) target.constructor.swaggerDocument = {};
        if (target.constructor.swaggerClass == undefined) target.constructor.swaggerClass = target.constructor;
        if (target.constructor.swaggerClass != target.constructor) {
            target.constructor.swaggerClass = target.constructor;
            target.constructor.swaggerDocument = deepClone(target.constructor.swaggerDocument);
        }
        target.constructor.swaggerDocument[propertyKey] = options;
    };
}
