import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const UserGamesDB = 'usergameslist';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabase: SupabaseClient;

  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  private userGamesList: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('event: ', event);
      console.log('session: ', session);

      if (event === 'SIGNED_IN') {
        this.currentUser.next(session.user);
      } else {
        this.currentUser.next(false);
      }
    });
  }

  loadUser() {

  }

  async signUp(credentials: { email: string, password: string }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signUp(credentials);
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  async signIn(credentials: { email: string, password: string }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signIn(credentials);
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();

    this.supabase.getSubscriptions().map(sup => {
      this.supabase.removeSubscription(sup);
    });

    this.router.navigateByUrl('/');
  }

  get getUserGames(): Observable<any> {
    return this.userGamesList.asObservable();
  }

  async loadUserGames(): Promise<void> {
    const query = await this.supabase.from(UserGamesDB).select('*');
    console.log('query: ', query);
    this.userGamesList.next(query.data);
  }

  async addGameToUserList(game: number) {
    const newGame = {
      userid: this.supabase.auth.user().id,
      gameid: game
    };

    const result = await this.supabase.from(UserGamesDB).insert(newGame);
  }

  async removeGameFromUserList(gameid: string) {
    await this.supabase
      .from(UserGamesDB)
      .delete()
      .match({ gameid });
  }

  async updateGameFromUserList(
    gameid: string,
    change: { nota?: number, complete?: boolean }
  ) {
    await this.supabase
      .from(UserGamesDB)
      .update(change)
      .match({ gameid });
  }

}
