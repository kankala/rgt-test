import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemClass } from 'src/app/common/model/dataClass.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  dialogItem : ItemClass;

  constructor(
    public hostElement: ElementRef,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    dialogRef.addPanelClass('book-add-box');
    this.dialogItem = new ItemClass();
  }

  ngOnInit() {
    // this.dialogRef.afterOpened().subscribe(() => {
    // })
  }
  close(action :number){
    let returnData = {
      item : this.dialogItem,
      action : action
    }

    this.dialogRef.close(returnData);
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
