import { Component, HostListener, OnInit } from '@angular/core';
import { HttpApiService } from '../../common/service/http-api.service';
import { ItemClass } from '../../common/model/dataClass.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailComponent } from './dialog/detail/detail.component';
import { AddComponent } from './dialog/add/add.component';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'index-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
	list: any = [];
	item: any;
	searchItem : ItemClass;
	p: number | undefined;
	dialogRef_detail: MatDialogRef<DetailComponent> | undefined;
	dialogRef_add: MatDialogRef<AddComponent> | undefined;
	clickoutHandler: Function | undefined;
	//form : any;
	//pattern="[0-9]*";

	@HostListener('document:click', ['$event'])
	clickout(event: any) {
		if (this.clickoutHandler) {
			this.clickoutHandler(event);
		}
	}

	constructor(private httpApi: HttpApiService, private fb: FormBuilder, public dialog: MatDialog) {
		this.item = new ItemClass();
		this.searchItem = new ItemClass();
		this.list.push(this.item);

		// this.form = this.fb.group({
		// 	writer: new FormControl('', [Validators.required,Validators.pattern(this.pattern)]),
		// 	bookName: new FormControl('', [Validators.required,Validators.pattern(this.pattern)]),
		// });

		// this.writer = new FormControl('', [Validators.required,Validators.pattern(this.pattern)])

	}

	ngOnInit(): void {
		this.substart();
	}

	substart() {
		let params = new HttpParams();
		this.httpApi.get('books', params).subscribe(
			data => {
				//console.log(data);
				this.list = JSON.parse(data);

			},
			({ error }) => {
				console.log(error.message);
			},
			() => {
				//this.router.navigate(['/main/dashboard']),
				//console.log();
			}
		);
	}

	search() {
		let params = new HttpParams();
		if (this.searchItem.writer !== ""){
			params = params.append('writer', this.searchItem.writer);
		}
		if (this.searchItem.name !== ""){
			params = params.append('name', this.searchItem.name);
		}
		
		this.httpApi.get('books', params).subscribe(
			data => {
				//console.log(data);
				this.list = [];
				this.list = JSON.parse(data);

			},
			({ error }) => {
				console.log(error.message);
			},
			() => {
				//this.router.navigate(['/main/dashboard']),
				//console.log();
			}
		);
	}

	list_dblclick(i: number) {

		let paramsString = '';
		paramsString = '';
		let params = new HttpParams();
		this.httpApi.get('books/' + i, params).subscribe(
			data => {
				//this.list = data[0]
				console.log(data);
			},
			({ error }) => {
				console.log(error.message);
			},
			() => {
				//this.router.navigate(['/main/dashboard']),
				//console.log();
			}
		);
	}

	add() {
		const tempItem : any = null;
		setTimeout(() => {
			this.dialogRef_add = this.dialog.open(AddComponent, {
				height: '400px',
				width: '600px',
				hasBackdrop: false
			});

			this.dialogRef_add.afterOpened().subscribe(() => {
				this.clickoutHandler = this.closeAddDialogFromClickout;
			});

			this.dialogRef_add.afterClosed().subscribe((result) => {
				if (result !== undefined || null){
					if (result.action == 1){
						this.insertBook(result.item)
					}
				}
				this.clickoutHandler = undefined;
			});
		});
	}
	detail(item: ItemClass) {
		let tempItem:any = null;
		tempItem = item;
		setTimeout(() => {
			this.dialogRef_detail = this.dialog.open(DetailComponent, {
				height: '400px',
				width: '600px',
				data: { item: tempItem },
				hasBackdrop: false
			});

			this.dialogRef_detail.afterOpened().subscribe(() => {
				this.clickoutHandler = this.closeDetailDialogFromClickout;
			});

			this.dialogRef_detail.afterClosed().subscribe((result) => {
				if (result !== undefined || null){
					if (result.action == 1){
						this.updateBook(result.item)
					}else if (result.action == 2){
						this.deleteBook(result.item)
					}
				}
				this.clickoutHandler = undefined;
			});
		});
	}
	closeDetailDialogFromClickout(event: MouseEvent) {
		const matDialogContainerEl1 = this.dialogRef_detail?.componentInstance.hostElement.nativeElement.parentElement;
		const rect1 = matDialogContainerEl1.getBoundingClientRect()
		if (event.clientX <= rect1.left || event.clientX >= rect1.right ||
			event.clientY <= rect1.top || event.clientY >= rect1.bottom) {
			this.dialogRef_detail?.close();
		}
	}
	closeAddDialogFromClickout(event: MouseEvent) {
		const matDialogContainerEl2 = this.dialogRef_add?.componentInstance.hostElement.nativeElement.parentElement;
		const rect2 = matDialogContainerEl2.getBoundingClientRect()

		if (event.clientX <= rect2.left || event.clientX >= rect2.right ||
			event.clientY <= rect2.top || event.clientY >= rect2.bottom) {
			this.dialogRef_add?.close();
		}
	}

	insertBook(item : ItemClass) {
		let paramsString = '';
		paramsString = '';
		this.httpApi.post('books', paramsString,{item:item}).subscribe(
			data => {
				this.substart();
			},
			({ error }) => {
				console.log(error.message);
			},
			() => {
			}
		);
	}

	updateBook(item : ItemClass) {
		let paramsString = '';
		paramsString = '';
		this.httpApi.put('books/' + item.idx, paramsString,{item:item}).subscribe(
			data => {
				this.substart();
				//console.log("update "+data);
			},
			({ error }) => {
				console.log(error.message);
			},
			() => {
			}
		);
	}
	deleteBook(item : ItemClass) {
		let paramsString = '';
		paramsString = '';
		this.httpApi.delete('books/' + item.idx, paramsString).subscribe(
			data => {
				this.substart();
				//console.log("delete "+data);
			},
			({ error }) => {
				console.log(error.message);
			},
			() => {
				//this.router.navigate(['/main/dashboard']),
				//console.log();
			}
		);
	}

	mask(event: any) {
		var re = new RegExp("^([a-z0-9A-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣 ]*)$");
		if (!re.test(event.target.value)) {
			event.target.value = '';
		}
	}

}
