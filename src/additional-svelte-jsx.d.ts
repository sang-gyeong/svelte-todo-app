// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // If you want to use on:beforeinstallprompt
    onbeforeinstallprompt?: (event: any) => any;
    // If you want to use myCustomAttribute={..} (note: all lowercase)
    mycustomattribute?: any;
    // You can replace any with something more specific if you like
    onreorder?: (event: any) => any;
  }
}
