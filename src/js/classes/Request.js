/* eslint-disable consistent-return */
export default class Request {
  constructor(server) {
    this.server = server;
  }

  createTicket(name, description) {
    return new Promise((resolve) => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.server}?method=createTicket`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          return resolve(xhr.responseText);
        }
      });
      xhr.send(formData);
    });
  }

  editTicket(id, name, description) {
    return new Promise((resolve) => {
      const formData = new FormData();
      formData.append('editId', id);
      formData.append('name', name);
      formData.append('description', description);

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `${this.server}?method=editTicket`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          return resolve(xhr.responseText);
        }
      });
      xhr.send(formData);
    });
  }

  allTickets() {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.server}?method=allTickets`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const tickets = JSON.parse(xhr.responseText);
          return resolve(tickets);
        }
      });
      xhr.send();
    });
  }

  ticketDescription(id) {
    return new Promise((resolve) => {
      const params = new URLSearchParams();
      params.append('id', id);

      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.server}/?method=ticketById&${params}`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          return resolve(xhr.responseText);
        }
      });
      xhr.send();
    });
  }

  toggleStatus(id, status) {
    return new Promise((resolve) => {
      const params = new URLSearchParams();
      params.append('id', id);
      params.append('status', status);

      const xhr = new XMLHttpRequest();
      xhr.open('PATCH', `${this.server}/?method=toggleStatus&${params}`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          return resolve(xhr.responseText);
        }
      });
      xhr.send();
    });
  }

  deleteTicket(id) {
    return new Promise((resolve) => {
      const params = new URLSearchParams();
      params.append('id', id);

      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `${this.server}/?method=deleteTicket&${params}`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          return resolve(xhr.responseText);
        }
      });
      xhr.send();
    });
  }
}
