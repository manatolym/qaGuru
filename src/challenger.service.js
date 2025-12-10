    constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }
  async post() {
    const response = await this.request.post(
      `${this.baseURL}/challenger`,
      {
        data: {},
      }
    );
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status()} ${response.statusText}`
      );
    }
    return response;
  }
}
