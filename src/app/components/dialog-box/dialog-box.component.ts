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
  ) {
    if (this.data) this.isNew = false
  }

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    description: new FormControl(this.data?.description ?? ''),
    weight: new FormControl(this.data?.details.weight ?? ''),
    ketchup: new FormControl(this.data?.details.ketchup ?? ''),
    sauce: new FormControl(this.data?.details.sauce ?? ''),
  });

  isNew: boolean = true

  onNoClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      img: "assets/img/govyazhii.jpeg",
      description: this.myForm.value.description,
      details: {
        ketchup: this.myForm.value.ketchup,
        sauce: this.myForm.value.sauce,
        weight: this.myForm.value.weight
      }
    }
    this.dialogRef.close(this.data);
  }
}
