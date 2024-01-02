import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonText = '';
  @Input() buttonImportance = '' as keyof typeof this.classesConfig;
  @Input() routerLinkAddress = '';


  classesConfig = {
    primary: 'primary'
  }
}
