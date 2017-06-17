/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}


// Helper which allows to import json's as module
declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.html' {
  const content: string;
  export default content;
}
