export class ChallengesService {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }
  async get(headers) {
    const response = await this.request.get(
      `${this.baseURL}/challenges`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status()} ${response.statusText}`
      );
    }
    return response;
  }
}
