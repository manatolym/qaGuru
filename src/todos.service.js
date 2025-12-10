export class TodosService {
 constructor(request, baseURL) {
 this.request = request;
 this.baseURL = baseURL;
 }
 async get(headers) {
 const response = await this.request.get(`${this.baseURL}todos`, {
 headers: headers
 });
 return response;
 }
}
