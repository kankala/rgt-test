import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemClass } from 'src/app/common/model/dataClass.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  dialogItem : ItemClass;
  returnData : any;

  constructor(
    public hostElement: ElementRef,
    public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    dialogRef.addPanelClass('book-detail-box');
    this.dialogItem = {...this.data.item};
  }

  

  ngOnInit() {
    
  }
  close(action :number){
    this.returnData = {
      item : this.dialogItem,
      action : action
    }

    this.dialogRef.close(this.returnData);
  }

  mask(event: any) {
    var re = new RegExp("^([a-z0-9A-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣 ]*)$");
    if (!re.test(event.target.value)) {
      event.target.value = '';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}