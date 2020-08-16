"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_type_of_1 = __importDefault(require("is-type-of"));
const ramda_1 = __importDefault(require("ramda"));
const swaggerObject_1 = __importDefault(require("./swaggerObject"));
const _desc = (type, text) => (target, name, descriptor) => {
    descriptor.value[type] = text;
    swaggerObject_1.default.add(target, name, { [type]: text });
    return descriptor;
};
const _params = (type, parameters) => (target, name, descriptor) => {
    if (!descriptor.value.parameters)
        descriptor.value.parameters = {};
    descriptor.value.parameters[type] = parameters;
    // additional wrapper for body
    let swaggerParameters = parameters;
    if (type === "body") {
        swaggerParameters = [
            {
                name: "data",
                description: "request body",
                schema: {
                    type: "object",
                    properties: parameters
                }
            }
        ];
    }
    else {
        swaggerParameters = Object.keys(swaggerParameters).map(key => Object.assign({ name: key }, swaggerParameters[key]));
    }
    swaggerParameters.forEach((item) => {
        item.in = type;
    });
    swaggerObject_1.default.add(target, name, { [type]: swaggerParameters });
    return descriptor;
};
const request = (method, path) => (target, name, descriptor) => {
    method = ramda_1.default.toLower(method);
    descriptor.value.method = method;
    descriptor.value.path = path;
    swaggerObject_1.default.add(target, name, {
        request: { method, path },
        security: [{ ApiKeyAuth: [] }]
    });
    return descriptor;
};
exports.request = request;
const middlewares = (middlewares) => (target, name, descriptor) => {
    descriptor.value.middlewares = middlewares;
    return descriptor;
};
exports.middlewares = middlewares;
const security = (security) => (target, name, descriptor) => {
    swaggerObject_1.default.add(target, name, {
        security
    });
};
exports.security = security;
const deprecated = (target, name, descriptor) => {
    descriptor.value.deprecated = true;
    swaggerObject_1.default.add(target, name, { deprecated: true });
    return descriptor;
};
exports.deprecated = deprecated;
const defaultResp = {
    200: { description: "success" }
};
const responses = (responses = defaultResp) => (target, name, descriptor) => {
    descriptor.value.responses = responses;
    swaggerObject_1.default.add(target, name, { responses });
    return descriptor;
};
exports.responses = responses;
const desc = ramda_1.default.curry(_desc);
exports.desc = desc;
// description and summary
const description = desc("description");
exports.description = description;
const produces = desc("produces");
exports.produces = produces;
const summary = desc("summary");
exports.summary = summary;
const tags = desc("tags");
exports.tags = tags;
const params = ramda_1.default.curry(_params);
exports.params = params;
// below are [parameters]
// query params
const query = params("query");
exports.query = query;
// path params
const path = params("path");
exports.path = path;
// body params
const body = params("body");
exports.body = body;
// formData params
const formData = params("formData");
exports.formData = formData;
// class decorators
const tagsAll = (items) => (target) => {
    const tags = is_type_of_1.default.array(items) ? items : [items];
    swaggerObject_1.default.addMulti(target, { tags });
};
exports.tagsAll = tagsAll;
const producesAll = (items) => (target) => {
    const produces = items;
    swaggerObject_1.default.addMulti(target, { produces });
};
exports.producesAll = producesAll;
const responsesAll = (responses = defaultResp) => (target) => {
    swaggerObject_1.default.addMulti(target, { responses });
};
exports.responsesAll = responsesAll;
const middlewaresAll = (items) => (target) => {
    const middlewares = is_type_of_1.default.array(items) ? items : [items];
    target.middlewares = middlewares;
};
exports.middlewaresAll = middlewaresAll;
const securityAll = (security) => (target) => {
    const authentitactions = is_type_of_1.default.array(security) ? security : [security];
    swaggerObject_1.default.addMulti(target, {
        security: authentitactions
    });
};
exports.securityAll = securityAll;
const deprecatedAll = (target) => {
    swaggerObject_1.default.addMulti(target, { deprecated: true });
};
exports.deprecatedAll = deprecatedAll;
const prefix = (prefix) => (target) => {
    swaggerObject_1.default.addMulti(target, { prefix });
    target.prefix = prefix;
};
exports.prefix = prefix;
const queryAll = (parameters, filters = ["ALL"]) => (target) => {
    if (!target.parameters)
        target.parameters = {};
    target.parameters.query = parameters; // used in wrapper.js for validation
    target.parameters.filters = filters; // used in wrapper.js for validation
    const swaggerParameters = Object.keys(parameters).map(key => Object.assign({ name: key }, parameters[key]));
    swaggerParameters.forEach(item => {
        item.in = "query";
    });
    swaggerObject_1.default.addMulti(target, { query: swaggerParameters }, filters);
};
exports.queryAll = queryAll;
const Doc = {
    request,
    summary,
    params,
    desc,
    description,
    query,
    path,
    body,
    tags,
    middlewares,
    security,
    formData,
    produces,
    responses,
    deprecated,
    tagsAll,
    producesAll,
    responsesAll,
    middlewaresAll,
    deprecatedAll,
    securityAll,
    queryAll,
    prefix
};
exports.default = Doc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQTRCO0FBQzVCLGtEQUFzQjtBQUN0QixvRUFBNEM7QUFFNUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFZLEVBQUUsSUFBb0IsRUFBRSxFQUFFLENBQUMsQ0FDcEQsTUFBVyxFQUNYLElBQVksRUFDWixVQUE4QixFQUM5QixFQUFFO0lBQ0YsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDOUIsdUJBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRyxDQUFDLElBQVksRUFBRSxVQUFtQyxFQUFFLEVBQUUsQ0FBQyxDQUNyRSxNQUFXLEVBQ1gsSUFBWSxFQUNaLFVBQThCLEVBQzlCLEVBQUU7SUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVO1FBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ25FLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUUvQyw4QkFBOEI7SUFDOUIsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLENBQUM7SUFDbkMsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ25CLGlCQUFpQixHQUFHO1lBQ2xCO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFLFVBQVU7aUJBQ3ZCO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7U0FBTTtRQUNMLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNyRCxDQUFDO0tBQ0g7SUFDRCxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVILHVCQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUMvRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQWMsRUFBRSxJQUFZLEVBQUUsRUFBRSxDQUFDLENBQ2hELE1BQVcsRUFDWCxJQUFZLEVBQ1osVUFBOEIsRUFDOUIsRUFBRTtJQUNGLE1BQU0sR0FBRyxlQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNqQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDN0IsdUJBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM5QixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1FBQ3pCLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDO0tBQy9CLENBQUMsQ0FBQztJQUNILE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQXdKQSwwQkFBTztBQXRKVCxNQUFNLFdBQVcsR0FBRyxDQUFDLFdBQXVCLEVBQUUsRUFBRSxDQUFDLENBQy9DLE1BQVcsRUFDWCxJQUFZLEVBQ1osVUFBOEIsRUFDOUIsRUFBRTtJQUNGLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUMzQyxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDLENBQUM7QUF3SkEsa0NBQVc7QUF0SmIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxRQUFlLEVBQUUsRUFBRSxDQUFDLENBQ3BDLE1BQVcsRUFDWCxJQUFZLEVBQ1osVUFBOEIsRUFDOUIsRUFBRTtJQUNGLHVCQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDOUIsUUFBUTtLQUNULENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQStJQSw0QkFBUTtBQTdJVixNQUFNLFVBQVUsR0FBRyxDQUNqQixNQUFXLEVBQ1gsSUFBWSxFQUNaLFVBQThCLEVBQzlCLEVBQUU7SUFDRixVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDbkMsdUJBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQXlJQSxnQ0FBVTtBQXBJWixNQUFNLFdBQVcsR0FBZTtJQUM5QixHQUFHLEVBQUUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFO0NBQ2hDLENBQUM7QUFDRixNQUFNLFNBQVMsR0FBRyxDQUFDLFlBQXdCLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FDekQsTUFBVyxFQUNYLElBQVksRUFDWixVQUE4QixFQUM5QixFQUFFO0lBQ0YsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQ3ZDLHVCQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQXdIQSw4QkFBUztBQXZIWCxNQUFNLElBQUksR0FBRyxlQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBNkcxQixvQkFBSTtBQTNHTiwwQkFBMEI7QUFDMUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBMkd0QyxrQ0FBVztBQXpHYixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFpSGhDLDRCQUFRO0FBL0dWLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQW9HOUIsMEJBQU87QUFsR1QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBeUd4QixvQkFBSTtBQXZHTixNQUFNLE1BQU0sR0FBRyxlQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBaUc5Qix3QkFBTTtBQS9GUix5QkFBeUI7QUFFekIsZUFBZTtBQUNmLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQStGNUIsc0JBQUs7QUE3RlAsY0FBYztBQUNkLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQTZGMUIsb0JBQUk7QUEzRk4sY0FBYztBQUNkLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQTJGMUIsb0JBQUk7QUF6Rk4sa0JBQWtCO0FBQ2xCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQTRGbEMsNEJBQVE7QUExRlYsbUJBQW1CO0FBQ25CLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtJQUM1RCxNQUFNLElBQUksR0FBRyxvQkFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLHVCQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBMEZBLDBCQUFPO0FBeEZULE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO0lBQ3ZELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN2Qix1QkFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQztBQXNGQSxrQ0FBVztBQXBGYixNQUFNLFlBQVksR0FBRyxDQUFDLFlBQXdCLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtJQUM1RSx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQztBQW1GQSxvQ0FBWTtBQWpGZCxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQTRCLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7SUFDdkUsTUFBTSxXQUFXLEdBQUcsb0JBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUNuQyxDQUFDLENBQUM7QUErRUEsd0NBQWM7QUE3RWhCLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtJQUM3RCxNQUFNLGdCQUFnQixHQUFHLG9CQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEUsdUJBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQzdCLFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBeUVBLGtDQUFXO0FBdkViLE1BQU0sYUFBYSxHQUFHLENBQUMsTUFBVyxFQUFFLEVBQUU7SUFDcEMsdUJBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDdkQsQ0FBQyxDQUFDO0FBc0VBLHNDQUFhO0FBcEVmLE1BQU0sTUFBTSxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO0lBQ2pELHVCQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBbUVBLHdCQUFNO0FBakVSLE1BQU0sUUFBUSxHQUFHLENBQUMsVUFBbUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDM0UsTUFBVyxFQUNYLEVBQUU7SUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVU7UUFBRSxNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUMvQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxvQ0FBb0M7SUFDMUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsb0NBQW9DO0lBQ3pFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDMUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDOUMsQ0FBQztJQUNGLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUNILHVCQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hFLENBQUMsQ0FBQztBQW1EQSw0QkFBUTtBQWxEVixNQUFNLEdBQUcsR0FBRztJQUNWLE9BQU87SUFDUCxPQUFPO0lBQ1AsTUFBTTtJQUNOLElBQUk7SUFDSixXQUFXO0lBQ1gsS0FBSztJQUNMLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLFdBQVc7SUFDWCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixTQUFTO0lBQ1QsVUFBVTtJQUNWLE9BQU87SUFDUCxXQUFXO0lBQ1gsWUFBWTtJQUNaLGNBQWM7SUFDZCxhQUFhO0lBQ2IsV0FBVztJQUNYLFFBQVE7SUFDUixNQUFNO0NBQ1AsQ0FBQztBQUVGLGtCQUFlLEdBQUcsQ0FBQyJ9