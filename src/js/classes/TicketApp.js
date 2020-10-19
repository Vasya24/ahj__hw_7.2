/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable consistent-return */

import TicketList from './TicketList';
import Request from './Request';

export default class TicketApp {
  constructor() {
    this.request = new Request('https://ahj-hw-7.herokuapp.com/');
    this.ticketList = new TicketList();
    this.form = document.forms.edit;
    this.formHeader = this.form.querySelector('.form-header');
    this.formItems = [...this.form.elements];
    this.modal = document.forms.modal;
    this.addButton = document.querySelector('.header-button');
    this.editTicket = null;
    this.deletedTicket = null;
    this.checkedTicket = null;
    this.formTitle = document.querySelector('.form-header');
    this.name = document.getElementById('input_name');
    this.description = document.getElementById('input_description');
    this.save = document.getElementById('save_button');
    this.cancel = document.getElementById('cancel_button');
    this.saveModal = document.getElementById('save_modal_button');
    this.cancelModal = document.getElementById('cancel_modal_button');
  }

  async init() {
    this.ticketList.draw(await this.request.allTickets());
    this.action();
  }

  async action() {
    this.addButton.addEventListener('click', () => {
      this.showWindow(this.form);
      this.formHeader.innerText = 'Добавить тикет';
    });
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      (async () => {
        const isValid = event.currentTarget.checkValidity();
        if (isValid) {
          if (this.editTicket) {
            await this.request.editTicket(this.editTicket.dataset.id, this.name.value, this.description.value);
            this.editTicket = null;
          } else {
            await this.request.createTicket(this.name.value, this.description.value);
          }
          this.form.reset();
          this.form.classList.remove('edit-active');
          this.ticketList.draw(await this.request.allTickets());
        }
      })();
    });
    this.modal.addEventListener('submit', (event) => {
      event.preventDefault();
      (async () => {
        await this.request.deleteTicket(this.deletedTicket.dataset.id);
        this.modal.classList.remove('modal-active');
        this.ticketList.draw(await this.request.allTickets());
      })();
    });
    this.cancel.addEventListener('click', (event) => {
      event.preventDefault();
      this.editTicket = null;
      this.form.reset();
      this.form.classList.remove('edit-active');
    });
    this.cancelModal.addEventListener('click', (event) => {
      event.preventDefault();
      this.deletedTicket = null;
      this.modal.classList.remove('modal-active');
    });
    this.ticketList.list.addEventListener('click', (event) => {
      if (document.querySelector('.edit-active')) return false;
      if (document.querySelector('.modal-active')) return false;
      if (event.target.classList.contains('edit-button')) {
        this.showWindow(this.form);
        this.formHeader.innerText = 'Изменить тикет';
        this.editTicket = event.target.parentElement.parentElement;
        this.name.value = this.editTicket.querySelector('.ticket-name').innerText;
        const description = this.editTicket.querySelector('.ticked-description').innerText;
        if (description === '') {
          (async () => {
            this.description.value = await this.request.ticketDescription(this.editTicket.dataset.id);
          })();
        } else {
          this.description.value = description;
        }
      }
      if (event.target.classList.contains('delete-button')) {
        this.deletedTicket = event.target.parentElement.parentElement;
        this.showWindow(this.modal);
      }
      if (event.target.classList.contains('ticket-name') || event.target.classList.contains('ticked-description')) {
        const ticket = event.target.parentElement.parentElement;
        const description = event.target.parentElement.querySelector('.ticked-description');
        if (description.innerText === '') {
          (async () => {
            description.innerText = await this.request.ticketDescription(ticket.dataset.id);
          })();
        } else {
          description.innerText = '';
        }
      }
      if (event.target.classList.contains('done') || event.target.classList.contains('todo')) {
        this.checkedTicket = event.target.parentElement.parentElement;
        const status = this.checkedTicket.dataset.status !== 'true';
        (async () => {
          await this.request.toggleStatus(this.checkedTicket.dataset.id, status);
          this.ticketList.draw(await this.request.allTickets());
        })();
      }
    });
  }

  showWindow(el) {
    if (el.classList.contains('edit')) {
      el.classList.add('edit-active');
    } else {
      this.modal.classList.add('modal-active');
    }
    el.style.top = '25px';
    el.style.left = `${(el.offsetParent.offsetWidth / 2) - (el.offsetWidth / 2)}px`;
  }
}
