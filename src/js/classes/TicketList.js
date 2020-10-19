export default class TicketList {
  constructor() {
    this.list = document.getElementById('tickets_list');
  }

  draw(tickets) {
    this.list.innerHTML = '';

    tickets.forEach((el) => {
      const ticket = document.createElement('tr');
      ticket.dataset.id = el.id;
      ticket.dataset.status = el.status;
      const status = el.status === true ? 'done' : 'todo';
      ticket.innerHTML = `
        <td class='ticket-status'><span class=${status}></span></td>
        <td class='ticket-content'>
          <div class='ticket-name'>${el.name}</div>
          <div class='ticked-description'></div>
        </td>
        <td class='ticket-data'>${el.created}</td>
        <td class='ticket-actions'>
          <span class='edit-button'>
            <span class="visually-hidden">Edit</span>
          </span>
          <span class='delete-button'>
            <span class="visually-hidden">Delete</span>
          </span>
        </td>
      `;

      this.list.appendChild(ticket);
    });
  }
}
