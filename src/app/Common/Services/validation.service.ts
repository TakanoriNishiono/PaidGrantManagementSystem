import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  constructor() {}

  /**
   * メールアドレスが有効かどうかを判定
   * @param email メールアドレス
   * @returns 有効な場合true、無効な場合false
   */
  public isValidEmail(email: string): boolean {
    if (!email || email.trim() === "") {
      return false;
    }

    // シンプルで実用的なメールアドレスの正規表現
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * より厳密なメールアドレスの妥当性チェック（RFC 5322に準拠）
   * @param email メールアドレス
   * @returns 有効な場合true、無効な場合false
   */
  public isValidEmailStrict(email: string): boolean {
    if (!email || email.trim() === "") {
      return false;
    }

    // より厳密なメールアドレスの正規表現
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.trim());
  }

  /**
   * パスワードの妥当性チェック
   * 以下の条件をすべて満たす場合にtrueを返す：
   * - 8文字以上
   * - 大文字を含む
   * - 小文字を含む
   * - 数字を含む
   * - 特殊文字(-=_+@)を含む
   * - 空文字列でない
   * @param password パスワード
   * @returns 有効な場合true、無効な場合false
   */
  public isValidPassword(password: string): boolean {
    if (!password || password.trim() === "") {
      return false;
    }

    // 最小文字数チェック（8文字以上）
    if (password.length < 8) {
      return false;
    }

    // 大文字を含むかチェック
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // 小文字を含むかチェック
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // 数字を含むかチェック
    if (!/[0-9]/.test(password)) {
      return false;
    }

    // 特殊文字(-=_+@)を含むかチェック
    if (!/[\-=_+@]/.test(password)) {
      return false;
    }

    // 特定の特殊文字(-=_+@)以外が含まれるかチェック
    if (/[^A-Za-z0-9\-=_+@]/.test(password)) {
      return false;
    }

    return true;
  }
}
