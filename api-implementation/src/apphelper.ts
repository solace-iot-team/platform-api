import passwordGenerator from 'generate-password';

import App = Components.Schemas.App;

class AppHelper {
  public generateConsumerKey(): string {
    return passwordGenerator.generate({
      length: 32,
      numbers: true,
      strict: true,
    });
  }

  public generateConsumerSecret(): string {
    return passwordGenerator.generate({
      length: 16,
      numbers: true,
      strict: true,
    })
  }

  public resetCredentialsDates(app: App) {
    const now: number = Date.now();
    app.credentials.issuedAt = now;
    if (app.expiresIn && app.expiresIn > 0) {
      app.credentials.expiresAt = now + (app.expiresIn*1000);
    }
  }
}

export default new AppHelper();