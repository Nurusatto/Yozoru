export class CodeGeneratorUtils {
  static generateCode(): number {
    return Math.floor(100000 + Math.random() * 900000)
  }

  static generatePassword(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}