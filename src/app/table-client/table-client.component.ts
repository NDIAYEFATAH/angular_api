import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.css'],
})
export class TableClientComponent {
  @Input()
  clients!: Client[];

  @Output()
  deleteClient = new EventEmitter<any>();
  @Output() editClient = new EventEmitter<any>();

  onDelete(id: any) {
    this.deleteClient.emit(id);
  }
  onEdit(id: any) {
    this.editClient.emit(id);
  }
}
