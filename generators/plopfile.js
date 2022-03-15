module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
      {
        type: "input",
        name: "folder",
        message: "Which component folder?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{folder}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component.tsx.hbs",
      },
    ],
  });
};
