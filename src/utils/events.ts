export function preventDefault(e: Event): void {
  if (!e) return;
  e.preventDefault();
  e.stopPropagation();
}

export function isInputElement(element: HTMLElement | null): boolean {
  if (!element) return false;
  const tagName = element.tagName.toLowerCase();
  return ['input', 'textarea', 'select', 'button'].includes(tagName);
}

export function createCustomEvent<T>(
    name: string,
    detail: T,
    options: EventInit = {}
): CustomEvent<T> {
  return new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    ...options,
    detail
  });
}