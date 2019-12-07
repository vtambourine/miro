import './email-editor.css'

interface IEmailsGenericOptions {
  prefix?: string;
}

class EmailTag {
  private content: HTMLSpanElement;
  private deleteActionElement: HTMLSpanElement;

  container: HTMLSpanElement;

  // TODO: This is simple naïve email regular expression. In real application, the email validator must be more complicated.
  private static EMAIL_REGEXP = /[a-zA-Z0-9\+]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}/;

  constructor(value: string, options: IEmailsGenericOptions) {
    // TODO: Simple escape function might ruin strings by converting any non-latin characters
    const safeValue = escape(value);

    const containerClassName = `${options.prefix}__email`;
    const contentClassName = `${options.prefix}__email-content`;
    const deleteActionClassName = `${options.prefix}__email-delete`;

    const fragment = document.createRange().createContextualFragment(`
      <span class="${containerClassName}">
        <span class="${contentClassName}"></span>
        <span class="${deleteActionClassName}"></span>
      </span>
    `);

    this.container = fragment.querySelector(`.${containerClassName}`);

    if (!EmailTag.validate(safeValue)) {
      this.container.classList.add("emails-editor__email--wrong");
    }

    this.content = fragment.querySelector(`.${contentClassName}`);
    this.content.innerHTML = safeValue;

    this.deleteActionElement = fragment.querySelector(
      `.${deleteActionClassName}`
    );

    this.attachEventListeners();
  }

  private attachEventListeners() {
    if (this.deleteActionElement) {
      this.deleteActionElement.addEventListener(
        "click",
        this.remove.bind(this)
      );
    }
  }

  private remove() {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  private static validate(string: string): boolean {
    return EmailTag.EMAIL_REGEXP.test(string);
  }
}

class EmailInput {
  private shadowInput: HTMLDivElement;
  private input: HTMLInputElement;

  container: HTMLDivElement;

  constructor(options: IEmailsGenericOptions) {
    const containerClassName = `${options.prefix}__input-container`;
    const shadowClassName = `${options.prefix}__input-shadow`;
    const inputClassName = `${options.prefix}__input`;

    const fragment = document.createRange().createContextualFragment(`
      <div class="${containerClassName}">
        <div class="${shadowClassName}"></div>
        <input class="${inputClassName}" />
      </div>
    `);

    this.container = fragment.querySelector(`.${containerClassName}`);
    this.shadowInput = fragment.querySelector(`.${shadowClassName}`);
    this.input = fragment.querySelector(`.${inputClassName}`);

    this.attachEventListeners();
  }

  private attachEventListeners() {
    this.input.addEventListener("keydown", event => {
      this.shadowInput.innerText = (<HTMLInputElement>event.target).value;
    });
  }

  set value(value: string) {
    this.input.value = value;
    this.shadowInput.innerText = value;
  }

  get value(): string {
    return this.input.value;
  }

  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (event: HTMLElementEventMap[K]) => void
  ): void {
    this.input.addEventListener.apply(this.input, arguments);
  }

  focus() {
    this.input.focus();
  }
}

export class EmailsEditor {
  private container: HTMLDivElement;
  private emailInput: EmailInput;
  private options: IEmailsGenericOptions;

  constructor(
    private rootNode: HTMLElement,
    private emails: string[] = [],
    options?: IEmailsGenericOptions
  ) {
    this.options = Object.assign(
      {
        prefix: "emails-editor",
      },
      options
    );
    this.render();
  }

  private parseInput() {
    this.emailInput.value
      .trim()
      .split(",")
      .map(value => value.trim())
      .filter(value => value.length)
      .forEach(value => {
        this.container.insertBefore(
          new EmailTag(value, this.options).container,
          this.emailInput.container
        );
      });
  }

  private applyChanges() {
    this.parseInput();
    this.emailInput.value = "";
  }

  render() {
    this.container = document.createElement("div");
    this.container.classList.add(this.options.prefix);

    this.container.addEventListener("click", () => this.emailInput.focus());

    this.emails.forEach(email => {
      const tag = new EmailTag(email, this.options);
      this.container.appendChild(tag.container);
    });

    this.emailInput = new EmailInput(this.options);

    this.container.appendChild(this.emailInput.container);

    this.emailInput.addEventListener("keyup", event => {
      switch (event.key) {
        case ",":
        case "Enter":
          event.preventDefault();
          this.applyChanges();
      }
    });

    this.emailInput.addEventListener("blur", () => {
      this.parseInput();
      this.applyChanges();
    });

    this.rootNode.append(this.container);
  }
}
