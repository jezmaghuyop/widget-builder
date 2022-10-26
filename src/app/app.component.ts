import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'widget-builder';

  //#region Custom Table Config
  myTableHeaderStyle = 'bg-orange-500';
  myHeader = ['Speaker', 'Country'];
  myBody = [
    { name: 'Nick', country: 'Norway' },
    { name: 'Devlin', country: 'Norway' },
  ];

  myActions = [{ name: 'View', action: 'View' }];

  //#endregion

  //#region Custom Table Variables
  tableHeader!: string;
  tableBody!: string;
  tableHeaderStyle!: any;
  generatedTableConfigText!: string;
  generatedTableConfig!: SafeHtml;
  //#endregion

  constructor(private sanitized: DomSanitizer) {}

  interceptAction(event: any): void {
    console.log(event);
  }

  generate(): void {
    const processHeader = JSON.stringify(this.tableHeader.split(','));
    this.generatedTableConfigText = `
    <script src='https://softconstorage.blob.core.windows.net/widgets/softcon-table.js'></script>
    <custom-table table-header-class='${this.tableHeaderStyle}' headers='${processHeader}' body-data='${this.tableBody}'></custom-table>`;

    this.generatedTableConfig = this.sanitized.bypassSecurityTrustHtml(
      this.generatedTableConfigText
    );
  }
}
