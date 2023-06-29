import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  private apiUrl = "http://87.106.197.59:8080";

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    responseType: 'text' as 'json' // Ensure that we treat the response as text
  };

  private consoleOutput = new Subject<any>();
  consoleOutput$ = this.consoleOutput.asObservable();


  private consoleTextOutput = new Subject<string>();
  consoleTextOutput$ = this.consoleTextOutput.asObservable();

  clearScreenEvent: Subject<void> = new Subject<void>();

  public changeWallpaperEvent = new Subject<void>();

  private colorChangeIntervalId: any = null;
  public isColorActivated = false;
  public currentColor = '#ffffff';
  public currentColors: string[] = [];

  constructor(private http: HttpClient) {
  }

  getCommandRequest(command: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/console?command=${command}`, this.httpOptions);
  }


  executeCommandFunction(response: string): void {
    const command = response.trim().toLowerCase();
    if (command === 'disco') {
      this.toggleColorActivation();
      return;
    }
    if (response.includes('Commande non reconnue')) {
      this.sendErrorMessage(response);
    } else if (this.commandFunctionMap[response]) {
      this.commandFunctionMap[response]();
    }
  }


  clearScreen = (): void => {
    this.clearScreenEvent.next();
  }


  displayHelp = (): void => {
    this.http.get<any[]>(`${this.apiUrl}/commands`).subscribe((data: any[]) => {
      const filteredData = data.map(({command, description}) => ({command, description}));
      this.consoleOutput.next({command: false, data: filteredData, isText: false});
    });
  }



  displayExperience = (): void => {
    this.http.get<any[]>(`${this.apiUrl}/experience`).subscribe((data: any[]) => {
      this.consoleOutput.next({command: false, data: data, isText: false});
    });
  }


  displaySkill = (): void => {
    this.http.get<any[]>(`${this.apiUrl}/skill`).subscribe((data: any[]) => {
      this.consoleOutput.next({command: false, data: data, isText: false});
    });
  }

  displayCursus = (): void => {
    this.http.get<any[]>(`${this.apiUrl}/cursus`).subscribe((data: any[]) => {
      this.consoleOutput.next({command: false, data: data, isText: false});
    });
  }

  displayContact = (): void => {
    this.http.get<any[]>(`${this.apiUrl}/contact`).subscribe((data: any[]) => {
      this.consoleOutput.next({command: false, data: data, isText: false});
    });
  }

  displayProjects = (): void => {
    this.http.get<any[]>(`${this.apiUrl}/project`).subscribe((data: any[]) => {
      this.consoleOutput.next({command: false, data: data, isText: false});
    });
  }


  downloadCV = (): void => {
    //     const link = document.createElement('a');
    //   link.href = `${this.apiUrl}/downloadCV`;
    // link.download = 'CV-Engueran-Raout-2023.pdf';
    //link.click();
  }


  changeWallpaper = (): void => {
    this.changeWallpaperEvent.next();
    this.consoleTextOutput.next('*Poof*');
  }

  toggleColorActivation = (): void => {
    this.isColorActivated = !this.isColorActivated;
    if (this.isColorActivated) {
      this.colorChangeIntervalId = setInterval(() => {
        this.currentColor = this.generateRandomColor();
      }, 1500);
    } else {
      if (this.colorChangeIntervalId) {
        clearInterval(this.colorChangeIntervalId);
        this.colorChangeIntervalId = null;
        this.currentColor = '#ffffff';
      }
    }
   // console.log(`Color output is now ${this.isColorActivated ? 'on' : 'off'}.`);
  }

  getColor(): string {
    return this.currentColor;
  }


  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  sendErrorMessage = (message: string): void => {
    this.consoleTextOutput.next(message);
  }


  private commandFunctionMap: { [key: string]: () => void } = {
    'displayHelp': this.displayHelp,
    'clearScreen': this.clearScreen,
    'displayExperience': this.displayExperience,
    'displaySkill': this.displaySkill,
    'displayEducation': this.displayCursus,
    'displayProjects': this.displayProjects,
    'displayContact': this.displayContact,
   // 'downloadCV': this.downloadCV,
    'projects': this.displayProjects,
    'changeWallpaper': this.changeWallpaper,
    'disco': this.toggleColorActivation
  };

  ngOnDestroy() {
    if (this.colorChangeIntervalId) {
      clearInterval(this.colorChangeIntervalId);
    }
  }
}
