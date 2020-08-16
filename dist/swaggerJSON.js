"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerTemplate_1 = __importDefault(require("./swaggerTemplate"));
const utils_1 = require("./utils");
/**
 * build swagger json from apiObjects
 */
const swaggerJSON = (options = {}, apiObjects) => {
    const { title, description, version, prefix = '', swaggerOptions = {} } = options;
    const swaggerJSON = swaggerTemplate_1.default(title, description, version, swaggerOptions);
    Object.keys(apiObjects).forEach((key) => {
        const value = apiObjects[key];
        if (!Object.keys(value).includes('request')) {
            return;
        }
        const { method } = value.request;
        let { path } = value.request;
        path = utils_1.getPath(prefix, value.prefix ? `${value.prefix}${path}` : path); // 根据前缀补全path
        const summary = value.summary || '';
        const description = value.description || summary;
        const produces = value.produces || ['*/*'];
        const responses = value.responses || {
            200: { description: 'success' }
        };
        const { query = [], path: pathParams = [], body = [], tags, formData = [], security, deprecated } = value;
        const parameters = [...pathParams, ...query, ...formData, ...body];
        // init path object first
        if (!swaggerJSON.paths[path]) {
            swaggerJSON.paths[path] = {};
        }
        // add content type [multipart/form-data] to support file upload
        const consumes = formData.length > 0 ? ['multipart/form-data'] : undefined;
        swaggerJSON.paths[path][method] = {
            consumes,
            summary,
            description,
            parameters,
            produces,
            responses,
            tags,
            security,
            deprecated
        };
    });
    return swaggerJSON;
};
exports.swaggerJSON = swaggerJSON;
exports.default = swaggerJSON;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlckpTT04uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvc3dhZ2dlckpTT04udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3RUFBcUM7QUFDckMsbUNBQWtDO0FBQ2xDOztHQUVHO0FBQ0gsTUFBTSxXQUFXLEdBQUcsQ0FBQyxVQUFtQyxFQUFFLEVBQUUsVUFBZSxFQUFFLEVBQUU7SUFDN0UsTUFBTSxFQUNKLEtBQUssRUFDTCxXQUFXLEVBQ1gsT0FBTyxFQUNQLE1BQU0sR0FBRyxFQUFFLEVBQ1gsY0FBYyxHQUFHLEVBQUUsRUFDcEIsR0FBRyxPQUFPLENBQUM7SUFDWixNQUFNLFdBQVcsR0FBUSx5QkFBSSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdEMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMzQyxPQUFPO1NBQ1I7UUFFRCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLEdBQUcsZUFBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYTtRQUNyRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQztRQUNqRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsSUFBSTtZQUNuQyxHQUFHLEVBQUUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFO1NBQ2hDLENBQUM7UUFDRixNQUFNLEVBQ0osS0FBSyxHQUFHLEVBQUUsRUFDVixJQUFJLEVBQUUsVUFBVSxHQUFHLEVBQUUsRUFDckIsSUFBSSxHQUFHLEVBQUUsRUFDVCxJQUFJLEVBQ0osUUFBUSxHQUFHLEVBQUUsRUFDYixRQUFRLEVBQ1IsVUFBVSxFQUNYLEdBQUcsS0FBSyxDQUFDO1FBRVYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLEtBQUssRUFBRSxHQUFHLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRW5FLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUM5QjtRQUVELGdFQUFnRTtRQUNoRSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFM0UsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUNoQyxRQUFRO1lBQ1IsT0FBTztZQUNQLFdBQVc7WUFDWCxVQUFVO1lBQ1YsUUFBUTtZQUNSLFNBQVM7WUFDVCxJQUFJO1lBQ0osUUFBUTtZQUNSLFVBQVU7U0FDWCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFHTyxrQ0FBVztBQURwQixrQkFBZSxXQUFXLENBQUMifQ==