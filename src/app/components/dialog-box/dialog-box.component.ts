import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    details: new FormControl(''),
    ketchup: new FormControl(''),
    sauce: new FormControl(''),
  });



  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.data = {
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      description: this.myForm.value.description,
      details: {
        ketchup: this.myForm.value.ketchup,
        sauce: this.myForm.value.sauce,
      }
    }
    this.dialogRef.close(this.data);

  }
}
