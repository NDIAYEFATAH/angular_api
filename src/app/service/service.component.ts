import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import Swal from 'sweetalert2';
import { Client } from '../models/client.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  clients!: Client[];

  serviceForm!: FormGroup;
  editingClientId: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editingClientId = id;
        this.clientService.getClient(id).subscribe((client) => {
          this.serviceForm.patchValue(client);
        });
      }
    });
    this.getClientList();
  }

  submitForm() {
    const formValue = this.serviceForm.value;
    Swal.fire({
      title: 'Confirmation',
      text: this.editingClientId
        ? 'Voulez-vous modifier ce client ?'
        : 'Voulez-vous ajouter ce client ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OUI',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.editingClientId) {
          // Modification
          this.clientService
            .updateClient(this.editingClientId, formValue)
            .subscribe(
              (response) => {
                if (response.status === 200) {
                  Swal.fire('Modifié!', response.message, 'success');
                  this.resetForm();
                  this.router.navigate(['/service']);
                  this.getClientList();
                }
              },
              (error) => {
                Swal.fire('Erreur!', 'La modification a échoué', 'error');
              }
            );
        } else {
          this.clientService
            .createClient(this.serviceForm.value)
            .subscribe((response) => {
              if (response === 201) {
                this.serviceForm.reset();
                Swal.fire({
                  title: 'Information',
                  text: response.message,
                  icon: 'success',
                });
              }
              this.getClientList();
            });
        }
      }
    });
  }

  onEdit(id: any) {
    this.clientService.getClient(id).subscribe((client) => {
      console.log(client); 
      this.editingClientId = id;
      this.serviceForm.patchValue(client);
    });
  }

  onDelete(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas annuler cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id).subscribe(
          (response) => {
            if (response.status === 200) {
              Swal.fire('Supprimé!', 'Le client a été supprimé.', 'success');
              this.getClientList();
            }
          },
          (error) => {
            Swal.fire('Erreur!', 'La suppression a échoué', 'error');
          }
        );
      }
    });
  }

  getClientList() {
    this.clientService.listClient().subscribe((response) => {
      this.clients = response;
      console.log(this.clients);
    });
  }
  resetForm() {
    this.serviceForm.reset();
    this.editingClientId = null;
  }
}
