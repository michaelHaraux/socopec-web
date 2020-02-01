import { Component, OnInit } from '@angular/core';
import { Agence } from '../../models/agence.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencesService } from '../../services/agences.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-single-agence',
  templateUrl: './single-agence.component.html',
  styleUrls: ['./single-agence.component.scss']
})
export class SingleAgenceComponent implements OnInit {


  agence: Agence;
  id : number;

  constructor(private route: ActivatedRoute, private agencesService: AgencesService,
              private router: Router) {}

  ngOnInit() {
    this.agence = new Agence('', '');
    const id = this.route.snapshot.params['id'];
    this.id = id;
    this.agencesService.getSingleAgence(+id).then(
      (agence: Agence) => {
        this.agence = agence;
      }
    );
  }
  onEditAgence(id: number) {
    this.router.navigate(['/agences', 'edit',this.id]);
}
  onBack() {
    this.router.navigate(['/agences']);
  }


}