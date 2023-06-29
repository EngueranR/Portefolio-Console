import {Component, ViewChild, ElementRef, AfterViewChecked, OnInit} from '@angular/core';
import {ConsoleService} from "../../services/console.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit, AfterViewChecked {
  @ViewChild('consoleInput') consoleInput!: ElementRef;
  @ViewChild('consoleOutputContainer') consoleOutputContainer!: ElementRef;

  consoleOutput: { command: boolean, data: any, isText: boolean }[] = [];

  consoleTextOutput: { command: boolean, data: string }[] = [];
  initialMessages: { command: boolean, data: string }[] = [{
    command: false,
    data: '# Bienvenu sur le portefolio de Enguéran R !\n' +
      '# Cliquez sur "Entrer une commande ici..."\n' +
      '# Puis écrivez "help" pour voir les commandes disponibles.'
  }];

  constructor(private consoleService: ConsoleService) {
  }

  ngOnInit() {
    this.consoleService.consoleOutput$.subscribe(text => {
      this.consoleOutput.push(text);
    });
    this.consoleService.consoleTextOutput$.subscribe(text => {
      this.consoleOutput.push({command: false, data: text, isText: true});
    });
    this.consoleService.clearScreenEvent.subscribe(() => {
      this.consoleOutput = [];
    });
  }


  handleSubmit(event: Event) {
    event.preventDefault();
    const command = this.consoleInput.nativeElement.value.toLowerCase();
    this.consoleOutput.push({command: true, data: command, isText: true});
    this.consoleInput.nativeElement.value = '';
    this.consoleService.getCommandRequest(command).subscribe(response => {
      this.consoleService.executeCommandFunction(response);
    });
  }



  getColor(): string {
    return this.consoleService.getColor();
  }


  getKeys(item: any): string[] {
    return Object.keys(item);
  }

  handleFocus() {
    this.consoleInput.nativeElement.focus();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.consoleOutputContainer.nativeElement.scrollTop = this.consoleOutputContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }


}
