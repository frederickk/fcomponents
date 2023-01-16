/**
 * @fileoverview Toggle button with debounce.
 */

import {ButtonDebounce} from './controller-button-debounce';
import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

// @ts-ignore
import Style from './controller-button-debounce.scss';

@customElement('button-toggle')
export class ButtonToggle extends ButtonDebounce {
  constructor() {
    super();
  }

  static get styles() {
		return [Style];
  }

  @property({type: Number})
  state_ = 0;

  @property({type: String})
  active = 'off';

  @query('#off')
  private valueOffElem_!: HTMLElement;

  @query('#on')
  private valueOnElem_!: HTMLElement;

  render() {
    return html `
      <button
          active="${this.active}"
          class="button"
          id="${this.id}"
          ?disabled=${this.disabled}
          @click="${this.clickHandler_}">
        <span id="off">
          <slot name="off">off</slot>
        </span>
        <span id="on" class="button--hidden">
          <slot name="on">on</slot>
        </span>
      </button>
    `;
  }

  /** Adjusts state of element based on 'active' property. */
  updated(_changedProperties: Map<string, any>) {
  //   if (changedProperties.has('active')) {
  //     const active = changedProperties.get('active');
  //     if (active === 'off') {
  //       this.state_ = 0;
  //     } else if (active === 'on') {
  //       this.state_ = 1;
  //     }
  //   }
  }

  /** Handles button clicks, fires both 'click-debounce' and value events. */
  clickHandler_() {
    super.clickHandler_();

    this.toggleState_();

    const eventName = (this.state_ === 0)
      ? 'off'
      : 'on';
    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this.requestUpdate();
  }

  /** Toggles classes of value slots. */
  toggleState_() {
    this.state_ = (this.state_ === 0 ? 1 : 0);
    this.valueOffElem_.classList.toggle('button--hidden');
    this.valueOnElem_.classList.toggle('button--hidden');
  }
}
