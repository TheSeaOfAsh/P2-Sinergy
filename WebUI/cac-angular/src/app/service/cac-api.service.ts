import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/User';
import { playlist } from '../models/spotifyPlaylist';
const PLAYLIST = "https://api.spotify.com/v1/me/playlists";
const PROFILE = "https://api.spotify.com/v1/me";

@Injectable({
  providedIn: 'root'
})
export class CacApiService {

  rootUrl: string = 'https://cacophony.azurewebsites.net/api/User';

  constructor(private http: HttpClient) { }

  getAllUsers(): Promise<User[]>
  {
    
    return this.http.get<User[]>(this.rootUrl).toPromise();
  }

  addUser(User: User): Promise<User>
  {
    return this.http.post<User>(this.rootUrl, User).toPromise();
  }

  getUserById(id: number): Promise<User>
  {
    return this.http.get<User>(this.rootUrl + "/" + id).toPromise();
  }

  getUserPlaylists(): Promise<any>
  {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.authCode,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(PLAYLIST, requestOptions).toPromise();
  }

  
  getSinglePlaylist(playlist_id): Promise<any>
  {
    let url ='https://api.spotify.com/v1/playlists'+playlist_id+'/tracks';
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.authCode,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(url, requestOptions).toPromise();
  }


  getUserDetails(): Promise<any>
  {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.authCode,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(PROFILE, requestOptions).toPromise();
  }
  
  
}




