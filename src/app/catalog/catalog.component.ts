import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  productList;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef, private firebaseService: FirebaseService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.firebaseService.shoppingCartCollection.valueChanges().subscribe((result: any) => {
      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource<any>(result[0].productData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.connect().subscribe(r => {
        this.productList = r;
      });
    });
  }
}
