import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
  styleUrl: './title.sass',
})
export class Title {
  readonly main = input.required<string>();
  readonly sub = input.required<string>();
}
