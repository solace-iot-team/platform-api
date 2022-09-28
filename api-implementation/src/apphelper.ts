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

  public resetCredentialsDates(credentials: Components.Schemas.Credentials, expiresIn: number) {
    const now: number = Date.now();
    credentials.issuedAt = now;
    if (expiresIn && expiresIn > 0) {
     credentials.expiresAt = now + (expiresIn*1000);
    } else {
      credentials.expiresAt = -1;
    }
  }
  
}

export default new AppHelper();