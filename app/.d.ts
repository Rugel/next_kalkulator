declare module 'react-rating-stars-component';

// CSS modules (import with styles object)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Global CSS side-effect imports (import "./globals.css")
declare module '*.css' {}
