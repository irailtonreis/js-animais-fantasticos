import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    this.activeDropdowMenu = this.activeDropdowMenu.bind(this);
    // Define touchstart e click como argumento
    // padrão de event caso usuário não defina
    if (events === undefined) this.events = ['touchstart', 'click'];
    else this.events = events;

    this.activeClass = 'active';
  }

  // Ativa o dropdownMenu e adiciona
  // a função que observa o click fora dele
  activeDropdowMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  // Adiciona os eventos ao dropdownMenu
  addDropdownMenuEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdowMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropdownMenuEvent();
    }
    return this;
  }
}
