import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://timserver.northeurope.cloudapp.azure.com/QalitasWebApi";

  constructor(private http: HttpClient) {}

  // ✅ Save Token to Preferences
  async saveToken(token: string): Promise<void> {
    console.log('[DEBUG] Saving Token:', token);
    if (!token) {
      console.error('[ERROR] Token is null or undefined!');
      return;
    }
    await Preferences.set({ key: 'authToken', value: token });
    console.log('[DEBUG] Token successfully saved.');
  }

  // ✅ Retrieve Token from Preferences
  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'authToken' });
    console.log('[DEBUG] Token retrieved:', value);
    return value;
  }

  // ✅ Remove Token from Preferences (Logout)
  async removeToken(): Promise<void> {
    await Preferences.remove({ key: 'authToken' });
    console.log('[DEBUG] Token removed at:', new Date().toISOString());
  }

  // ✅ Login: Request JWT Token with dynamic companyId and siteId
  login(username: string, password: string, companyId: string, siteId: string): Observable<any> {
    const loginUrl = `${this.apiUrl}/token`;
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('companyId', companyId);
    body.set('siteId', siteId);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(loginUrl, body.toString(), { headers }).pipe(
      tap(async (response: any) => {
        console.log("[DEBUG] Login successful, received token:", response.access_token);
        await this.saveToken(response.access_token);
      })
    );
  }

  // ✅ Attach JWT Token to API Requests
  async getWithAuth(endpoint: string): Promise<Observable<any>> {
    const token = await this.getToken();
    if (!token) {
      console.error('[ERROR] No authentication token found!');
      throw new Error('No authentication token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log(`[DEBUG] Fetching ${endpoint} with Authorization`);
    return this.http.get(`${this.apiUrl}${endpoint}`, { headers });
  }

  // ✅ Logout: Remove Token and log out user
  async logout(): Promise<void> {
    console.log("[DEBUG] Logging out user...");
    await this.removeToken();
  }

  // ✅ Check if User is Logged In
  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    console.log("[DEBUG] Token retrieved in isLoggedIn:", token);
    return !!token;
  }
}
