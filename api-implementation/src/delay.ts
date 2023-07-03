export class Delay{
static delay(delay: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
}
